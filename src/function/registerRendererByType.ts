import { createVue2Component } from '../frameworkFactory/vueFactory';
// import {createVue3Component} from '../frameworkFactory/vue3Factory';
import {
  getFramework,
  getFrameworkByCmp,
  Usage,
  getUsage,
  // Framework,
  isString,
  consoleTag,
} from '../utils';

/**
 * neo-editor 自定义插件配置项
 */
export interface NeoRendererOption {
  /**
   * 渲染器名称
   * 备注：渲染过程中用于查找对应的渲染器
   */
  cmpType: string;

  /**
   * 要注册的neo渲染器类型
   * neo普通渲染器、neo表单渲染器、neo表单控件渲染器
   * 备注：默认为neo普通渲染器
   */
  usage?: string;

  /**
   * 自定义组件权重
   * 备注：值越低越优先命中
   */
  weight?: number;

  /**
   * 自定义组件技术栈类型
   * 备注：默认为react
   */
  framework?: string;
}

declare const window: Window & {
  postMessage: any;
  NeoCustomRenderers: any;
};

/**
 * registerRendererByType: 根据type类型注册 neo 自定义组件
 *【方法参数说明】
 * newRenderer: 自定义组件,
 * rendererOption: {
 *   cmpType: 自定义组件的type类型，比如：input、text-area、select-user等
 *   usage?: neo普通渲染器、neo表单渲染器，默认值为 neo普通渲染器
 *   weight?: 自定义组件权重
 *   framework?: 技术栈类型，默认为 react 技术栈，可选技术栈：vue2、react
 * }
 * 备注：暂不支持 vue3.0 技术栈
 */
export function registerRendererByType(
  newRenderer: any,
  rendererOption: string | NeoRendererOption,
) {
  if (!newRenderer) {
    return;
  }
  // 1.默认注册配置参数
  const curRendererOption: NeoRendererOption = {
    cmpType: '',
    usage: Usage.renderer, // 默认为 neo普通渲染器
    weight: 0,
    // framework: Framework.react, // 默认为 react 技术栈
  };
  // 2.获取相关配置参数
  if (rendererOption && isString(rendererOption)) {
    // rendererOption为字符串则将其设置为type
    Object.assign(curRendererOption, {
      cmpType: rendererOption,
    });
  } else {
    Object.assign(curRendererOption, rendererOption);
  }

  if (curRendererOption && !curRendererOption.cmpType) {
    console.error(
      `${consoleTag} / registerRendererByType: 自定义组件注册失败，cmpType 不能为空。`,
    );
  } else {
    // 根据组件结构自动识别组件技术栈
    curRendererOption.framework = curRendererOption.framework
      ? getFramework(curRendererOption.framework)
      : getFrameworkByCmp(newRenderer);
    // 修正usage数值
    curRendererOption.usage = getUsage(curRendererOption.usage);
    // 当前支持注册的渲染器类型
    const registerMap: any = {
      renderer: () => {}, // Renderer,
      formitem: () => {}, // FormItem
    };

    // 当前支持的技术栈类型
    const resolverMap: any = {
      react: (i: any) => i,
      vue2: createVue2Component,
      vue3: createVue2Component, // createVue3Component,
    };
    // 支持多技术栈
    const curRendererComponent =
      resolverMap[curRendererOption.framework](newRenderer);
    // 注册neo渲染器
    if (!registerMap[curRendererOption.usage]) {
      console.error(
        `${consoleTag} / registerRendererByType: 自定义组件注册失败，暂不支持 ${curRendererOption.usage} 组件类型。`,
      );
    } else {
      // 通过 postMessage 告知 neo 注册一个新的渲染器
      if (window && window.postMessage) {
        const newComponentType = AddNeoCustomRenderer(
          curRendererOption.cmpType,
          {
            cmpType: curRendererOption.cmpType,
            weight: curRendererOption.weight,
            usage: curRendererOption.usage,
            framework: curRendererOption.framework,
            component: curRendererComponent,
            config: curRendererOption,
          },
        );
        if (newComponentType) {
          console.info(
            `${consoleTag}触发注册自定义组件(${newComponentType})事件`,
          );
          window.postMessage(
            {
              type: 'neo-renderer-register-event',
              eventMsg: `${consoleTag}注册一个自定义组件`,
              neoRenderer: {
                cmpType: newComponentType,
                weight: curRendererOption.weight,
                usage: curRendererOption.usage,
                config: curRendererOption,
              },
            },
            '*',
          );
        }
      }
    }
  }
}

function AddNeoCustomRenderer(componentType: string, rendererData: any) {
  if (window && !window.NeoCustomRenderers) {
    window.NeoCustomRenderers = {};
  }
  if (!window.NeoCustomRenderers[componentType]) {
    window.NeoCustomRenderers[componentType] = rendererData;
    return componentType;
  } else {
    console.error(
      `${consoleTag} / registerRendererByType: 自定义组件注册失败，已存在重名渲染器(${componentType})。`,
    );
  }
  return null;
}
