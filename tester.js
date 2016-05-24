var Tester = require('.');

var generator = 
`
// place the data generator program here
#include <cstdio>
#include <cmath>
#include <ctime>
#include <cstdlib>

// generate a random integer in [l, r], assuming that r >= l
inline int random(int l, int r){return rand()%(r - l + 1) + l;}

int main(){
    srand(time(NULL));
    printf("%d %d\\n", random(-10, 10), random(-10, 10));
    return 0;
}
`

var std = 
`
#include <cstdio>
int main(){
    int a, b;
    scanf("%d%d", &a, &b);
    printf("%d\\n", a + b);
    return 0;
}
`

var main = 
`
#include <cstdio>
int main(){
    int a, b;
    scanf("%d%d", &a, &b);
    printf("%d\\n", a + b);
    return 0;
}
`

var tester = new Tester(main, std, generator);
tester.compile();
var report = tester.test(100);
console.log(report.isAllAccepted());