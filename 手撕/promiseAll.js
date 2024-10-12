Promise.myAll = function(promises){
    let arr = [], count=0;
    return new Promise((resolve,reject)=>{
        promises.forEach((item,i)=>{
            Promise.resolve(item).then(res => {
                arr[i] = res;
                count += 1;
                if(count === promises.length){
                    resolve(arr);
                }
            }).catch(reject)
        })
    })
}

// Promise.MyAll = function(promises){
//     let arr = [], count = 0;
//     return new Promise((resolve,reject)=>{
//         promises.forEach((item,i)=>{
//             Promise.resolve(item).then(res =>{
//                 arr[i] = res;
//                 count += 1;
//                 if(count === promises.length){
//                     resolve(arr);
//                 }
//             }).catch(reject)
//         })
//     })
// }