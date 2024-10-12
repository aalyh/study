// call会立即调用函数 传递一个或多个参数

Function.prototype.myCall = function(thisArg,...args){
    // 判断参数指定的this类型
    // call()函数在thisArg参数的类型为undefined或者为null时，会将thisArg自动指向全局对象
    // console.log(thisArg);
    
    if(thisArg === undefined || thisArg === null){
        thisArg = typeof window === 'undefined' ? global : window;
    }

    // 为了避免覆盖thisArg上的同名方法/属性，借用Symbol生成对应属性名
    const key = Symbol('fn');

    // 改造对象，添加方法    
    thisArg[key] = this;

    // 执行方法
    const result = thisArg[key](...args);
    
    // 复原对象，删除方法
    delete thisArg[key];

    return result;
}
const info = { name: '张三' };

function Info(age,sex) {
  console.log(`姓名: ${this.name}`);
  console.log(`年龄: ${age}`);
  console.log(`性别: ${sex}`);
}

Info.myCall(info,18,'女');

// const MyCall = function(thisArg,...args){
//     if(typeof thisArg === null || typeof thisArg === undefined){
//         thisArg = typeof window === 'undefined' ? global : window;
//     }

//     const key = Symbol('fn');
//     thisArg[key] = this;
//     const result = thisArg[key](...args);
//     delete thisArg[key];
//     return result;
// }