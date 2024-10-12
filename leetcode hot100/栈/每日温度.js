/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
    const n = temperatures.length;
    let stack = [];
    let arr = new Array(n).fill(0);
    for(let i = 0; i < n; i++){
        let temp = temperatures[i];
        while(stack.length !== 0 && temp > temperatures[stack[stack.length-1]]){
            let prev = stack[stack.length-1];
            arr[prev] = i - prev;
            stack.pop();
        }
        stack.push(i);
    }
    return arr;
};
console.log(dailyTemperatures([73,74,75,71,69,72,76,73]));
