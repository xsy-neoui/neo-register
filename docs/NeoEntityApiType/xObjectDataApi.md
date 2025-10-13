# xObjectDataApi 实体数据源属性配置组件
这是一个用于获取实体业务数据列表的属性配置项，支持：

1. **输入框展示**：以输入框形式展示当前配置的实体和选择的字段信息
2. **设置按钮**：右侧设置图标，点击打开配置弹窗
3. **实体类型选择**：弹窗中支持选择标准实体或自定义实体
4. **实体选择**：弹窗中支持下拉选择实体
5. **字段选择**：使用 antd Transfer 组件选择字段，默认选中所有实体字段
6. **分页配置**：配置页码（默认展示第几页）和每页条数（每页展示多少条数据）
7. **数据存储**：选择的实体ID存储到 `xObjectApiKey`，选中的字段列表存储到 `fields`，字段信息列表存储到 `fieldDescList`，页码存储到 `page`，每页条数存储到 `pageSize`

## 使用方法

在 属性配置面板（propsSchema）中使用：

```json
{
  "type": "xObjectDataApi",
  "name": "dataSource",
  "label": "数据源配置"
}
```

## 组件属性

- `name`: 字段名称
- `label`: 标签文本
- `disabled`: 是否禁用
- `value`: 当前值，格式为 `{ xObjectApiKey: string, fields: string[], fieldDescList: object[], page: number, pageSize: number }`
  - `xObjectApiKey`: 选择的实体 API Key
  - `fields`: 选中的字段列表
  - `fieldDescList`: 字段信息列表
  - `page`: 页码，默认为 1（默认展示第几页）
  - `pageSize`: 每页条数，默认为 20（每页展示多少条数据）
- `onChange`: 值变化回调
