/**
 * @file 自定义组件对接编辑器的描述文件
 */
// @ts-ignore
import { registerNeoEditorPlugin } from '../../dist/index';
export class InfoCardPlugin {
  // 自定义组件名称，用于标识组件的唯一性
  cmpType = 'react-info-card';

  // 组件名称，用于设置在编辑器左侧组件面板中展示的名称
  label = 'react 信息卡片';

  // 组件描述，用于设置在编辑器左侧组件面板中展示的描述
  description = '信息展示卡片';

  // 分类标签，用于设置在编辑器左侧组件面板哪个分类中展示（可设置多个分类标签）
  tags = ['自定义组件'];
  
  // 组件图标，用于设置在编辑器左侧组件面板中展示的图标
  iconSrc = 'https://neo-widgets.bj.bcebos.com/custom-widget.svg';
  // iconSrc = 'https://neo-widgets.bj.bcebos.com/favicon.png';

  // 初次插入页面的默认属性数据
  defaultComProps = {
    title: '营销服全场景智能CRM，帮助企业搭建数字化客户经营平台，实现业绩高质量增长。',
    label: 'react 信息卡片',
    backgroundImage: 'https://neo-widgets.bj.bcebos.com/NeoCRM.jpg',
    img_count: 3,
    comment_count: 2025,
  };

  // 设计器端预览时展示的默认数据
  previewComProps = {
    label: 'react 信息卡片'
  };

  /**
   * 组件面板配置，用于生成编辑器右侧属性配置面板内容
   */
  panelControls = [
    {
      type: 'textarea',
      name: 'title',
      label: '卡片title',
      value:
        '营销服全场景智能CRM，帮助企业搭建数字化客户经营平台，实现业绩高质量增长。',
    },
    {
      type: 'text',
      name: 'backgroundImage',
      label: '展示图片',
      value: 'https://neo-widgets.bj.bcebos.com/NeoCRM.jpg',
    },
    {
      type: 'number',
      name: 'img_count',
      label: '图片数量',
      value: 3,
    },
    {
      type: 'number',
      name: 'comment_count',
      label: '评论数',
      value: 2025,
    },
  ];

  // 支持 函数式写法：panelControlsCreator，com 为页面设计器中的组件实例。优先级比 panelControls 高
  /*
  panelControlsCreator = (com: any) => {
    return [];
  };
  */
}

registerNeoEditorPlugin(InfoCardPlugin);

export default InfoCardPlugin;

