/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
//以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
//请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
//输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
//输出：[[1,6],[8,10],[15,18]]
//解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
/**
 * 按左端点排序，在排完序的列表中可以合并的区间一定是连续的
 * 
 */
var merge = function(intervals) {
    const merged = new Array();
    intervals.sort((a,b)=>a[0]-b[0]);
    merged.push(intervals[0]);
    for(let i = 1; i < intervals.length; i++){
        // 当前左端点大于merged中右端点 不重合
        const n = merged.length;
        if(intervals[i][0] > merged[n-1][1]){
            merged.push(intervals[i])
        }else{
            //更新merged数组右端点
            merged[n-1][1] = Math.max(intervals[i][1],merged[n-1][1]);
        }
    }
    return merged;
};
console.log(merge([[13,15],[1,13]]));
