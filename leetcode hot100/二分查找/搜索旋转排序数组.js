/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let n = nums.length;
    let left = 0, right = n - 1;
    if(!n){
        return -1;
    }
    if(n === 1){
        return nums[0] === target ? 0 : -1;
    }
    while(left <= right){
        let mid = Math.floor((left + right)/2);
        if(nums[mid] === target){
            return mid;
        }
        if(nums[0] <= nums[mid]){
            if(nums[0] <= target && target < nums[mid]){
                right = mid-1;
            }else{
                left = mid+1;
            }
        }else{
            if(nums[mid] < target && target <= nums[n-1]){
                left = mid+1
            }else{
                right = mid-1
            }
        }
    }
    return -1;
};
console.log(search([4,5,6,7,0,1,2],0));
