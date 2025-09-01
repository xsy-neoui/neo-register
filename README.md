# neo-widgets
> neo 组件注册器（支持 react 和 vue2.0 技术栈）；
- 提供注册 neo 自定义组件和 neo-editor 自定义插件的方法；
- 目前支持的技术栈：vue2.0、react。

### 提供的方法
- registerRendererByType: 根据type类型注册 neo自定义组件
- registerNeoEditorPlugin: 注册 neo-editor 插件

## 快速使用

```
npm install --save neo-widgets
```

## 注册 neo 自定义组件
```tsx
import { registerRendererByType } from 'neo-widgets';

class MyReactSelect extends React.PureComponent {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // 调用neo onToggle 方法，变更选择器表单项值
    const {onToggle, options} = this.props;
    const option = options.find(o => o.value === event.target.value);
    if (onToggle) {
      onToggle(option);
    }
  }

  render() {
    // 获取表单项 value 和 options 属性
    const {label, options, title} = this.props;

    return (
      <div className="react-select">
        <span>
          {label}：
        </span>
        <select onChange={this.handleChange} title={title}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

// 注册 neo 自定义组件
registerRendererByType(MyReactSelect, 'react-select');

export default MyReactSelect;
```

## 注册 neo-editor 自定义插件
```tsx
import { registerNeoEditorPlugin } from 'neo-widgets';

class ReactSelectPlugin {
  cmpType = 'react-select'; // 对应的neo渲染器
  name = 'select 自定义组件';
  description = 'react-select 自定义组件';
  tags = ['自定义组件']; // 自定义组件分类
  icon = 'fa fa-file-code-o';
  order = 100; // 组件面板中的展示优先级，越小越靠前展示
  scaffold = { // 插入到页面时需要
    type: 'react-select',
    label: 'select 自定义组件',
    name: 'customSelect',
    options: [
      {
        label: 'A',
        value: 'a'
      },
      {
        label: 'B',
        value: 'b'
      },
      {
        label: 'C',
        value: 'c'
      }
    ]
  };
  previewSchema = { // 组件面板预览时需要
    type: 'react-select',
    label: 'select 自定义组件',
    options: [
      {
        label: 'A',
        value: 'a'
      },
      {
        label: 'B',
        value: 'b'
      },
      {
        label: 'C',
        value: 'c'
      }
    ]
  };
  panelTitle = '下拉框'; // 右侧属性面板Title
  panelBody = [ // 右侧属性面板配置项
    {
      type: 'input-text',
      name: 'label',
      label: 'label',
      value: 'react-select'
    },
    {
      type: 'textarea',
      name: 'title',
      label: 'hover title',
      value: '点击下拉选择数值'
    },
    {
      type: 'tpl',
      tpl: '备注：可根据变量 \\${neoUser} 获取用户数据。'
    }
  ];
}
// 注册一个 neo-editor 自定义插件（仅页面设计器需要，会在自定义组件面板中展示）
registerNeoEditorPlugin(ReactSelectPlugin);

export default ReactSelectPlugin;
```
