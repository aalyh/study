/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let low = 0;
    let height = nums.length -1;
    while(low < height){
        const mid = Math.floor((low+height)/2);
        if(nums[mid] < nums[height]){
            height = mid;
        }else{
            low = mid +1;
        }
    }
    return nums[low];
};