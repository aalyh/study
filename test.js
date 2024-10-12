function test(Range){
    let range = Range.sort((a,b)=>{
        return a[0] - b[0];
    })
    let right = range[0][1];
    let left = range[1][0];
    if(right >= left){
        range = [range[0][0],Math.max(range[1][1],right)]
    }
    return range;
}

console.log(test([[6,7],[1,9]]));
