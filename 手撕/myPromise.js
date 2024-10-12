class myPromise{
    constructor(executor){
        this.state = 'pending';//定义promise状态
        this.value = undefined;//用于将resolve中的值存起来
        this.onResolvedCallbacks = [];//用来存.then中的回调
        this.onRejectedCallbacks = [];//用于存.catch中的回调
        const resolve = (val) => {
            if(this.state === 'pending'){
                this.state = 'resolved';
                this.value = val;
                this.onResolvedCallbacks.forEach(fn => fn(val));
            }
        }
        const reject = (val) => {
            if(this.state === 'pending'){
                this.state = 'rejected';
                this.value = val;
                this.onRejectedCallbacks.forEach(fn => fn(val));
            }
        }
        executor(resolve,reject);
    }
    then(onFulfilled,onRejected){
        if(onFulfilled && typeof onFulfilled !== 'function' || onRejected && typeof onRejected !== 'function'){
            throw new Error('then必须接受一个function');
        }
        return new myPromise((resolve,reject)=>{
            if(this.state === 'fulfilled'){
                setTimeout(() => {
                    try {
                        const result = onFulfilled(this.value);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
            if(this.state === 'rejected'){
                setTimeout(() => {
                    try {
                        const x = onRejected(this.value);
                        resolve(x)
                    } catch (error) {
                        reject(error);
                    }
                });
            }
            if(this.state === 'pending'){
                this.onResolvedCallbacks.push((val)=>{
                    setTimeout(()=>{
                        onFulfilled(val);
                    })
                })
                this.onRejectedCallbacks.push((val)=>{
                    setTimeout(()=>{
                        onRejected(val);
                    })
                })
            }
        })
    }
}
new myPromise((resolve,reject)=>{
    resolve(1)
}).then((res)=>{
    console.log(res);
})