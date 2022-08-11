import { vnode } from "snabbdom"
import createEle from "./createEle"
import patchVnode from "./patchVnode"
import sameVnode from "./sameVnode"

export default function(oldNode, newNode) {
    // 当前是否是dom节点，如果是dom节点需要转换成虚拟节点
    if (oldNode.nodeType === 1) {
        oldNode = vnode(oldNode.tagName.toLowerCase(), {}, [], undefined, oldNode)
    }

    // 对比旧节点和新节点是否是同一个节点
    if (sameVnode(oldNode, newNode)) {
        patchVnode(oldNode, newNode)
    } else {
        // 不是同一个节点，新增新节点，同时删除旧节点
        const newDom = createEle(newNode)
        if (newDom) {
            oldNode.elm.parentNode.insertBefore(newDom, oldNode.elm)
            oldNode.elm.parentNode.removeChild(oldNode.elm)
        }
    }
}
