class MyItrator{
    constructor(params){
        this.index = 0;
        this.value = params;
    }
    [Symbol.iterator](){
        return this;
    }
    next(){
        return{
            value:this.value[this.index++],
            // 能否返回下一个值
            done:this.index > this.value.length ? true:false
        }
    }
}