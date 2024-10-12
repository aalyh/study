//apply() 方法接受的是一个包含多个参数的数组。
Function.prototype.myApply = function(thisArg,...args){
    if(typeof thisArg === undefined || typeof thisArg === null){
        thisArg = typeof window === 'undefined' ? global : window;
    }
    // 参数以数组形式传入
    args = Object(args);
    const key = Symbol('fn');
    thisArg[key] = this;
    console.log(...args);
    const result = args ? thisArg[key](...args) : thisArg[key]();
    delete thisArg[key];
    return result;
}
const info = { name: '张三' };

function Info(age,sex) {
  console.log(`姓名: ${this.name}`);
  console.log(`年龄: ${age}`);
  console.log(`性别: ${sex}`);
}

Info.myApply(info,[18,'女']);