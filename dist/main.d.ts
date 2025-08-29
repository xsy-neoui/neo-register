/**
 * neo-widget: 组件注册器
 *
 * 【提供的工具方法清单】
 * registerRendererByType: 根据type类型注册neo普通渲染器 或者 neo表单渲染器
 * registerNeoEditorPlugin: 注册 neo-editor 插件
 */
export { registerNeoEditorPlugin } from './function/registerNeoEditorPlugin';
export { registerRendererByType } from './function/registerRendererByType';
export { createVue2Component } from './frameworkFactory/vueFactory';
