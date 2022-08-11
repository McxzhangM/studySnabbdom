import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
  } from "snabbdom";

  import h from './h'

  const patch = init([
    // 通过传入模块初始化 patch 函数
    classModule, // 开启 classes 功能
    propsModule, // 支持传入 props
    styleModule, // 支持内联样式同时支持动画
    eventListenersModule, // 添加事件监听
  ]);
  
  const container = document.getElementById("container");

  function someFn() {
    console.debug(11);
  }
  
  const vnode = h("div", { on: { click: someFn } }, [
    h("span", { style: { fontWeight: "bold" } }, "This is bold"),
    h("a", { props: { href: "/foo" } }, "I'll take you places!"),
  ]);
  const vnode3 = h("div", { on: { click: someFn } }, h('span', {}, 'cjang'))
  console.debug('vnode:', vnode); 
  console.debug('vnode:', vnode3);
  // 传入一个空的元素节点 - 将产生副作用（修改该节点）
  // patch(container, vnode);
  

