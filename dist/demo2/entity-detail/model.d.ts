/**
 * @file 实体数据详情组件对接编辑器的描述文件
 * @description 定义组件在 Neo 平台编辑器中的配置信息
 */
export declare class EntityDetailModel {
    /**
     * 组件类型标识
     * 用于标识组件的唯一性，在构建时根据当前组件目录名称自动生成
     * 注意：此字段在构建时会被自动替换，不需要手动设置
     */
    cmpType: string;
    /** 组件名称，用于设置在编辑器左侧组件面板中展示的名称 */
    label: string;
    /** 组件描述，用于设置在编辑器左侧组件面板中展示的描述 */
    description: string;
    /** 分类标签，用于设置在编辑器左侧组件面板哪个分类中展示（可设置多个分类标签） */
    tags: string[];
    /** 组件图标，用于设置在编辑器左侧组件面板中展示的图标 */
    iconSrc: string;
    /** 初次插入页面的默认属性数据 */
    defaultComProps: {
        title: string;
        xObjectDetailApi: {
            xObjectApiKey: string;
            objectId: string;
        };
        columnCount: number;
        showTitle: boolean;
    };
    /** 设计器端预览时展示的默认数据 */
    previewComProps: {
        title: string;
        columnCount: number;
        showTitle: boolean;
    };
    /**
     * 组件属性配置模式
     * 定义组件在编辑器中可配置的属性
     */
    propsSchema: ({
        type: string;
        name: string;
        label: string;
        value: string;
        placeholder: string;
        description: string;
        options?: undefined;
    } | {
        type: string;
        name: string;
        label: string;
        value: boolean;
        description: string;
        placeholder?: undefined;
        options?: undefined;
    } | {
        type: string;
        name: string;
        label: string;
        value?: undefined;
        placeholder?: undefined;
        description?: undefined;
        options?: undefined;
    } | {
        type: string;
        name: string;
        label: string;
        value: number;
        options: {
            label: string;
            value: number;
        }[];
        description: string;
        placeholder?: undefined;
    })[];
}
export default EntityDetailModel;
