for(var i = 0; i < 3; i++) {
    setTimeout(function(){
      console.log(i); 
    },1000)
  }

// 如何让上述代码输出 0 1 2
for(var i = 0; i < 3; i++){
    (function(j){
        setTimeout(function(){
            console.log(j);
        },1000)
    })(i);
}