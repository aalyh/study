Promise.promiseRace = function (promises){
    return new Promise((resolve,reject)=>{
        promises.forEach((item)=>{
            Promise.resolve(item).then(data => {
                resolve(data)
            }, err => {
                reject(err);
            })
        })
    })
}