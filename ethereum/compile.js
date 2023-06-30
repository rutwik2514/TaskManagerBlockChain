const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');


const buildPath = path.resolve(__dirname,'build')

//below line removes everything from particular path
fs.removeSync(buildPath);
const taskPath = path.resolve(__dirname, 'Contract', 'Task.sol')
const source = fs.readFileSync(taskPath, 'utf8');
const output = solc.compile(source,1).contracts;
console.log(output)

//below line sees if there is directory or not, if not it makes new direcotry
fs.ensureDirSync(buildPath);

for (let contracts in output){
    fs.outputJSONSync(
        path.resolve(buildPath, contracts.replace(':','') + '.json'),
        output[contracts]
    ) 
}