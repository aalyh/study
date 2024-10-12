function myAjax(url){
    return new Promise((resolve,reject)=>{
        // 处理兼容
        const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        xhr.open('GET',url,false);

        xhr.onreadystatechange = function(){
            if(xhr.readyState !== 4){ //4标识完成所有数据的传输
                return;
            }
            // 304命中协商缓存
            if(xhr.status === 200 || xhr.status === 304){
                resolve(xhr.responseText)
            }else{
                reject(xhr.responseText);
            }
        }
        xhr.send();
    })
}
// 使用立即执行函数表达式调用异步函数
(async function () {
    try {
        // 调用异步函数并获取返回的Promise对象
        const p = myAjax('https://api.github.com/users/sAnL1ng/repos');
        // 输出信息
        console.log(p); // Promise 处于 pending 状态
        // 使用 await 等待异步操作完成
        const data = await p;
        
        // 异步操作完成后的处理
        console.log(p); // Promise 从 pending 到 fulfilled 状态
        console.log(JSON.parse(data));
    } catch (err) {
        console.error(err); // 捕获可能的错误
    }
})();