export const consoleTag = '[neo-widget]'; // 输出标记
export * from './object';

/**
 * 获取技术栈标识
 * 目的：兼容用户非标准写法
 */
export function getFramework(_framework?: string): string {
  let defaultFramework = Framework.react;
  if (!_framework) {
    return defaultFramework;
  }
  let curFramework = _framework.toLowerCase().trim();
  switch (curFramework) {
    case 'jquery':
    case 'jq':
      curFramework = Framework.jquery;
      break;
    case 'vue2':
    case 'vue 2':
    case 'vue2.0':
    case 'vue 2.0':
      curFramework = Framework.vue2;
      break;
    case 'vue':
    case 'vue3':
    case 'vue 3':
    case 'vue3.0':
    case 'vue 3.0':
      curFramework = Framework.vue3;
      console.error('neo-widget 暂不支持 vue3.0 技术栈。');
      break;
    default:
      curFramework = Framework.react;
  }
  return curFramework;
}
/**
 * 识别自定义组件技术栈类型
 * react 编译后是 一个函数组件
 * vue 编译后是 一个类对象: { render: ƒ, __file: 'xx/xx.vue', __compiled: true, ... }
 */
export function getFrameworkByCmp(component: any): string {
  if (isVueComponent(component)) {
    return 'vue2';
  }
  return 'react';
}

export function isReactComponent(component: any): boolean {
  return typeof component === 'function';
}
export function isVueComponent(component: any): boolean {
  console.log(
    'component:',
    component,
    typeof component === 'object' &&
      component.__file &&
      component.__file.endsWith('.vue'),
  );
  return (
    typeof component === 'object' &&
    component.__file &&
    component.__file.endsWith('.vue')
  );
}

export enum Usage {
  renderer = 'renderer',
  formitem = 'formitem',
}
/**
 * 获取neo渲染器类型标识
 * 目的：兼容用户非标准写法
 */
export function getUsage(_usage?: string): string {
  let defaultUsage = Usage.renderer;
  if (!_usage) {
    return defaultUsage;
  }
  let curUsage = _usage.toLowerCase().trim();
  switch (curUsage) {
    case 'renderer':
    case 'renderers':
      curUsage = Usage.renderer;
      break;
    case 'formitem':
    case 'form-item':
    case 'form item':
      curUsage = Usage.formitem;
      break;
    default:
      curUsage = Usage.renderer;
  }
  return curUsage;
}

/**
 * 当前 neo-widget 支持的技术栈
 * 备注：vue2和vue3不能同时存在
 */
export enum Framework {
  react = 'react',
  vue2 = 'vue2',
  vue3 = 'vue3',
  jquery = 'jquery',
}

// 判断是否缺失editor插件关键字段
export function isEditorPlugin(EditorPluginClass: any) {
  let _isEditorPlugin = false;
  if (!EditorPluginClass) {
    return false;
  }
  const _editorPluginObj = new EditorPluginClass();

  if (!_editorPluginObj.cmpType) {
    console.error(
      `${consoleTag} / registerNeoEditorPlugin: 自定义组件注册失败，cmpType 不能为空。`,
    );
  } else if (!_editorPluginObj.name) {
    console.error(
      `${consoleTag} / registerNeoEditorPlugin: 自定义组件注册失败，名称（name）不能为空。`,
    );
  } else if (!_editorPluginObj.description) {
    console.error(
      `${consoleTag} / registerNeoEditorPlugin: 自定义组件注册失败，描述（description）不能为空。`,
    );
  } else {
    // 1.设置一个默认icon
    if (!_editorPluginObj.icon) {
      Object.assign(EditorPluginClass.prototype, {
        icon: 'fa fa-file-code-o',
      });
    }
    _isEditorPlugin = true;
  }
  return _isEditorPlugin;
}

// 判断是否是字符串类型
export function isString(str: any): boolean {
  return Object.prototype.toString.call(str).slice(8, -1) === 'String';
}

export function isObject(obj: any): boolean {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
}

export function isProxy(obj: any): boolean {
  if (!obj) {
    return false;
  }
  const hasMSTProperties = !!(
    obj.$treenode ||
    obj.$mstObservable ||
    obj.$modelType ||
    obj.$modelId
  );
  return (
    hasMSTProperties || Object.prototype.toString.call(obj) === '[object Proxy]'
  );
}
