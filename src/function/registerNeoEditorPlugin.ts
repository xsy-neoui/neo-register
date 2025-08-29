import { isEditorPlugin, consoleTag } from '../utils';
/**
 * 自定义editor插件配置项
 */
export interface PluginOption {
  /**
   * 关联的渲染器
   * 备注：可以关联当前的自定义组件，也可以关联平台预置组件和其他自定义组件
   */
  cmpType: string;

  /**
   * 自定义组件名称
   * 在「页面设计器」物料面板中显示
   */
  name?: string;

  /**
   * 自定义组件描述
   * hover 自定义组件时展示
   */
  description?: string;

  /**
   * 自定义组件分类
   * 指定当前自定义插件在「页面设计器」自定义组件面板中哪个分类下展示
   */
  tags?: string | Array<string>;

  /**
   * 自定义组件排序
   * 指定当前自定义插件在「页面设计器」自定义组件面板中的展示次序
   */
  order?: number;

  /**
   * 自定义组件icon
   */
  icon?: string;

  /**
   * 属性配置面板Title
   */
  panelTitle?: string;

  /**
   * 自定义组件显隐
   * 备注：设置为true时则不展示
   */
  disabledRendererPlugin?: boolean;
}

declare const window: Window & {
  postMessage: any;
  NEOEditorCustomPlugins: any;
};

/**
 * registerNeoEditorPlugin: 注册 neo-editor 自定义插件
 */
export function registerNeoEditorPlugin(
  curEditorPlugin: any,
  cmpType?: string,
) {
  if (curEditorPlugin && isEditorPlugin(curEditorPlugin)) {
    const curEditorPluginName: any = cmpType || new curEditorPlugin().cmpType;
    Object.assign(curEditorPlugin.prototype, {
      isCustomWidget: true, // 自定义组件标识
      cmpType: curEditorPluginName,
    });
    // registerEditorPlugin(curEditorPlugin); // 不直接注册为 neo-editor 插件
    // 通过 postMessage 告知 neo-editor 注册一个新的插件
    if (window && window.postMessage) {
      const newComponentType = AddCustomEditorPlugin(
        curEditorPluginName,
        curEditorPlugin,
      );
      if (newComponentType) {
        console.info(
          `${consoleTag}触发注册自定义插件(${curEditorPluginName})事件`,
        );
        window.postMessage(
          {
            type: 'neo-plugin-register-event',
            eventMsg: `${consoleTag}注册一个 neo-editor 自定义插件`,
            editorPluginName: curEditorPluginName,
          },
          '*',
        );
      }
    }
  }
}

function AddCustomEditorPlugin(cmpType: string, plugin: any) {
  if (window && !window.NEOEditorCustomPlugins) {
    window.NEOEditorCustomPlugins = {};
  }
  if (!window.NEOEditorCustomPlugins[cmpType]) {
    window.NEOEditorCustomPlugins[cmpType] = plugin;
    return cmpType;
  } else {
    console.error(
      `${consoleTag}注册自定义插件失败，已存在重名插件(${cmpType})。`,
    );
  }
  return null;
}
