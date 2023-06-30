const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledTaskFactory = require("../ethereum/build/TaskFactory.json");
const compiledTask = require("../ethereum/build/Task.json");

let accounts;
let factory;
let task;
let taskAddress;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledTaskFactory.interface))
    .deploy({ data: compiledTaskFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods.createCampaign("rutwik").send({
    from: accounts[0],
    gas: "1000000",
  });

  const address = await factory.methods.getAddress().call();
  taskAddress = address;
  console.log('taskAddress',taskAddress);
  //we use this contract syntax when we want to access already deployed contract,
  //we give address of that contracct as second argument,
  //and ofc no need of .deploy and .send as we are accessing already deployed contracts
  task = await new web3.eth.Contract(
      JSON.parse(compiledTask.interface),
      taskAddress
      );
});

describe("Campigns", () => {
  it("deploys a factory and campaign", () => {
    assert.ok(task.options.address);
    assert.ok(factory.options.address);
    console.log('hello');
  });
  it('makes caller as manager', async()=>{
    const manager = await task.methods.manager().call();
    assert.equal(manager,accounts[0]);
  })
  it('sets username',async()=>{
    const username = await task.methods.creatorName().call();
    assert.equal(username,'rutwik')
  })
  it('addsTask',async()=>{
    const taskAdded = await task.methods.addTask('task1','study').send({
        from:accounts[0],
        gas:'1000000'
    })
    assert(taskAdded);
  })

  
});
