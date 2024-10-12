Promise.promiseAny = function(promises){
    let arr = [], count = 0;
    
    return new Promise((resolve,reject)=>{
        promises.forEach((item,i)=>{
            Promise.resolve(item).then(resolve, err => {
                arr[i] = {status:'rejected',val:err}
                count += 1;
                if(count === promises.length){
                    reject(new Error('没有promise成功'))
                }
            })
        })
    })
}