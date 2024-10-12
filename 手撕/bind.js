// bind() 方法创建一个新的函数，在 bind() 被调用时，
// 这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
// 返回一个新的函数  如果使用new运算符调用，则忽略传入的this值
Function.prototype.myBind = function(context){
    // 保存this指向
    const self = this;
    // 获取参数
    const args = Array.prototype.slice.call(arguments,1);
    // const args2 = [].slice.call(arguments)
    // 构造原型链
    const F = function(){};
    F.prototype = this.prototype

    // 创建新的函数
    function bound(){
        // 获取其余参数
        const innerArgs = Array.prototype.slice.call(arguments);
        // 将两次获取的参数拼接起来
        const finalArgs = args.concat(innerArgs);
        // 判断是否是作为构造函数调用
        return self.apply(this instanceof F ? this : context,args)
    }
    bound.prototype = new F();    
    return bound;
}
const info = { name: '张三' };

function Info(age,sex) {
  console.log(`姓名: ${this.name}`);
  console.log(`年龄: ${age}`);
  console.log(`性别: ${sex}`);
}

newInfo = Info.myBind(info);
newInfo(16,'女');

