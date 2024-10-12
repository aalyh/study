/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var satisfiesConditions = function(grid) {
    const row = grid.length, col = grid[0].length;
    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            if(i+1<row && grid[i][j] !== grid[i+1][j]){
                return false;
            }
            if(j+1 < col && grid[i][j] === grid[i][j+1]){
                return false
            }
        }
    }
    return true;
};
console.log(satisfiesConditions([[1,0,2],[1,0,2]]));
