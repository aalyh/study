function bubbleSort(arr){
    const len = arr.length;
    for(let i = 0; i < len - 1; i++){
        for(let j = 0; j < len - i - 1; j++){
            if(arr[j] > arr[j+1]){
                const temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
console.log(bubbleSort([5, 4, 1, 2, 3]));
