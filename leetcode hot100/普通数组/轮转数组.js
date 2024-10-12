/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    let array = new Array();
    for(let i = 0; i < nums.length; i++){
        array[(i+k)%nums.length] = nums[i];
    }
    return array;
};
console.log(rotate([1,2,3,4,5,6,7],3));
