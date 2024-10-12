/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let n = s.length;
    if(n%2 === 1){
        return false;
    }
    let map = new Map([
        [')','('],
        [']','['],
        ['}','{']
    ])
    const stack = [];
    for(let ch of s){
        if(map.has(ch)){
            if(!stack.length || stack[stack.length -1] !== map.get(ch)){
                return false;
            }
            stack.pop();
        }else{
            stack.push(ch);
        }
    }
    return !stack.length;
};