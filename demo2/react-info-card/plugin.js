/**
 * @file 自定义组件对接编辑器的描述文件
 */
import { registerNeoEditorPlugin } from '../../src/main';

export class InfoCardPlugin {
  // 关联渲染器名字
  cmpType = 'react-info-card';
  name = 'react组件';
  description = '信息卡片';
  tags = ['自定义'];

  icon = 'fa fa-file-code-o';
  order = 99;
  scaffold = {
    type: 'react-info-card',
    label: '信息卡片'
  };
  previewSchema = {
    type: 'react-info-card',
    label: '信息卡片'
  };

  panelTitle = '配置';

  panelBodyCreator = (context) => {
    return [
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
        value:
          'https://neo-widgets.bj.bcebos.com/NeoCRM.jpg',
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
        value: 2025,
      },
    ];
  };
}

registerNeoEditorPlugin(InfoCardPlugin);

export default InfoCardPlugin;
