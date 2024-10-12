/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    const res = [];
    if(!root){
        return res;
    }
    const q = [];
    q.push(root);
    while(q.length !== 0){
        const currentLevelSize = q.length;
        res.push([]);
        for(let i = 1; i <= currentLevelSize; ++i){
            const node = q.shift();
            res[res.length -1].push(node.val);
            if(node.left){
                q.push(node.left);
            }
            if(node.right){
                q.push(node.right);
            }
        }
    }
    return res;
};