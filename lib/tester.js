"use strict";

const fs = require('fs');
const child_process = require('child_process');
const Report = require('./report');

class Tester {
    constructor(main, std, generator) {
        this.main = main;
        this.std = std;
        this.generator = generator;
    }

    compile() {
        var path = fs.mkdtempSync('./temp-');
        try {
            fs.writeFileSync(path + '/generator.cpp', this.generator);
            var generator = child_process.execSync('g++ -o ' + path + '/generator ' + path + '/generator.cpp');
        } catch (e) {
            console.log('data generator compiler error!');
            console.log(e.stderr.toString());
        }

        try {
            fs.writeFileSync(path + '/std.cpp', this.generator);
            var generator = child_process.execSync('g++ -o ' + path + '/std ' + path + '/std.cpp');
        } catch (e) {
            console.log('standard code compiler error!');
            console.log(e.stderr.toString());
        }

        try {
            fs.writeFileSync(path + '/main.cpp', this.generator);
            var generator = child_process.execSync('g++ -o ' + path + '/main ' + path + '/main.cpp');
        } catch (e) {
            console.log('main code compiler error!');
            console.log(e.stderr.toString());
        }
        this.path = path;
    }

    test(n = 1) {
        var report = new Report();
        for (let i = 0; i < n; i++) {
            var data = child_process.execFileSync(this.path + '/generator');
            // console.log('[data]:', data.toString(), data);

            var main = child_process.execFileSync(this.path + '/main', [], {
                input: data,
                timeout: 1000,
            });

            // console.log('[main]:', main.toString(), main);

            var std = child_process.execFileSync(this.path + '/std', [], {
                input: data,
                timeout: 1000,
            });

            // console.log('[std]:', std.toString(), std);

            report.push(data, main, std);
        }
        return report;
    }
}

module.exports = Tester;