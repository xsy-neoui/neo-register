/**
 * neo-editor 自定义组件模型配置项
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
/**
 * registerNeoCmp: 根据type类型注册 neo 自定义组件
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
export declare function registerNeoCmp(newRenderer: any, rendererOption: string | NeoRendererOption): void;
