// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长 子串 的长度。
// 输入: s = "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let set = new Set();
    let right= -1, maxLen = 0;
    for(let i = 0; i < s.length; ++i){
        if(i != 0){
            //左指针向右移一位
            set.delete(s.charAt(i-1))
        }
        while(right+1 < s.length && !set.has(s.charAt(right+1))){
            set.add(s.charAt(right+1))
            ++right;
        }
        maxLen = Math.max(maxLen, right - i + 1)
    }
    return maxLen;
};

console.log(lengthOfLongestSubstring("qrsvbspk"));