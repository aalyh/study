/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
// 反转链表
const myReverse = (head,tail)=>{
    let prev = tail.next;
    let p = head;
    while(prev !== tail){
        const next = p.next;
        p.next = prev;
        prev = p;
        p = next;
    }
    return [tail,head];
}
var reverseKGroup = function(head, k) {
    const hair = new ListNode(0);
    hair.next = head;
    let prev = hair;
    while(head){
        let tail = prev;
        // 查看剩余部分长度是否大于等于k
        for(let i = 0; i < k; i++){
            tail = tail.next;
            if(!tail){
                return hair.next;
            }
        }
        const next = tail.next;
        [head,tail] = myReverse(head,tail);
        // 把子链表重新接回原链表
        prev.next = head;
        tail.next = next;
        prev = tail;
        head = tail.next;
    }
    return hair.next;
};