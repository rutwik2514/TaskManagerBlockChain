const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3=require('web3');
const taskFactory = require('./build/TaskFactory.json');

const provider=new HDWalletProvider(
    'term water borrow cruise shield predict craft mixture physical member walk asthma',
    'https://sepolia.infura.io/v3/c329626e09fe42cc91484bf515cf0569'
);
const web3 = new Web3(provider);

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log('deploying from account', accounts[0]);
    const taskContract  = await new web3.eth.Contract(JSON.parse(taskFactory.interface))
    .deploy({data:taskFactory.bytecode})
    .send({gas:'1000000', from : accounts[0]})
    .then(console.log('contract deployed'))
    .catch(err=>{console.log(err)});

    console.log('contract deployed successfully');
    console.log('to', taskContract.options.address);
    //write below line to prevent a hanging deployment
    provider.engine.stop();

}
deploy();