/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let res = [];
    let left = 0, right = nums.length-1;
    while(left <= right){
        let mid = Math.floor((left+right)/2);
        while(nums[mid] === target){
            res.push(mid);
            mid++;
        }
        if(nums[mid] < target){
            left = mid+1;
        }else{
            right = mid-1;
        }
    }
    return res;
};
console.log(searchRange([5,7,7,8,8,10],8));
