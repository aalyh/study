/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    // 二分查找
    let left = 0, right = nums.length -1;
    while(left <= right){
        let mid = Math.floor((left + right)/2);
        if(nums[mid] < target){
            left = mid+1;
        }else{
            right = mid-1;
        }
    }
    return left;
};
console.log(searchInsert([1,3,5,6],5));
