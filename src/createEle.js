const createEle = function (vnode) {
    const newDom = document.createElement(vnode.sel);
    if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        // 迭代创建子节点
        vnode.children.forEach(ele => {
            newDom.appendChild(createEle(ele))
        })
    }else if (vnode.text) {
        newDom.innerText = `${vnode.text}`;
    }
    vnode.elm = newDom
    return newDom
}

export default createEle;
