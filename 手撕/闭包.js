for(var i=0;i<10;i++){
    setTimeout(function(){
        console.log(i);  //连续的10个10
    },0);
}
for(let i=0;i<10;i++){
    setTimeout(function(){
        console.log(i);  // 1,2 3,4..
    },0);
}
for(var i=0;i<10;i++){
    (function(i){
        setTimeout(function(){
            console.log(i);  //1,2,3,4,5
        },0);
    })(i)
}