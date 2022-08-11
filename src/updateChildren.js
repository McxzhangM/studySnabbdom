import patchVnode from "./patchVnode"
import sameVnode from "./sameVnode"
import createEle from "./createEle"

let keyMap = undefined;

export default function (parentElm, oldCh, newCh) {
    console.debug('parentElm:', parentElm);
    console.debug('oldCh:', oldCh);
    console.debug('newCh:', newCh);
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let newEndIdx = newCh.length - 1;

    let oldStartVnode = oldCh[oldStartIdx];
    let newStartVnode = newCh[newStartIdx];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndVnode = newCh[newEndIdx];
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        console.debug('while')
        if (oldCh[oldStartIdx] === undefined) {
            oldStartVnode = oldCh[++oldStartIdx];
        } else if (oldCh[oldEndIdx] === undefined) {
            oldEndVnode = oldCh[--oldEndIdx];
        } else if (newCh[newStartIdx] === undefined) {
            newStartVnode = newCh[++newStartIdx]
        } else if (newCh[newEndIdx] === undefined) {
            newEndVnode = newCh[--newEndIdx]
        } else if (sameVnode(newStartVnode, oldStartVnode)) {
            console.debug(1);
            console.debug('newStartVnode:', newStartVnode);
            console.debug('oldStartVnode:', oldStartVnode);
            // （1）新前与旧前
            patchVnode(oldStartVnode, newStartVnode)
            newStartVnode = newCh[++newStartIdx];
            oldStartVnode = oldCh[++oldStartIdx];
        }
        else if (sameVnode(newEndVnode, oldEndVnode)) {
            console.debug(2);
            console.debug('newEndVnode:', newEndVnode);
            console.debug('oldEndVnode:', oldEndVnode);
            // （2）新后与旧后
            patchVnode(oldEndVnode, newEndVnode)
            newEndVnode = newCh[--newEndIdx];
            oldEndVnode = oldCh[--oldEndIdx];
        }
        else if (sameVnode(newEndVnode, oldStartVnode)) {
            console.debug(3);
            console.debug('newEndVnode:', newEndVnode);
            console.debug('oldStartVnode:', oldStartVnode);
            // （3）新后与旧前
            patchVnode(oldStartVnode, newEndVnode)
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            newEndVnode = newCh[--newEndIdx];
            oldStartVnode = oldCh[++oldStartIdx];
        }
        else if (sameVnode(newStartVnode, oldEndVnode)) {
            console.debug(4);
            console.debug('newStartVnode:', newStartVnode);
            console.debug('oldEndVnode:', oldEndVnode);
            // （4）新前与旧后
            patchVnode(oldEndVnode, newStartVnode)
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx];
            oldEndVnode = oldEndVnode = oldCh[--oldEndIdx];
        } else {
            console.debug('遍历查找');
            // 遍历查找
            if (!keyMap) {
                keyMap = {}
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    if (oldCh[i].key) {
                        keyMap[oldCh[i].key] = i
                    }
                }
            }
            console.debug('keyMap:', keyMap);
            const idxOld = keyMap[newStartVnode.key];
            const moveNode = oldCh[idxOld];
            if (idxOld !== undefined) {
                // 移动节点
                patchVnode(moveNode, newStartVnode);
                oldCh[idxOld] = undefined;
                parentElm.insertBefore(moveNode.elm, oldStartVnode.elm);
            } else {
                // 新创建节点
                parentElm.insertBefore(createEle(newStartVnode), oldStartVnode.elm);
            }
            newStartVnode = newCh[++newStartIdx];
        }
    }
    // 处理剩余需要新增获取删除的节点
    if (newStartIdx <= newEndIdx) {
        // 新增节点
        console.debug('新增节点')
        // const before = newCh[newStartIdx + 1] === null ? newCh[newStartIdx + 1] : null
        console.debug('newCh[newEndIdx + 1]:', newCh[newEndIdx + 1]);
        const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
        console.debug('newCh:', newCh);
        console.debug('before:', before);
        for(let i = newStartIdx; i <= newEndIdx; i++){
            parentElm.insertBefore(createEle(newCh[i]), before);
        }
    }
    if (oldStartIdx <= oldEndIdx) {
        // 删除节点
        console.debug('删除节点')
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            if (oldCh[i].elm) {
                parentElm.removeChild(oldCh[i].elm)
            }
        }
    }
}
