function myNextTick(fn){
    let app = document.getElementById('app');

    // 使用mutationObserver方法监听dom
    var observerOptions = {
        childList:true,
        attributes:true,
        subtree:true,
    };
    // 要保证fn在dom更新完成后调用
    // 创建一个dom监听器
    let observer = new MutationObserver((el,obs)=>{
        fn();
    })

    observer.observe(app,observerOptions);
}