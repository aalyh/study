// 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

// 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。

// 输入: s = "cbaebabacd", p = "abc"
// 输出: [0,6]
// 解释:
// 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
// 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    const sLen = s.length, pLen = p.length;

    if(sLen < pLen){
        return [];
    }
    let res = new Array();
    let sCount = new Array(26).fill(0);
    let pCount = new Array(26).fill(0);
    for(let i = 0; i < pLen; i++){
        ++sCount[s[i].charCodeAt() - 'a'.charCodeAt()];
        ++pCount[p[i].charCodeAt() - 'a'.charCodeAt()];
    }
    if(sCount.toString() === pCount.toString()){
        res.push(0); 
    }
    //滑动窗口，右指针增左指针减
    for(let i = 0; i < sLen - pLen; i++){
        --sCount[s[i].charCodeAt() - 'a'.charCodeAt()];
        ++sCount[s[i+pLen].charCodeAt() - 'a'.charCodeAt()];
        if(sCount.toString() === pCount.toString()){
            res.push(i+1);
        }
    }
    return res;
};

console.log(findAnagrams("cbaebabacd","abc"));