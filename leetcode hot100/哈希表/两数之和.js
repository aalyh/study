// 给定一个整数数组 nums 和一个整数目标值 target，
//请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

// 你可以按任意顺序返回答案。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let len = nums.length;
    let map = new Map();
    for(let i = 0; i < len; i++){
        if(map.has(target - nums[i])){
            return [map.get(target - nums[i]),i]
        }
        map.set(nums[i],i)
    }
};
console.log(twoSum([2,7,11,15],9));

// map([
    // {value:2,key:0}
    // {value:7,key:1}
    // {value:11,key:2}
    // {value:15,key:3}
//])