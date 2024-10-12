/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    let left = new Array();
    let right = new Array();
    left[0] = 1, right[nums.length-1] = 1;
    for(let i = 1, j = nums.length-2; i < nums.length, j >= 0; i++,j--){
        left[i] = left[i-1]*nums[i-1];
        right[j] = right[j+1]*nums[j+1];
    }
    for(let i = 0; i < nums.length; i++){
        nums[i] = left[i]*right[i];
    }
    return nums;
};
console.log(productExceptSelf([1,2,3,4]));
