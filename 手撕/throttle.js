// 节流 节流是以时间段为节点，如果事件触发在这个时间段内，那么就只触发一次。

// 定时器
function throttle(cb,delay=250){
    let shouldWait = false;
    return (...args) =>{
        // 如果应该等到，不执行
        if(shouldWait) return;
        // 否则，执行
        cb(...args);
        // 修改标识变量
        shouldWait = true;
        setTimeout(()=>{
            // 到延迟时间后，重新修改标识变量
            shouldWait = false;
        },delay);
    }
}
// 时间戳
function throttle1(cb,delay){
    // 设置初始时间
    let previos = 0;
    return (...args) => {
        let now = +new Date();
        // 根据时间差判断是否执行
        if(now - previos > delay){
            cb(args)
            previos = now;
        }
    }
}