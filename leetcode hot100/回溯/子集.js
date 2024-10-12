/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const n = nums.length;
    const ans = [];
    const path = [];
    function dfs(i){
        ans.push(path.slice());
        for(let j = i; j < n; j++){
            path.push(nums[j]);
            dfs(j+1);
            path.pop();
        }
    }
    dfs(0);
    return ans;
};
subsets([1,2,3])