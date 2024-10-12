// 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。

// 子数组是数组中元素的连续非空序列。
// 输入：nums = [1,2,3], k = 3
// 输出：2

//前缀和 + 哈希表
// 定义pre[i] 为 [0,i]里所有数的和 则 pre[i] = pre[i-1] + nums[i]

//数组 [i，j]的值为k 表达为 pre[j] - pre[i-1] = k;  -> pre[i-1] - k = pre[j]

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    let mp = new Map();
    mp.set(0,1)
    let count = 0, pre = 0;
    for(const num of nums){
        pre += num;
        if(mp.has(pre - k)){
            count += mp.get(pre - k);
        }
        if(mp.has(pre)){
            mp.set(pre,mp.get(pre)+1);
        }else {
            mp.set(pre,1)
        }
    }
    return count;
};

console.log(subarraySum([3,4,7,2,-3,1,4,2],7));