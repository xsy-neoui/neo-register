# neo-register
> neo 组件注册器（支持 react 和 vue2.0 技术栈）；
- 提供注册 neo自定义组件 和 neo-editor自定义组件模型 的方法；
- 目前支持的技术栈：vue2.0、react。

### 提供的方法
- registerNeoCmp: 根据 cmpType 注册 neo自定义组件
- registerNeoEditorModel: 注册 neo-editor 自定义组件模型

## 快速使用

```
npm install --save neo-register
```

## 注册 neo 自定义组件
```tsx
import { registerNeoCmp } from 'neo-register';

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
registerNeoCmp(MyReactSelect, 'react-select');

export default MyReactSelect;
```

## 注册 neo-editor 自定义组件模型
```tsx
import { registerNeoEditorModel } from 'neo-register';

class ReactSelectPlugin {
  cmpType = 'react-select'; // 自定义组件名称，用于标识组件的唯一性
  label = 'select 自定义组件'; // 组件名称，用于设置在编辑器左侧组件面板中展示的名称
  description = 'react-select 自定义组件'; // 组件描述，用于设置在编辑器左侧组件面板中展示的描述
  tags = ['自定义组件']; // 自定义组件分类
  iconSrc = 'https://neo-widgets.bj.bcebos.com/custom-widget.svg'; // 组件图标，用于设置在编辑器左侧组件面板中展示的图标
  defaultComProps = { // 初次插入页面的默认属性数据
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
  propsSchema = [ // 组件面板配置，用于生成编辑器右侧属性配置面板内容
    {
      type: 'text',
      name: 'label',
      label: 'label',
      value: 'react-select'
    },
    {
      type: 'textarea',
      name: 'title',
      label: 'hover title',
      value: '点击下拉选择数值'
    }
  ];
}
// 注册一个 neo-editor 自定义组件模型（仅页面设计器需要，会在组件面板中展示）
registerNeoEditorModel(ReactSelectPlugin);

export default ReactSelectPlugin;
```

## 自定义组件配置项设置说明
- propsSchema 中可用的配置项类型 请见 [当前可用表单项](./docs/FormItemType.md)。