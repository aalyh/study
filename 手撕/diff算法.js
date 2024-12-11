const oldVNode = {
    type:'div',
    children:[
        {type:'p', children:'1'},
        {type:'p', children:'2'},
        {type:'p', children:'3'},
    ]
}

const newVNode = {
    type:'div',
    children:[
        {type:'p', children:'4'},
        {type:'p', children:'5'},
        {type:'p', children:'6'},
    ]
}

function patchChildren(n1,n2,container){
    if(typeof n2.children === 'string'){

    }else if(Array.isArray(n2.children)){
        const oldChildren = n1.children;
        const newChildren = n2.children;

        for(let i = 0; i < oldChildren.length; i++){
            patchChildren(oldChildren[i],newChildren[i]);
        }
    }
}