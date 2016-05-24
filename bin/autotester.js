'use strict';
var path = require('path');
var fs = require('fs');

const Tester = require('../lib/tester');

var node = process.argv.shift();
var script = process.argv.shift();

var method = process.argv.shift();

if (method == 'create') {
    let workspace = process.argv.shift();
    createWorkspace(workspace);
} else if (method == 'seek') {
    let times = process.argv.shift();
    var tester = new Tester();
    tester.seekError(times? times: Infinity);
} else {
    console.log('autotester --help : See Usage Help');
}

function createWorkspace(rootPath) {
    // rootPath = rootPath || __dirname;
    fs.mkdir(rootPath, function (err) {
        // if (err) {
        //     if (err.errno == -4075) console.log(`folder ${rootPath} exsits`);
        //     else return console.log(err);
        // }
        fs.mkdir(path.join(rootPath, 'src'), function (err) {
            fs.writeFileSync(path.join(rootPath, 'src', 'testing.cpp'), '');
            fs.writeFileSync(path.join(rootPath, 'src', 'standard.cpp'), '');
            fs.writeFileSync(path.join(rootPath, 'src', 'generator.cpp'), '');
            console.log('edit your code in ./src');
        });
        fs.mkdir(path.join(rootPath, 'data'), function (err) {
        });
        fs.mkdir(path.join(rootPath, 'bin'), function (err) {
        });
    });
}
