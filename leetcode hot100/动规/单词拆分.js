/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    let n = s.length;
    let dp = new Array(n+1).fill(false);
    let wordDictSet = new Set(wordDict);
    dp[0] = true;
    for(let i = 1; i <= n; i++){
        for(let j = 0; j < i; j++){
            if(dp[j] && wordDictSet.has(s.substr(j,i-j))){
                dp[i] = true;
                break;
            }
        }
    }
    return dp;
};
console.log(wordBreak('leetcode',["leet", "code"]));
