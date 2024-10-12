// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
// 输入：nums = [100,4,200,1,3,2]
// 输出：4
// 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    let num_set = new Set();
    //去重
    for(const num of nums){
        num_set.add(num)
    }
    let maxLen = 0;
    for(const num of num_set){
        if(!num_set.has(num-1)){
            // 找到序列头
            let currentNum = num;
            let currentMaxLen = 1;
            while(num_set.has(currentNum+1)){
                currentNum++;
                currentMaxLen++;
            }
            maxLen = Math.max(maxLen,currentMaxLen)
        }
    }
    return maxLen;
};
console.log(longestConsecutive([100,4,200,1,3,2]));