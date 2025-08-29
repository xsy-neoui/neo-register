/**
 * @file 自定义组件对接编辑器的描述文件
 */
// @ts-ignore
import { registerNeoEditorPlugin } from '../../dist/index';

// 自定义组件名称，用于标识组件的唯一性
const WidgetCmpType = 'react-info-card';
export class InfoCardPlugin {
  cmpType = WidgetCmpType;
  name = 'react 信息卡片';
  description = '信息展示卡片';
  tags = ['自定义'];
  icon = 'fa fa-file-code-o';
  
  // 初次插入页面的默认数据
  scaffold = {
    cmpType: WidgetCmpType,
    props: {
      title: '营销服全场景智能CRM，帮助企业搭建数字化客户经营平台，实现业绩高质量增长。',
      label: '信息卡片',
      backgroundImage: 'https://neo-widgets.bj.bcebos.com/NeoCRM.jpg',
      img_count: 3,
      comment_count: 2021
    },
  };
  // 设计器端预览时展示的默认数据
  previewSchema = {
    cmpType: WidgetCmpType,
    props: {
      label: 'react 信息卡片'
    }
  };

  panelTitle = '配置';

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
      type: 'input-number',
      name: 'img_count',
      label: '图片数量',
      value: 3,
    },
    {
      type: 'input-number',
      name: 'comment_count',
      label: '评论数',
      value: 2021,
    },
  ];
}

registerNeoEditorPlugin(InfoCardPlugin);

export default InfoCardPlugin;

