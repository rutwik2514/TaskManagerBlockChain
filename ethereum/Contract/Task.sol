pragma solidity ^0.4.17;

contract TaskFactory{
    mapping(address => bool)created;
    mapping(address=>address)taskPages;
    function createCampaign(string memory message) public {
        require(created[msg.sender]==false);
        address newTask = new Task(message,msg.sender);
        created[msg.sender]=true;
        taskPages[msg.sender]=newTask;
    }

    function showSender(address senderPerson) public view returns(address){
        return senderPerson;
    }

    function isAlreadyMember(address senderPerson) public view returns(bool){
       return created[senderPerson];
    }

    function getAddress(address senderPerson) public view returns(address){
        return taskPages[senderPerson];
    }

    }




























contract Task{
    //declaring variables
    address public manager;
    string public creatorName;
    struct task{
        string title;
        string description;
    }
    task[] public tasks;
    //modifiers
    modifier onlyManager(){
        require(msg.sender==manager);
        _;
    }
    //functions
    function Task(string memory message, address creator) public {
        manager=creator;
        creatorName= message;
    }
    function addTask(string memory title, string memory description) public onlyManager {
        task memory temptask = task({
            title:title,
            description:description
        });
        tasks.push(temptask);
    }
    function getManager() public view returns(address){
        return manager;
    }
    function getTasksCount() public view returns(uint){
        return (
            tasks.length
        );
    }
}