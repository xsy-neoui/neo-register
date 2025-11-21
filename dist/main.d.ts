/**
 * neo-register: 组件注册器
 *
 * 【提供的工具方法清单】
 * registerNeoCmp: 根据 cmpType 注册 neo 自定义组件
 * registerNeoEditorModel: 注册 neo-editor 自定义组件模型
 */
export { registerNeoEditorModel } from './function/registerNeoEditorModel';
export { registerNeoCmp } from './function/registerNeoCmp';
export { createVue2Component, autoConvertVueComponent } from './frameworkFactory/vueFactory';
