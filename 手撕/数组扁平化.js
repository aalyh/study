// 扁平结构转树状结构
const flatToTree = (list) =>{
    const result = [];
    const itemMap = {}

    list.forEach((item)=>{
        const {pid,id} = item;
        if(!itemMap[id]?.children){
            itemMap[id] = {
                children:[]
            }
        }
        itemMap[id] = {
            ...item,
            children:itemMap[id]["children"]
        }
        const treeItem = itemMap[id];
        if(pid === 0){
            result.push(treeItem)
        }else{
            if(!itemMap[pid]?.children){
                itemMap[pid] = {
                    children:[]
                }
            }
            itemMap[pid]["children"].push(treeItem);
        }
    })
    return result;
}
// 树状结构转扁平化结构
const treeToFlat = (data)=>{
    const result = [];
    const queue = [...data];
    // 遍历
    while(queue.length){
        // 从数组头部取出数据
        const node = queue.shift();
        const children = node.children;
        // 将children继续加入queue
        if(children){
            queue.push(...children)
        }
        // 删除children属性
        delete node.children;
        result.push(node);
    }
    return result;
}

const tree = [
    {
        id: 1,
        name: "部门1",
        pid: 0,
        children: [
            {
                id: 2,
                name: "部门2",
                pid: 1,
                children: []
            },
            {
                id: 3,
                name: "部门3",
                pid: 1,
                children: [
                    {
                        id: 4,
                        name: "部门4",
                        pid: 3,
                        children: [
                            {
                                id: 5,
                                name: "部门5",
                                pid: 4,
                                children: []
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
const flat = [
    { id: 1, name: "部门1", pid: 0 },
    { id: 2, name: "部门2", pid: 1 },
    { id: 3, name: "部门3", pid: 1 },
    { id: 4, name: "部门4", pid: 3 },
    { id: 5, name: "部门5", pid: 4 }
]

console.log(JSON.stringify(flatToTree(flat)));
