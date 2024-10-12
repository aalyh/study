/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if(digits.length === 0){
        return [];
    }
    let res = [];
    let path = [];
    let map = new Map([
        ['2','abc'],
        ['3','def'],
        ['4','ghi'],
        ['5','jkl'],
        ['6','mno'],
        ['7','pqrs'],
        ['8','tuv'],
        ['9','wxyz']
    ])
    const dfs = function(index,path){
        if(index === digits.length){
            res.push(path.slice());
            return;
        }
        let letters = map.get(digits[index]);
        for(let i = 0; i < letters.length; i++){
            path.push(letters[i]);
            dfs(index+1,path);
            path.pop();
        }
    }
    dfs(0,path);
    return res;
};
letterCombinations("23")