/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function(s) {
    // 记录每个字符最后出现的位置
    let hash = {};
    for(let i = 0; i < s.length; i++){
        hash[s[i]] = i;
    }
    let result = [];
    let left = 0;
    let right = 0;
    // 2. 从头遍历字符，并更新字符的最远出现下标，如果找到字符最远出现位置下标和当前下标相等了，则找到了分割点
    for(let i = 0; i < s.length; i++){
        right = Math.max(right,hash[s[i]]);
        if(i === right){
            result.push(right - left + 1);
            left = i+1;
        }
    }
    return result
};
partitionLabels('ababcbacadefegdehijhklij')