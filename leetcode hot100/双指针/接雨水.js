// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。


/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let n = height.length;
    let left = 0, right = n-1;
    let rightMax = 0, leftMax = 0;
    let res = 0;
    while(left < right){
        leftMax = Math.max(leftMax,height[left]);
        rightMax = Math.max(rightMax,height[right]);
        if(height[left] < height[right]){
            res += leftMax - height[left];
            left++;
        }else if(height[left] >= height[right]){
            res += rightMax - height[right];
            right--;
        }
    }
    return res;
};

console.log(trap([0,1,0, 2,1,0,1 ,3,2,1,2,1])); 