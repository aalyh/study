// 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 
// 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。
// 请你返回所有和为 0 且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。
// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
// 解释：
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
// 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
// 注意，输出的顺序和三元组的顺序并不重要。

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let n = nums.length;
    let res = new Array();
    nums.sort((a,b)=> a-b)
    for(let k = 0; k < n-2; k++){
        if(nums[k] > 0){
            break;
        }
        if(k > 0 && nums[k] === nums[k-1]){
            continue;
        }
        let i = k+1, j = n-1;
        while(i < j){
            let sum = nums[k] + nums[i] + nums[j];
            if(sum < 0){
                //跳过所有重复的nums[i]
                while(i<j && nums[i] === nums[++i]);
            }else if(sum > 0){
                while(i < j && nums[j] === nums[--j]);
            }else{
                let arr = new Array(nums[k],nums[i],nums[j])
                res.push(arr)
                while(i < j && nums[i] == nums[++i]);
                while(i < j && nums[j] == nums[--j]);
            }
        }
    }
    return res;
};
console.log(threeSum([-1,0,1,2,-1,-4]));