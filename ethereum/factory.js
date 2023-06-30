import web3 from "./web3";
import taskFactory from "./build/TaskFactory.json";

let instance = false;
if(web3){
    instance = new web3.eth.Contract(
    JSON.parse(taskFactory.interface),
    '0xf5b5a0E525CF413Ff4c13A4227b045715B96aFb8'
)
}
export default instance;