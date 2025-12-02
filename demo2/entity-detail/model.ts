import { registerNeoEditorModel } from '../../src/main';
/**
 * @file 实体数据详情组件对接编辑器的描述文件
 * @description 定义组件在 Neo 平台编辑器中的配置信息
 */
export class EntityDetailModel {
  /**
   * 组件类型标识
   * 用于标识组件的唯一性，在构建时根据当前组件目录名称自动生成
   * 注意：此字段在构建时会被自动替换，不需要手动设置
   */
  cmpType: string = 'entity-detail';

  /** 组件名称，用于设置在编辑器左侧组件面板中展示的名称 */
  label: string = '实体数据详情';

  /** 组件描述，用于设置在编辑器左侧组件面板中展示的描述 */
  description: string = '展示实体数据详情信息，支持多列布局和字段类型识别';

  /** 分类标签，用于设置在编辑器左侧组件面板哪个分类中展示（可设置多个分类标签） */
  // tags: string[] = ['自定义组件'];

  /** 组件图标，用于设置在编辑器左侧组件面板中展示的图标 */
  iconUrl: string = 'https://custom-widgets.bj.bcebos.com/detail.svg';

  /** 初次插入页面的默认属性数据 */
  defaultComProps = {
    title: '实体数据详情',
    xObjectDetailApi: {
      xObjectApiKey: 'account',
      objectId: '',
    },
    columnCount: 3,
    showTitle: true,
  };

  /**
   * 组件属性配置模式
   * 定义组件在编辑器中可配置的属性
   */
  propsSchema = [
    {
      type: 'text',
      name: 'title',
      label: '标题',
      value: '实体数据详情',
      placeholder: '请输入标题',
      description: '组件顶部显示的标题',
    },
    {
      type: 'switch',
      name: 'showTitle',
      label: '显示标题栏',
      value: true,
      description: '是否显示组件顶部的标题和刷新按钮',
    },
    {
      type: 'xObjectDetailApi', // 用于选取对象业务详情数据的配置项
      name: 'xObjectDetailApi',
      label: '业务详情数据',
    },
    /*
    {
      type: 'xObjectEntityList', // 用于选取实体的配置项
      name: 'xObjectDetailApi.xObjectApiKey',
      label: '实体对象',
      helpText: '请选择要展示详情的实体对象',
      custom: false,
      value: 'account'
    },
    {
      type: 'text',
      name: 'xObjectDetailApi.objectId',
      label: '数据ID',
      value: '',
      placeholder: '请输入数据ID或使用上下文变量',
      description: '要展示的数据记录ID，支持变量：${recordId}',
    },
    */
    {
      type: 'select',
      name: 'columnCount',
      label: '列数',
      value: 3,
      options: [
        {
          label: '1列',
          value: 1,
        },
        {
          label: '2列',
          value: 2,
        },
        {
          label: '3列',
          value: 3,
        },
        {
          label: '4列',
          value: 4,
        },
      ],
      description: '详情页面的列数布局',
    },
  ];

  /**
   * 支持函数式写法：propsSchemaCreator
   * com 为组件实例，优先级比 propsSchema 高
   * 可以根据组件实例动态生成属性配置
   */
  /*
  propsSchemaCreator = (com: any) => {
    return [];
  };
  */
}

registerNeoEditorModel(EntityDetailModel);

export default EntityDetailModel;
