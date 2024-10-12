const arrayMethods = [
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse"
]

const arrayProto = Object.create(Array.prototype);

arrayMethods.forEach((method)=>{
    const origin = Array.prototype[method];
    arrayProto[method] = function(){
        console.log("run method", method);
        return origin.apply(this,arguments);
    }
})

const list = [];
list.__proto__ = arrayProto;
