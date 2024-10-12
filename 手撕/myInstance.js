function myInstance(left,right){
    let prototype = right.prototype;
    let proto = Object.getPrototypeOf(left);

    while(proto){
        if(proto === prototype){
            return true;
        }else{
            proto = Object.getPrototypeOf(proto)
        }
    }
    return false;
}

let Person = {
    name:'lili'
}

console.log(Person instanceof Object);
console.log(myInstance(Person,Object));

