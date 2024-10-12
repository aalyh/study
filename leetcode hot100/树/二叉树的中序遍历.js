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
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    let res = [];
    const inroder = (root) =>{
        if(!root){
            return root;
        }else{
            inroder(root.left);
            res.push(root.val);
            inroder(root.right);
        }
    }
    inroder(root);
    return res
};