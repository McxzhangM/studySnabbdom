import vnode from './vnode';

export default function(sel, b, c) {
    if (!(arguments.length === 3)) {
        throw new Error('参数异常')
    }
    if (typeof c === 'string' || typeof c === 'number') {
        return vnode(sel, b, undefined, c, undefined);
    } else if(Array.isArray(c)) {
        const childrenList = []
        c.forEach(data=>{
            if(typeof data === 'object' && data.hasOwnProperty('sel')) {
                childrenList.push(data)
            }
        })
        return vnode(sel, b, childrenList, undefined, undefined);
    } else if(typeof c === 'object' && c.hasOwnProperty('sel')){
        return vnode(sel, b, [c], undefined, undefined);
    }else {
        throw Error('参数类型异常')
    }
}
