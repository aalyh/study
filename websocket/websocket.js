const ws = new WebSocket('ws://localhost:8080/test');
ws.onopen = function(){
    console.log('WebSocket 连接已建立');
    ws.send('Hello,server!');
}

ws.onmessage = function(event){
    console.log('收到服务器消息',event.data);
}
ws.onerror = function(event){
    console.log('连接出现错误',event);
}
ws.onclose = function(){
    console.log('连接已关闭');
}