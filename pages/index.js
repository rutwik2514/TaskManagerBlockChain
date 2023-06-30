import React from "react";
import web3 from "../ethereum/web3";
import factory from "../ethereum/factory";
import Task from "../ethereum/task";
function index() {
  const [member, setMember] = React.useState(false);
  const [userName, setUserName] = React.useState();
  const [deployed,setDeployed]=React.useState(false);
  const [deployedAddress,setDeployedAddress]=React.useState();
  const [taskCount,setTaskCount]=React.useState();
  const [tasksTitle,setTasksTitle]=React.useState([]);
  const [tasksDescrition,setTaskDescription]=React.useState([]);
  const [title,setTitle]=React.useState();
  const [description,setDescription]=React.useState('');
  let temptasktitle = [];
  let temptaskdescription = [];
  React.useEffect(() => {
    async function checkMember() {
      const accounts = await web3.eth.getAccounts();
      console.log('account address is', accounts[0]);
      const alreadyMember = await factory.methods
        .isAlreadyMember(accounts[0])
        .call();
      console.log("already member is", alreadyMember);
      setMember(alreadyMember);
    }
    checkMember();
  }, []);

  React.useEffect(()=>{
    async function getDeployedAddress(){
        const accounts = await web3.eth.getAccounts();
        const address = await factory.methods.getAddress(accounts[0]).call();
        console.log('deployed address is ',address);
        setDeployedAddress(address);
        setDeployed(true);
    }
    if(member==true){
        getDeployedAddress();
    }
  },[member])

  React.useEffect(()=>{
    async function getTask(){
        const accounts = await web3.eth.getAccounts();
        const task = Task(deployedAddress);
        console.log(deployedAddress);
        console.log('task is .......', task);
        // console.log(task.methods.getTasksCount().call())
        const taskCount = await task.methods.getTasksCount().call();
        setTaskCount(taskCount);
        console.log('number of tasks are', taskCount);
       
    }
    if(deployed){
        getTask();
    }
  },[deployed])
  React.useEffect(()=>{
    async function getTasks(){
        const task = Task(deployedAddress);
        temptasktitle=[];
        temptaskdescription=[];
        for(let i =  0; i < taskCount; i++){
            const tempTask =  await task.methods.tasks(i).call();
            console.log('tasks are', tempTask);
            temptasktitle.push(tempTask[0]);
            temptaskdescription.push(tempTask[1]);
        }
        setTasksTitle(temptasktitle);
        setTaskDescription(temptaskdescription);
    }
    if(taskCount){
        getTasks();
    }
  },[taskCount])
  function handleChange(e) {
    setUserName(e.target.value);
    console.log(userName);
  }
  function handleChange2(e){
    setTitle(e.target.value)
  }
  function handleChange3(e){
    setDescription(e.target.value);
  }
  async function handleClick() {
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(userName).send({
        from: accounts[0],
      });
      const alreadyMember = await factory.methods
        .isAlreadyMember(accounts[0])
        .call();
      setMember(alreadyMember);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleClick2(){
    async function addTask(){
        const task = Task(deployedAddress);
        const accounts = await web3.eth.getAccounts();
        await task.methods.addTask(title,description).send({
            from:accounts[0]
        })
        const taskCount = await task.methods.getTasksCount().call();
        setTaskCount(taskCount);
        temptasktitle=[];
        temptaskdescription=[];
        for(let i =  0; i < taskCount; i++){
            const tempTask =  await task.methods.tasks(i).call();
            console.log('tasks are', tempTask);
            temptasktitle.push(tempTask[0]);
            temptaskdescription.push(tempTask[1]);
        }
        setTasksTitle(temptasktitle);
        setTaskDescription(temptaskdescription);
        
    }
    console.log(title);
    console.log(description);
    addTask();
  }

  return (
    <>
      {member && <>
        <h1>Your task count is {taskCount}</h1>
        <input placeholder="enter title" onChange={handleChange2} />
        <button onClick={handleClick2}>ADD TASK</button>
        <div>{tasksTitle}</div>
        
      </>}
      {!member && (
        <>
          <h1>OOPS!, you are not a member yet, please become member</h1>
          <input onChange={handleChange} />
          <button onClick={handleClick}>Become Member</button>
        </>
      )}
    </>
  );
}

export default index;
