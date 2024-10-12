function myNew(constructor,...args){
    //  检查第一个参数是否是函数
    if (typeof constructor !== 'function') {
        throw new Error('第一个参数必须是构造函数');
    }
    // 创建一个空对象
    const obj = {};
    // 将这个对象的内部原型链接到构造函数的prototype对象
    // obj.__proto__ = Object.create(constructor.prototype);
    obj.__proto__ = constructor.prototype;


    // 将这个对象作为this上下文，并调用构造函数
    const result = constructor.apply(obj,args);

    // 如果构造函数返回的是一个对象，则返回这个对象，否则返回新创建的对象
    return result instanceof Object ? result : obj;
}