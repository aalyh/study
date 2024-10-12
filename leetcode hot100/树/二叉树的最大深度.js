/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * dfs
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = (root) => {
    if (root == null) return 0;
    const leftMaxDepth = maxDepth(root.left);
    const rightMaxDepth = maxDepth(root.right);
    return 1 + Math.max(leftMaxDepth, rightMaxDepth);
};
/**
 * bfs
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth2 = (root) => {
    if(root == null) return 0;
    const queue = [root];
    let depth = 1;
    while(queue.length){
        const levelSize = queue.length;
        for(let i = 0; i < levelSize; i++){
            const cur = queue.shift();
            if(cur.left) queue.push(cur.left);
            if(cur.right) queue.push(cur.right);
        }
        if(queue.length) depth++;
    }
    return depth;
};