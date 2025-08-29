export declare const consoleTag = "[neo-widget]";
export * from './object';
/**
 * 获取技术栈标识
 * 目的：兼容用户非标准写法
 */
export declare function getFramework(_framework?: string): string;
/**
 * 识别自定义组件技术栈类型
 * react 编译后是 一个函数组件
 * vue 编译后是 一个类对象: { render: ƒ, __file: 'xx/xx.vue', __compiled: true, ... }
 */
export declare function getFrameworkByCmp(component: any): string;
export declare function isReactComponent(component: any): boolean;
export declare function isVueComponent(component: any): boolean;
export declare enum Usage {
    renderer = "renderer",
    formitem = "formitem"
}
/**
 * 获取neo渲染器类型标识
 * 目的：兼容用户非标准写法
 */
export declare function getUsage(_usage?: string): string;
/**
 * 当前 neo-widget 支持的技术栈
 * 备注：vue2和vue3不能同时存在
 */
export declare enum Framework {
    react = "react",
    vue2 = "vue2",
    vue3 = "vue3",
    jquery = "jquery"
}
export declare function isEditorPlugin(EditorPluginClass: any): boolean;
export declare function isString(str: any): boolean;
export declare function isObject(obj: any): boolean;
export declare function isProxy(obj: any): boolean;
