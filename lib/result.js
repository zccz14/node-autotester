class Result {
    constructor(data, main, std){
        this.input = data;
        this.output = {
            main: main,
            std: std,
        };
        this.accepted = this.output.main.toString() == this.output.std.toString();
    }
    
    isAccepted(){
        return this.accepted;
    }
};

module.exports = Result;