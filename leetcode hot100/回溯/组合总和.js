/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    let res = [];
    let path = [];
    const dfs = function(index,candidates,target,sum){
        if(index === candidates.length){
            return;
        }
        if(sum === target){
            res.push(path.slice());
            sum = 0;
            return;
        }
        if(sum > target){
            sum = 0;
            return;
        }
        for(let i = index; i < candidates.length; i++){
            path.push(candidates[i]);
            dfs(i,candidates,target,sum+candidates[i]);
            path.pop();
        }
    }
    dfs(0,candidates,target,0)
    return res;
};
combinationSum([2,3,6,7],7)