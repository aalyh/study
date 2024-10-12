/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    const st = new Set();
    let temp = headA;
    while(temp !== null){
        st.add(temp);
        temp = temp.next;
    }
    temp = headB;
    while(temp !== null){
        if(st.has(temp)){
            return temp;
        }
        temp = temp.next;
    }
    return null;
};