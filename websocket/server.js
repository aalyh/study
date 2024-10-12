import eventBus from "../js/eventBus.js"
const ModeCode = {
    MSG:'message',//普通消息
    HEART_BEAT:'heart_beat'//心跳
}

export default class MyWebSocket extends WebSocket{
    constructor(url,protocols){
        super(url,protocols);
        return this;
    }
    /**
     * 入口函数
     * @param heartBeatConfig  time：心跳时间间隔 timeout：心跳超时间隔 reconnect：断线重连时间间隔
     * @param isReconnect 是否断线重连
    */
    init(heartBeatConfig,isReconnect){
        this.onopen = this.openHandler
        this.onclose = this.closeHandler
        this.onmessage = this.messageHandler
        this.onerror = this.errorHandler
        this.heartBeat = heartBeatConfig
        this.isReconnect = isReconnect
        this.reconnectTimer = null//断线重连时间器
        this.webSocketState = false//socket状态 true为已连接
    }

    openHandler(){
        eventBus.emitEvent('changeBtnState', 'open')//触发事件改变按钮样式
        this.webSocketState = true;
        this.heartBeat && this.heartBeat.time ? this.startHeartBeat(this.heartBeat.time):"";
        console.log('开启心跳机制');
    }
    messageHandler(){
        let data = this.getMsg(e);
        switch(data.ModeCode){
            case ModeCode.MSG:
                console.log('收到消息' + data.msg);
            case ModeCode.HEART_BEAT:
                this.webSocketState = true
                console.log('收到心跳响应' + data.msg);
                break;
        }
    }
    closeHandler(){
        eventBus.emitEvent('changeBtnState','close');
        this.webSocketState = false
        console.log('关闭');
    }
    errorHandler(){
        eventBus.emitEvent('changeBtnState','close');
        this.webSocketState = false;
        this.reconnection()//重连
        console.log('出错');
    }
    /**
     * 心跳初始函数
     * @param time 心跳时间间隔
     */
    startHeartBeat(time){
        setTimeout(() => {
            this.sendMsg({
                ModeCode:ModeCode.HEART_BEAT,
                msg:new Date()
            })
            this.waitingServer();
        }, time);
    }
    //延时等待服务端响应，通过webSocketState判断是否连线成功
    waitingServer(){
        this.webSocketState = false;
        setTimeout(() => {
            if(this.webSocketState){
                this.startHeartBeat(this.heartBeat.time);
                return
            }
            console.log('心跳无响应');
            try{
                this.onclose();
            }catch(e){
                console.log('连接已关闭');
            }
            
        }, this.heartBeat.timeout);
    }
    //重连操作
    reconnectWebSocket(){
        if(!this.isReconnect){
            return;
        }
        this.reconnectTimer = setTimeout(() => {
            eventBus.emitEvent('reconnect');
        }, this.heartBeat.reconnect);
    }
    getMsg(e){
        return JSON.parse(e)
    }
    sendMsg(obj){
        this.send(JSON.stringify(obj));
    }
}