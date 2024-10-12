/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
    let dp = new Array(n+1).fill(Number.MAX_VALUE);
    dp[0] = 0;
    let arr = [];
    for(let i = 1; i <= n; i++){
        for(let j = 1; j <= Math.round(i/2); j++){
            if(j*j === i){
                arr.push(i)
            }
        }
    }
    console.log('apple'.slice(0,1));
    
    for(let i = 1; i <= n; i++){
        for(let j = 0; j < arr.length; j++){
            if(arr[j] <= i){
                dp[i] = Math.min(dp[i],dp[i - arr[j]]+1);
            }
        }
    }
    return dp[n] > n ? 0 : dp[n]
};

console.log(numSquares(4));
