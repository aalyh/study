/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
/**
 *  0  1 
 *  1  0
 *  0 -1
 *  -1 0
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if(!matrix.length || !matrix[0].length){
        return [];
    }
    let rows = matrix.length, cols = matrix[0].length;
    let total = rows * cols;
    let visited = new Array(rows).fill(0).map(()=>new Array(cols));
    let order = new Array(total).fill(0);

    let row = 0, col = 0, directionIndex = 0;
    let directions = [[0,1],[1,0],[0,-1],[-1,0]];
    for(let i = 0; i < total; i++){
        order[i] = matrix[row][col];
        visited[row][col] = true;
        let nextRow = row + directions[directionIndex][0], nextCol = col + directions[directionIndex][1];
        if(!(0<=nextRow && nextRow < rows && 0<= nextCol && nextCol < cols && !(visited[nextRow][nextCol]))){
            directionIndex = (directionIndex +1)%4;
        }
        row += directions[directionIndex][0];
        col += directions[directionIndex][1];
    }
    return order;
};
console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]));
