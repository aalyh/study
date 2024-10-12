/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const res = [];
    const path = [];
    const used = {};

    function dfs(cur){
        if(cur === nums.length){
            res.push(path.slice());
            return;
        }
        for(const num of nums){
            if(used[num]){
                continue;
            }
            path.push(num);
            used[num] = true;
            dfs(cur+1);
            path.pop();
            used[num] = false;
        }
    }
    dfs(0);
    return res;
};
console.log(permute([1,2,3]));
