function ListNode(val,next){
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    const p = new ListNode(0,head);
    let length = 0, cur = head;
    while(cur){
        length++;
        cur = cur.next;
    }
    cur = p;
    while(n !== length){
        cur = cur.next;
        length--;
    }
    cur.next = cur.next.next;
    return p.next;
};
console.log(removeNthFromEnd([1,2,3,4,5],2));
