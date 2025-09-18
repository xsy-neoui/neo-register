import { isEditorModel, consoleTag } from '../utils';
/**
 * 自定义组件模型 配置项
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
  label: string;

  /**
   * 自定义组件描述
   * hover 自定义组件时展示
   */
  description?: string;

  /**
   * 自定义组件分类
   * 指定当前自定义组件模型在「页面设计器」自定义组件面板中哪个分类下展示
   */
  tags: string | Array<string>;

  /**
   * 自定义组件icon
   */
  iconSrc?: string;

  /**
   * 自定义组件排序
   * 指定当前自定义组件模型在「页面设计器」自定义组件面板中的展示次序
   */
  order?: number;

  /**
   * 自定义组件显隐
   * 备注：设置为false时则不展示
   */
  exposedToDesigner?: boolean;

  /**
   * 初次插入页面的默认属性数据
   */
  defaultComProps?: boolean;

  /**
   * 组件面板配置，用于生成编辑器右侧属性配置面板内容
   */
  propsSchema?: boolean;
}

declare const window: Window & {
  postMessage: any;
  NEOEditorCustomModels: any;
};

/**
 * registerNeoEditorModel: 注册 neo-editor 自定义组件模型
 */
export function registerNeoEditorModel(curEditorModel: any, cmpType?: string) {
  if (curEditorModel && isEditorModel(curEditorModel)) {
    const curCmpType: any = cmpType || new curEditorModel().cmpType;

    if (!curCmpType) {
      console.error(
        `${consoleTag} / registerNeoEditorModel: 自定义组件注册失败，cmpType 不能为空。`,
      );
    }

    const curEditorModelObj = new curEditorModel();
    Object.assign(curEditorModel.prototype, {
      custom: true, // 自定义组件标识
      exposedToDesigner: curEditorModelObj.exposedToDesigner ?? true, // 默认在设计器中显示
      namespace: curEditorModelObj.namespace ?? 'neo-cmp-cli',
      cmpType: curCmpType,
    });

    // registerEditorModel(curEditorModel); // 不直接注册为 neo-editor 插件

    // 通过 postMessage 告知 neo-editor 注册一个新的插件
    if (window && window.postMessage) {
      const newComponentType = AddCustomEditorModel(curCmpType, curEditorModel);
      if (newComponentType) {
        console.info(`${consoleTag}触发注册自定义组件模型(${curCmpType})事件`);
        window.postMessage(
          {
            type: 'neo-model-register-event',
            eventMsg: `${consoleTag}注册一个 neo-editor 自定义组件模型`,
            cmpType: curCmpType,
          },
          '*',
        );
      }
    }
  }
}

function AddCustomEditorModel(cmpType: string, model: any) {
  if (window && !window.NEOEditorCustomModels) {
    window.NEOEditorCustomModels = {};
  }
  if (!window.NEOEditorCustomModels[cmpType]) {
    window.NEOEditorCustomModels[cmpType] = model;
    return cmpType;
  } else {
    console.error(
      `${consoleTag}注册自定义组件模型失败，已存在重名插件(${cmpType})。`,
    );
  }
  return null;
}
