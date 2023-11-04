async function start(){
    return await Promise.resolve('async is working')
}
start().then(console.log)

class Bork {
    static a = "foo";
    y;
}
console.log("Bork:", Bork.a)