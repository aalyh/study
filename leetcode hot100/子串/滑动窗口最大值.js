// 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。
// 你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
// 返回 滑动窗口中的最大值 。

/**输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7 */

 /**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var maxSlidingWindow = function(nums, k) {
    let queue = new Array();
    let result = new Array();

    for(let i = 0; i < nums.length; i++){
        // 如果队列不为空，且要入队的元素大于队尾元素, 队尾元素出队
        while (queue.length > 0 && nums[i] > nums[queue[queue.length - 1]]) {
            queue.pop()
        }
        queue.push(i);

        //窗口开始的值
        const j = i - k + 1;
        if (j >= 0) {
            // 当队首元素不属于当前滑动窗口时出队
            if (queue[0] < j) queue.shift()
            // 把队首元素添加到结果数组中
            result.push(nums[queue[0]])
        }
    }
    return result;
};
// var maxSlidingWindow = function(nums, k) {
//     let arr = new Array();
//     let maxCount = 0;
//     let j = k-1;
//     while(j < nums.length){
//         maxCount = nums[j];
//         for(let i = j+1-k; i <= j; i++){
//             maxCount = Math.max(nums[i],maxCount);
//         }
//         arr.push(maxCount);
//         j++;
//     }
//     return arr;
// };
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7],3));