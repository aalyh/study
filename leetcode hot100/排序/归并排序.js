function mergeSort(arr){
    return sort(arr,0,arr.length-1);
    function sort(arr,left,right){
        if(left < right){
            const mid = Math.floor((left+right)/2);
            const leftArr = sort(arr,left,mid);
            const rightArr = sort(arr,mid+1,right);
    
            // 递归合并
            return merge(leftArr,rightArr);
        }
        return left >= 0 ? [arr[left]] : [];
    }
}

    // 合并两个有序数组
    function merge(leftArr,rightArr){
        let left = 0;
        let right = 0;
        const tmp = [];
        
        while(left < leftArr.length && right < rightArr.length){
            if(leftArr[left] <= rightArr[right]){
                tmp.push(leftArr[left++]);
            }else{
                tmp.push(rightArr[right++])
            }
        }
        // 合并剩下的内容
		if(left < leftArr.length){
			while(left < leftArr.length){
				tmp.push(leftArr[left++]);
			}
		}

		if(right < rightArr.length){
			while(right < rightArr.length){
				tmp.push(rightArr[right++]);
			}
		}
        return tmp;
    }
console.log(mergeSort([5, 4, 1, 2, 3]));
