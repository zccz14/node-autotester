const Result = require('./result');

class Report {
    constructor() {
        this.results = [];
    }

    push(data, main, std) {
        return this.results.push(new Result(data, main, std));
    }

    isAllAccepted() {
        return this.results.filter(v=>!v.isAccepted()).length == 0;
    }
};

module.exports = Report;