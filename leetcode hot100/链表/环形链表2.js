/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 哈希表记录 快慢指针
var detectCycle = function(head) {
    let slow = head, fast = head;
    while(fast){
        if(fast.next === null || slow.next === null){
            return false;
        }
        slow = slow.next;
        fast = fast.next.next;
        if(fast === slow){
            let pre = head;
            while(pre !== slow){
                pre = pre.next;
                slow = slow.next;
            }
            return pre;
        }

    }
    return false
};