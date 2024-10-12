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
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if(!root){
        return true;
    }
    const isMirro = (l,r)=>{
        if(!l && !r){return true}
        if(l && r && l.val === r.val && isMirro(l.left,r.right) && isMirro(l.right,r.left)){
            return true;
        }
        return false;
    }
    return isMirro(root.left,root.right);
};