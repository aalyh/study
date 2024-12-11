
Array.prototype.myReduce = function (callback, initialValue) {
    let arr = this;
    // 浅拷贝数组  
    // var arr = Array.prototype.slice.call(this);
    
    // 校验  调用这个方法的要是个数组 
    if (this === null || this === undefined) {
        // this 不存在，抛出错误
        throw new TypeError('Array.prototype.reduce ' +
            'called on null or undefined');
    }
    // if (Object.prototype.toString.call(arr) !== '[object Array]' || arr.length === 0)
    // return;
    if (!Array.isArray(this)) {
        throw ('调用对象必须是一个数组');
    }
    if (typeof callback != 'function') {
        throw ('累计器必须是一个函数类型');
    }
    // if (this.length === 0) {
    //     return ;
    // }
    if (!arr.length) {
        return
    }

    // 如果调用 reduce()时提供了 init, pre 取值为 init，
    // cur 取数组中的第一个值；
    // 如果没有提供 init，那么 pre 取数组中的第一个值
    // cur 取数组中的第二个值


    pre = initialValue == undefined ? arr[0] : initialValue
    // 正在处理元素的索引，若提供init值，则索引为0，否则索引为1
    let i = initialValue == undefined ? 1 : 0;

    for (i; i < arr.length; i++) {
        pre = callback(pre, arr[i], i, arr);
    }

    return pre;


}

