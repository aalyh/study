// 防抖 防抖的原理就是：用户可以尽管触发事件，但是一定在事件触发 n 秒后才执行。
// 如果在此期间又触发了这个事件，那么就从新触发的时间点算起，n 秒后才执行。
function myDebounce(cb,delay = 250){
    let timeout;
    return (...args)=>{
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            cb(...args);
        },delay)
    }
}