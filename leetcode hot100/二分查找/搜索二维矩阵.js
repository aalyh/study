/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    let first = 0, end = matrix.length -1;
    let arr = new Array();
    for(let i = 0; i < matrix.length; i++){
        arr.push(matrix[i][0]);
    }
    while(first <= end){
        let mid = Math.floor((first + end)/2);
        if(arr[mid] === target){
            return true;
        }
        if(arr[mid] < target){
            first = mid+1;
        }else{
            end = mid -1;
        }
    }
    if(row < 0){
        return false;
    }
    let row = first-1;
    first = 0, end = matrix[row].length-1;
    while(first <= end){
        mid = Math.floor((first+end)/2);
        if(matrix[row][mid] === target){
            return true;
        }
        else if(matrix[row][mid] < target){
            first = mid+1;
        }else{
            end = mid-1;
        }
    }
    return false;
};