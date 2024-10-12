const myDeepClone = (obj,chache = new WeakMap)=>{
    if(typeof obj !== 'object' || typeof obj === null){
        return obj;
    }
    let newObj = Array.isArray(obj)?[]:{};
    if(chache.has(obj)){
        return obj;
    }
    chache.set(obj,newObj);

    // 处理特殊对象的情况
    if(obj instanceof Date){
        return new Date(obj.getTime())
    }
    if(obj instanceof RegExp){
        return new RegExp(obj);
    }
    Object.keys(obj).forEach((key)=>{
        newObj[key] = myDeepClone(obj[key],chache);
    })
    return newObj;
}

let obj1 = {
    lili:{
        name:'yihan',
        age:19
    }
}
// 浅拷贝
let obj2 = obj1;
obj1.lili.age = 20;
console.log(obj2);

const deepClone = (obj,chache = new WeakMap)=>{
    if(typeof obj !== 'object' || typeof obj === null){
        return obj;
    }
    let newObj = Array.isArray(obj) === 'array' ? [] : {};
    if(chache.has(obj)){
        return obj;
    }
    chache.set(obj);
    if(obj instanceof Date){
        return new Date(obj.getTime());
    }
    if(obj instanceof RegExp){
        return new RegExp(obj);
    }
    Object.keys(obj).forEach((key)=>{
        newObj[key] = deepClone(newObj[key],chache);
    })
}