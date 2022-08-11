import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h
  } from "snabbdom";
import patch from "./patch";

  // const patch = init([
  //   // 通过传入模块初始化 patch 函数
  //   classModule, // 开启 classes 功能
  //   propsModule, // 支持传入 props
  //   styleModule, // 支持内联样式同时支持动画
  //   eventListenersModule, // 添加事件监听
  // ]);
  
  const container = document.getElementById("container");

  const btn = document.getElementById("btn");

  const vnode = h('section', {} , [
    h('li', { key: 'E' }, 'E'),
    h('li', { key: 'D' }, 'D'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'A' }, 'A'),
  ])

  patch(container, vnode);

  const newVnode = h('section', {} , [
    h('li', { key: 'H' }, 'H'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'E' }, 'E'),
    h('li', { key: 'D' }, 'D'),
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'F' }, 'F'),
    h('li', { key: 'K' }, 'K'),
    h('li', { key: 'B' }, 'B'),
  ])

  btn.onclick = function () {
    patch(vnode, newVnode);
  }
  
