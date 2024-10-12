function quickSort(arr){
    sort(arr,0,arr.length-1);
    return arr;
}
// function sort(arr,low,high){
//     if(low >= high){
//         return;
//     }
//     let i = low;
//     let j = high;
//     const x = arr[i];//x作为比较值
//     while(i < j){
//         //从数组尾部找到比x小的数字
//         while(arr[j] >= x && i < j){
//             j--;
//         }
//         // 将空出的位置，填入当前值，下标j位置空出
//         if(i < j){
//             arr[i] = arr[j];
//             i++;
//         }
//         // 从数组头部找到比x大的数字
//         while(arr[i] <= x && i < j){
//             i++;
//         }
//         // 将数组填入下表j中
//         if(i < j){
//             arr[j] = arr[i];
//             j--;
//         }
//     }
//     arr[i] = x;
//     // 分别对剩下两个区间进行递归排序
//     sort(arr,low,i-1);
//     sort(arr,i+1,high);
// }
function sort(arr,low,high){
    if(low >= high){
        return;
    }
    let i = low, j = high, x = arr[i];
    while(i < j){
        while(arr[j] >= x && i < j){
            j--;
        }
        if(i < j){
            arr[i] = arr[j]
        }
        while(arr[i] <= x && i < j){
            i++
        }
        if(i < j){
            arr[j] = arr[i]
        }
    }
    arr[i] = x;
    sort(arr,low,i-1);
    sort(arr,i+1,high);
}
console.log(quickSort([5, 4, 1, 2, 3]));
