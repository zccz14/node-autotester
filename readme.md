# Node Auto Tester

An auto tester built with node.js

**Notice: Now just for native testing, NOT USE IT in your project please.**

**Notice: Now Only g++ available, and consider other build tools later**.

# Contribution
Please fork and pull request to [GitHub](https://github.com/zccz14/node-autotester).

# dependencies

+ g++ compiler (GNU G++)

+ node.js

# Install

Install this package in global.

```bash
$ npm install --global node-autotester 
```

And then you can test if it was installed successfully:

```bash
$ autotester help
```

# Usage

create a coding workspace first

```bash
$ autotester create my_test
```

change directory:

```bash
$ cd my_test
```

edit your code in directory `src` 

```
|- src
    |- main.cpp         # Your code to be tested.
    |- stardard.cpp     # The Standard Code. Ensure its reliablity please.
    |- generator.cpp    # The program to generate random testing data.
```

and then run command below to run tester:

```
$ autotester seek 
```

Or you can specify a max seek times:

```
$ autotester seek 1000
```

And then, the command line will **BLOCK**, waiting for your update of source code.

It will watch your changes and auto rebuild & retest using the old data.

The data are stored in directory `data`.

We use default configuration to run test, if you have other requirements, please contact [me(zccz14@outlook.com)](mailto:zccz14@outlook.com).
