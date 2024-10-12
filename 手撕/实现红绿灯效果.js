function delay(fn,time){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(fn())
        },time);
    })
}

async function light(){
    await delay(()=> console.log("red",3000))
    await delay(()=> console.log("green"),2000)
    await delay(()=> console.log("yellow"),1000)
    await light();
}
light();