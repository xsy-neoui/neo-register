# xObjectDetailApi 实体业务详情数据配置组件
这是一个用于配置获取实体业务详情数据的属性配置项，支持：

1. **输入框展示**：以输入框形式展示当前配置的实体、业务数据ID和字段信息
2. **设置按钮**：右侧设置图标，点击打开配置弹窗
3. **实体选择**：弹窗中支持下拉选择实体（标准实体/自定义实体）
4. **业务数据ID选择**：根据选择的实体，使用 xObject.query 获取业务数据列表，支持选择具体的业务数据ID
5. **字段选择**：使用 antd Transfer 组件选择字段，默认全部选中
6. **数据存储**：选择的实体ID存储到 `xObjectApiKey`，业务数据ID存储到 `objectId`，字段列表存储到 `fieldDescList`

## 使用方法

在 属性配置面板（propsSchema）中使用：

```json
{
  "type": "xObjectDetailApi",
  "name": "dataSource",
  "label": "业务详情数据源配置"
}
```

## 组件属性

- `name`: 字段名称
- `label`: 标签文本
- `disabled`: 是否禁用
- `value`: 当前值，格式为 `{ xObjectApiKey: string, objectId: string }`
- `onChange`: 值变化回调

## 功能特性

- **实体类型切换**：支持标准实体和自定义实体的切换
- **智能联动**：选择实体后自动加载对应的业务数据列表和字段列表
- **搜索过滤**：所有选择器都支持搜索过滤功能
