'use strict';

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const events = require('events');

function build(filename, sourcePath, buildPath, buildFunc) {
    // console.log(buildFunc);
    var basename = filename.split('.')[0];
    var source = path.join(sourcePath, filename);
    var output = path.join(buildPath, basename);
    var result = child_process.execSync(buildFunc(filename, sourcePath, buildPath));

    // console.log(result);
    // if (result.stderr.length > 0) {
    //     console.log(result.stderr.toString());
    //     return false;
    // }
    return true;
}


class Builder {
    constructor(sourcePath, buildPath, buildFunc, onbuild) {
        this.eventEmitter = new events();
        this.eventEmitter.on('build', onbuild);
        // listen the sourcePath change
        fs.watch(sourcePath, function (event, filename) {
            if (event == 'change') {
                if (build(filename, sourcePath, buildPath, buildFunc)) {
                    this.eventEmitter.emit('build');
                } else {
                    console.log('build failed, waiting for changing of source');
                }
            }
        }.bind(this));

        var lists = fs.readdirSync(sourcePath).map(function (v) {
            return {
                filename: v,
                state: build(v, sourcePath, buildPath, buildFunc)
            };
        });


        var failed = lists.filter(v => !v.state);

        if (failed.length == 0) {
            this.eventEmitter.emit('build');
        } else {
            failed.forEach(v => console.log(v.filename));
        }

    }


    on(event, listener) {
        this.eventEmitter.on(event, listener);
    }
}

module.exports = Builder;