/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
 //dp[j]：凑足总额为j所需钱币的最少个数为dp[j]
 var coinChange = function(coins, amount) {
    let dp = new Array(amount+1).fill(Number.MAX_VALUE);
    dp[0] = 0;
    for(let i = 1; i <= amount; i++){
        for(let j = 0; j < coins.length; j++){
            if(coins[j] <= i){
                dp[i] = Math.min(dp[i],dp[i-coins[j]]+1);
            }
        }
    }    
    return dp[amount]
};
console.log(coinChange([1, 2, 5],11));
