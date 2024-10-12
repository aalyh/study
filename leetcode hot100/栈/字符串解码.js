/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    let stack = [];
    for(let ch of s){
        if(ch !== ']'){
            stack.push(ch);
            continue;
        }
        let cur = stack.pop();
        let str = '';
        while(cur !== '['){
            str = cur + str;
            cur = stack.pop();
        }
        let num ='';
        cur = stack.pop();
        while(!isNaN(cur)){
            num = cur+num;
            cur = stack.pop();
        }
        stack.push(cur);
        stack.push(str.repeat(num));
    }
    return stack.join('')
};
console.log(decodeString('3[a2[c]]'));
