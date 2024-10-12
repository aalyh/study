function shellSort(arr){
    for(let gap = Math.floor(arr.length/2); gap > 0; gap = Math.floor(gap/2)){
        for(let i = gap; i < arr.length; i++){
            let j = i;
            // 分组内数字，执行插入排序
            // 当下标大的数字小于下标小的数组，进行交换
            while(j - gap >= 0 && arr[j] < arr[j-gap]){
                const temp = arr[j];
                arr[j] = arr[j-gap];
                arr[j-gap] = temp;
                j = j-gap;
            }
        }
    }
    return arr;
}
console.log(shellSort([5, 4, 1, 2, 3]));
