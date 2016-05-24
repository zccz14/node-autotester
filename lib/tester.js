"use strict";
const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const Builder = require('./builder');
const buffer = require('buffer');


function testInput(input, testingFile, standardFile, options = {}) {
    options.input = input;
    // console.log(input, options);
    try {
        var testing = child_process.execFileSync(testingFile, [], options);
    } catch (e) {
        console.log('throwA', JSON.stringify(e)); // Testing Error
        return false;
    }
    try {
        var standard = child_process.execFileSync(standardFile, [], options);
    } catch (e) {
        console.log('throwB', JSON.stringify(e));
        return false;
    }
    return {
        passed: testing.toString() == standard.toString(),
        input: input,
        output: {
            testing: testing,
            standard: standard
        }
    };
}


class Tester {
    constructor(rootPath = path.join()) {
        const buildPath = this.buildPath = path.join(rootPath, 'bin');
        const sourcePath = this.sourcePath = path.join(rootPath, 'src');
        const dataPath = this.dataPath = path.join(rootPath, 'data');
        const testingFile = this.testingFile = path.join(buildPath, 'testing');
        const standardFile = this.standardFile = path.join(buildPath, 'standard');
        const generatorFile = this.generatorFile = path.join(buildPath, 'generator');


        this.cases = fs.readdirSync(dataPath).map(v => fs.readFileSync(path.join(dataPath, v)));
        console.log(this.cases);

        var builder = new Builder(sourcePath, buildPath, function (filename, sourcePath, buildPath) {
            return `g++ -o ${path.join(buildPath, filename.split('.')[0])} ${path.join(sourcePath, filename)}`;
        }, function onbuild() {
            console.log('build successfully');
            if (this.cases.length > 0) {
                console.log('start testing', this.cases.length);
            } else {
                console.log('no cases to test');
            }
            this.cases.forEach((v, i) => {
                console.log(`case #${i + 1} , passed: ${testInput(v, testingFile, standardFile, { timeout: 1000 }).passed}`);
            });
        }.bind(this));
    }

    seekError(times = Infinity) {
        for (var i = 1; i <= times; i++) {
            var input = child_process.execFileSync(this.generatorFile);
            var ret = testInput(input, this.testingFile, this.standardFile, { timeout: 1000 });
            // var errorInput = this.randomTest();
            console.log(`case #${i} / ${times} , passed: ${ret.passed}`);

            if (!ret.passed) {
                console.log('target found');
                console.log(`input:\n${ret.input}\nStandard Output:\n${ret.output.standard}\nTesting Output:\n${ret.output.testing}\n`);
                this.cases.push(ret.input);
                // save input and output into file
                fs.writeFileSync(path.join(this.dataPath, `${this.cases.length + 1}.in`), ret.input);
                break;
            }
        }
    }
}

module.exports = Tester;