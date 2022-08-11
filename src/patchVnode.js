import updateChildren from './updateChildren';
import createEle from "./createEle"

export default function (oldNode, newNode) {
    newNode.elm = oldNode.elm
    // 两者完全相等
    if (oldNode === newNode) return;
    // 新节点有text，无子节点
    if (newNode.text && (!newNode.children || newNode.children.length === 0)) {
        // 旧节点与新节点text是否相等
        if (oldNode.text !== newNode.text) {
            oldNode.elm.innerText = newNode.text
        }
    }
    // 新节点有子节点，无text
    if (!newNode.text && Array.isArray(newNode.children) && newNode.children.length > 0) {
        // 旧节点是否有子节点
        if ((!oldNode.children || oldNode.children.length === 0)) {
            oldNode.elm.innerText = ''
            newNode.children.forEach(ele=>{
                oldNode.elm.appendChild(createEle(ele))
            })
        }else {
            updateChildren(oldNode.elm, oldNode.children, newNode.children)
        }
    }
}