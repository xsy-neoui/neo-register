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
    iconUrl?: string;
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
interface RegisterNeoEditorModelOptions {
    targetPage?: string;
    tags?: string[];
    iconUrl?: string;
    exposedToDesigner?: boolean;
    namespace?: string;
    enableDuplicate?: boolean;
}
/**
 * registerNeoEditorModel: 注册 neo-editor 自定义组件模型
 *
 * targetPage 取值说明
 * all:	1	全页面
 * indexPage:	2	首页
 * entityListPage:	3	实体列表页
 * entityFormPage:	4	实体表单页
 * entityDetailPage:	5	实体详情页
 * customPage:	6	自定义页面
 * bizPage:	7	业务页面
 */
export declare function registerNeoEditorModel(curEditorModel: any, cmpType?: string, options?: RegisterNeoEditorModelOptions): void;
export {};
