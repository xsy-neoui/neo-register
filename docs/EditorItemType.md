# Neo 编辑器提供的属性配置项
这里汇总了当前编辑器端新增的属性配置项，其中存在不少重复的配置项（比如 panelInput，和 amis 的 text 一样，也和 Neo 组件库 / 自定义表单 neoInput 一样），后续需要剔除掉重复的配置项目，优先使用 amis 和 Neo 组件库中已有的配置项。

## 目录

- [基础输入配置项](#基础输入配置项)
- [选择器配置项](#选择器配置项)
- [表达式相关配置项](#表达式相关配置项)
- [表单相关配置项](#表单相关配置项)
- [页面相关配置项](#页面相关配置项)
- [事件配置项](#事件配置项)
- [辅助配置项](#辅助配置项)

---

## 基础输入配置项

### 1. panelInput - 文本输入框

**组件名称**: `panelInput`

**功能描述**: 属性面板通用文本输入控件，支持基础文本输入和表达式输入。

**主要属性**:
- `value`: string - 当前值
- `onChange`: Function - 值变化回调
- `placeholder`: string - 占位文本，默认"请输入"
- `name`: string - 字段名称
- `label`: string - 标签文本
- `helpText`: string - 帮助提示文本（会显示帮助图标）
- `supportExpression`: boolean - 是否支持表达式输入
- `disabled`: boolean - 是否禁用
- `maxLength`: number - 最大长度限制（默认100）

**使用示例**:
```json
{
  "type": "panelInput",
  "name": "title",
  "label": "标题",
  "helpText": "请输入组件标题",
  "supportExpression": true,
  "placeholder": "请输入标题"
}
```

---

### 2. PropertyAliasEditor - 唯一标识编辑器

**组件名称**: `PropertyAliasEditor`

**功能描述**: 用于设置组件的唯一标识（别名），支持通过模态框编辑，设置后不可修改。

**主要属性**:
- `value`: string - 当前别名值
- `onChange`: Function - 值变化回调
- `$designer`: StandardLayoutDesignerModel - 设计器实例
- `$com`: Com - 组件实例
- `$model`: ComModel - 组件模型

**验证规则**:
- 只能包含字母、数字、下划线
- 长度不能超过18位
- 唯一标识在页面内必须唯一
- 一旦设置后不可修改（防止代码引用失效）

**使用示例**:
```json
{
  "type": "PropertyAliasEditor",
  "name": "$alias",
  "label": "唯一标识"
}
```

**注册信息**:
- 注册为 itemType: '999', apiKey: '$alias'

---

## 选择器配置项

### 3. panelSelect - 下拉选择器

**组件名称**: `panelSelect`

**功能描述**: 属性面板通用下拉选择控件，支持单选。

**主要属性**:
- `value`: any - 当前选中值（支持对象或基本类型）
- `onChange`: Function - 值变化回调
- `options`: Array<{label: string, value: any}> - 选项列表
- `name`: string - 字段名称
- `label`: string - 标签文本
- `helpText`: string - 帮助提示文本
- `disabled`: boolean - 是否禁用
- `placeholder`: string - 占位文本，默认"请选择"

**默认选项**:
```javascript
[
  { label: "是", value: true },
  { label: "否", value: false }
]
```

**使用示例**:
```json
{
  "type": "panelSelect",
  "name": "visible",
  "label": "是否可见",
  "options": [
    { "label": "是", "value": true },
    { "label": "否", "value": false }
  ]
}
```

---

### 4. multipleSelect - 多选复选框组

**组件名称**: `multipleSelect`

**功能描述**: 属性面板多选复选框组件，支持多项选择。

**主要属性**:
- `value`: Array - 当前选中值数组
- `onChange`: Function - 值变化回调
- `options`: Array<{label: string, value: any}> - 选项列表
- `name`: string - 标题文本

**使用示例**:
```json
{
  "type": "multipleSelect",
  "name": "边框线",
  "options": [
    { "label": "上", "value": "top" },
    { "label": "下", "value": "bottom" },
    { "label": "左", "value": "left" },
    { "label": "右", "value": "right" }
  ]
}
```

---

### 5. panelCheckboxGroup - 复选框组

**组件名称**: `panelCheckboxGroup`

**功能描述**: 属性面板勾选组件。

**主要属性**:
- `label`: string - 标签文本
- `value`: Array<string> - 当前选中值数组
- `options`: Array<{label: string, value: string, disabled?: boolean} | string> - 选项列表
- `onChange`: Function - 值变化回调

**使用示例**:
```json
{
  "type": "panelCheckboxGroup",
  "label": "选择项",
  "options": [
    { "label": "选项1", "value": "opt1" },
    { "label": "选项2", "value": "opt2", "disabled": true }
  ]
}
```

---

### 6. layoutSelect - 布局选择器

**组件名称**: `layoutSelect`

**功能描述**: 可视化布局选择器，用于选择1行1列、1行2列、1行3列等布局方式。

**主要属性**:
- `value`: number - 当前选中的布局ID（1, 2, 3）
- `onChange`: Function - 值变化回调
- `cLabel`: string - 标签文本

**布局选项**:
- 1: 1行1列
- 2: 1行2列
- 3: 1行3列

**使用示例**:
```json
{
  "type": "layoutSelect",
  "name": "layout",
  "cLabel": "布局选择"
}
```

---

## 表达式相关配置项

### 7. ExpressionInput - 表达式输入器

**组件名称**: `ExpressionInput`（非amis注册组件，作为React组件直接使用）

**功能描述**: 支持变量选择和公式编写的表达式输入组件，包含变量选择器、运算符下拉、函数插入等功能。

**主要属性**:
- `validateType`: string - 表达式验证类型（如 'boolean', 'any' 等）
- `selectType`: 'formulable' | 'assignment' - 选择类型
- `extraTreeData`: Array<any> - 额外的树数据（如事件参数）
- `className`: string - 自定义类名
- `expressionObj`: {enabled: boolean, expression: string} - 表达式对象
- `onChangeValue`: (value: string) => void - 值变化回调
- `isPopover`: boolean - 是否通过Popover弹出（默认true）
- `popoverClickCompType`: 'icon' | 'input' - 点击触发类型
- `popupContainer`: (node: HTMLElement) => HTMLElement - 弹出容器
- `disabled`: boolean - 是否禁用
- `onRef`: any - 获取组件引用

**功能特性**:
- 变量选择器：从变量空间选择变量
- 运算符下拉：快速插入运算符
- 函数插入：插入预定义函数
- 语法检查：实时验证表达式语法
- 光标管理：智能光标定位

**使用场景**:
- 支持表达式的输入框
- 布尔值表达式配置
- 公式计算配置

---

### 8. iDSelectBooleanExpression - 布尔选择器（支持表达式）

**组件名称**: 未注册为amis组件（作为普通React组件使用）

**功能描述**: 支持布尔值选择和表达式输入的复合组件。

**主要属性**:
- `value`: {value: boolean, formula: string} - 值对象
- `onChange`: Function - 值变化回调
- `label`: string - 标签文本
- `helpText`: string - 帮助文本
- `disabled`: boolean - 是否禁用
- `enableFormula`: boolean - 是否启用公式
- `options`: Array<{label: string, value: boolean}> - 选项列表

**功能特性**:
- 普通模式：下拉选择是/否
- 表达式模式：支持输入布尔表达式
- 可切换模式：点击公式图标切换到表达式模式
- 表达式编辑：显示表达式内容，支持编辑和清除

**使用示例**:
```javascript
// 作为React组件使用
<ComponentRenderer 
  value={{ value: true, formula: '' }}
  enableFormula={true}
  options={[
    { label: "是", value: true },
    { label: "否", value: false }
  ]}
/>
```

---

### 9. iDTempNoExpressionSelectBoolean - 简单布尔选择器（临时）

**组件名称**: 未注册（临时组件）

**功能描述**: 临时的布尔选择器，不支持表达式。用于子表字段的必填属性等暂不支持表达式的场景。

**主要属性**:
- `value`: {value: boolean} - 值对象
- `onChange`: Function - 值变化回调
- `label`: string - 标签文本
- `helpText`: string - 帮助文本
- `disabled`: boolean - 是否禁用
- `options`: Array<{label: string, value: boolean}> - 选项列表

**注意**: 此组件是临时的，后期将被移除，因为现在子表的字段的必填属性不支持表达式。

---

### 10. VarSelector - 变量选择器

**组件名称**: `VarSelector`（React组件）

**功能描述**: 变量空间选择器，支持从变量树中选择变量。

**主要属性**:
- `showType`: 'customize' | 'default' - 回显模式
- `disabled`: boolean - 是否禁用
- `value`: any - 当前值
- `onChange`: (value?: any, data?: any) => void - 值变化回调
- `className`: string - 自定义类名
- `treeData`: IVarStruct[] - 变量树数据
- `onVarClick`: Function - 变量点击回调
- `isReserveCustomFormItem`: boolean - 是否保留自定义表单项（赋值操作左边为true，右边为false）

**功能特性**:
- 变量树展示
- 搜索过滤
- 自定义回显
- 支持级联选择

**使用示例**:
```javascript
<VarSelector
  treeData={varStructData}
  onChange={(value) => console.log(value)}
  onVarClick={() => {}}
/>
```

---

## 表单相关配置项

### 11. panelFieldSetting - 字段配置

**组件名称**: `panelFieldSetting`

**功能描述**: 字段配置弹窗，用于配置实体字段。

**主要属性**:
- 点击按钮弹出配置弹窗
- 支持字段的增删改查
- 与实体字段元数据关联

**使用示例**:
```json
{
  "type": "panelFieldSetting",
  "name": "fields",
  "label": "配置字段"
}
```

---

### 12. panelFormMasterGroup - 主表单分组

**组件名称**: `panelFormMasterGroup`

**功能描述**: 主表单分组设置组件，用于管理表单的分组结构。

**主要功能**:
- 分组列表展示：使用 DragList 展示所有分组
- 拖拽排序：支持分组顺序调整
- 新增分组：动态添加新分组
- 删除分组：删除分组及其包含的字段
- 编辑分组名：修改分组标题

**限制条件**:
- 至少保留一个分组
- 包含名称字段的分组不可删除
- 分组名称必填，最大50字符

**使用示例**:
```json
{
  "type": "panelFormMasterGroup",
  "name": "groups",
  "label": "分组设置"
}
```

---

### 13. iDFormDetailTabsGroup - 子表单Tabs分组

**组件名称**: `panelFormDetailTabsGroup`（推测）

**功能描述**: 用于配置子表单的Tabs分组。

**使用场景**:
- 子表单页签管理
- 子表单布局配置

---

### 14. iDFormDetailTabGroup - 子表单Tab组

**组件名称**: `panelFormDetailTabGroup`（推测）

**功能描述**: 用于配置子表单的单个Tab组。

---

### 15. iDFormDetailBtnGroup - 子表单按钮组

**组件名称**: `panelFormDetailBtnGroup`（推测）

**功能描述**: 用于配置子表单的按钮组。

---

### 16. iDH5FormDetailBtnGroup - 移动端子表单按钮组

**组件名称**: `panelH5FormDetailBtnGroup`（推测）

**功能描述**: 移动端子表单按钮组件，逻辑特殊，专门用于H5端。

---

### 17. panelFooterGroup - 底部按钮组

**组件名称**: `panelFooterGroup`

**功能描述**: 底部按钮actions组件属性面板，用于管理表单底部的操作按钮。

**主要功能**:
- 按钮列表展示：使用 DragList 展示所有按钮
- 拖拽排序：支持按钮顺序调整
- 新增按钮：添加自定义操作按钮（最多2个自定义按钮）
- 删除按钮：删除可移除的按钮
- 编辑按钮文本：修改按钮标签（最大8字符）

**限制条件**:
- 默认按钮不可删除（removable=false）
- 自定义按钮最多5个
- 按钮文本最大8字符
- 按钮文本必填

**使用示例**:
```json
{
  "type": "panelFooterGroup",
  "name": "footerButtons",
  "label": "底部按钮"
}
```

---

### 18. iDChildSelect - 子表选择器

**组件名称**: 未完全实现

**功能描述**: 用于子表操作和排序的组件（开发中）。

**主要功能**:
- 子表顺序设置
- 显示/隐藏配置
- 拖拽排序

---

### 19. iDMobileHeaderBtnPanel - 移动端头部按钮面板

**组件名称**: `panelMobileHeaderBtn`（推测）

**功能描述**: 移动端头部按钮配置面板。

---

## 页面相关配置项

### 20. CustomPageSet - 页面内容来源配置

**组件名称**: `CustomPageSet`

**功能描述**: 用于配置iframe嵌入页面的内容来源。

**主要属性**:
- `value`: object - 值对象
  - `sourceType`: 'pageCode' | 'url' - 内容来源类型
  - `url`: string - URL地址（仅在sourceType为'url'时使用）
  - `pageItem`: any - 页面项目信息（仅在sourceType为'pageCode'时使用）
- `onChange`: Function - 值变化回调

**主要功能**:
- 支持两种来源：页面代码（系统内页面）和URL（外部链接）
- 页面代码模式：通过弹窗选择器选择系统内的页面
- URL模式：手动输入HTTPS协议的外部URL，支持实时验证

**URL验证规则**:
- 必须以 https:// 开头
- 实时验证并提示错误
- 只有格式正确时才保存数据

**使用示例**:
```json
{
  "type": "CustomPageSet",
  "name": "pageSource",
  "label": "页面内容来源"
}
```

---

### 21. ParamsSet - 参数设置

**组件名称**: `ParamsSet`

**功能描述**: 用于配置iframe嵌入页面的参数设置。

**主要属性**:
- `value`: Array<ParamItem> - 参数列表
  - `name`: string - 参数名
  - `type`: '固定值' | '变量' - 参数类型
  - `value`: string - 参数值
  - `id`: string - 唯一标识
- `onChange`: Function - 值变化回调

**主要功能**:
- 默认显示已配置的参数列表
- 点击"设置参数"按钮弹出参数配置弹窗
- 支持参数的增加、删除和修改
- 参数类型支持固定值和变量

**使用示例**:
```json
{
  "type": "ParamsSet",
  "name": "params",
  "label": "参数设置"
}
```

---

## 事件配置项

### 22. events - 事件配置

**功能描述**: 事件配置模块，包含多个子组件。

**子组件**:
- `collection` - 事件集合
- `event` - 单个事件
- `action` - 事件动作
- `function` - 事件函数
- `editor` - 事件编辑器
- `expr` - 事件表达式

**使用场景**:
- 组件事件绑定
- 事件动作配置
- 事件流程编排

---

## 辅助配置项

### 23. DragList - 拖拽列表

**组件名称**: `DragList`（React组件，非amis组件）

**功能描述**: 标准属性编辑器，支持拖拽排序、新增、删除列表项。

**主要属性**:
- `onChange`: (data) => void - 排序变化回调
- `limit`: number - 最大数量限制
- `group`: ComWithId[] - 列表数据
- `addText`: string - 添加按钮文本
- `onAdd`: () => void - 添加回调
- `onDel`: (item) => void - 删除回调
- `onInputChange`: (e, item) => void - 输入变化回调
- `inputProps`: InputProps - Input组件属性
- `errorMap`: Array<{kId: string, msg: string}> - 错误映射
- `disabledSituation`: any[] - 禁用情况配置
- `mode`: 'input' | 'select' | 'input-icon' - 显示模式
- `selectOptions`: any[] - 选择器选项
- `optionsSelected`: any[] - 已选中的选项

**显示模式**:
1. `input`: 输入框模式
2. `select`: 下拉选择模式
3. `input-icon`: 输入框+图标模式

**使用场景**:
- 表单分组管理
- 按钮列表管理
- 任何需要拖拽排序的列表

---

### 24. Collapse - 折叠面板

**组件名称**: `Collapse`（React组件）

**功能描述**: 属性面板折叠容器，支持展开/收起内容。

**主要属性**:
- `children`: React.ReactNode - 子内容
- `title`: string - 标题文本

**使用示例**:
```javascript
<Collapse title="高级设置">
  {/* 配置项内容 */}
</Collapse>
```

---

### 25. IconView - 图标展示

**组件名称**: `IconView`（React组件）

**功能描述**: 图标展示组件，封装了NeoIcons。

**主要属性**:
- `name`: string - 图标名称
- `size`: number - 图标大小
- `style`: React.CSSProperties - 自定义样式

---

### 26. ImgIcon - 图片图标

**组件名称**: `ImgIcon`（React组件）

**功能描述**: 临时使用的图片图标组件，用于显示icon库中暂时没有的图标。

**支持的类型**:
- `formHeader` - 表单头部图标
- `formFooter` - 表单底部图标
- `fx-light` - 公式图标（高亮）
- `fx-gray` - 公式图标（灰色）
- `boolean-field` - 布尔字段图标
- `real-number` - 实数图标

**主要属性**:
- `type`: string - 图标类型
- `onClick`: Function - 点击回调
- `style`: React.CSSProperties - 自定义样式
- `size`: number - 图标大小

**注意**: 此组件只做临时使用，后续会删除。

---

### 27. IDButton - 按钮组件

**组件名称**: `IDButton`（React组件）

**功能描述**: 自定义按钮组件，支持自定义加载状态。

**主要属性**:
- 继承Antd Button的所有属性
- `loading`: boolean - 加载状态
- 加载时显示自定义的 IDLoading 组件

**使用示例**:
```javascript
<IDButton loading={true} type="primary">
  保存
</IDButton>
```

---

### 28. IDLoading - 加载指示器

**组件名称**: `IDLoading`（React组件）

**功能描述**: 自定义加载指示器组件，用于按钮和其他组件的加载状态。

---

### 29. AttributeLibrary - 属性库

**组件名称**: `AttributeLibrary`（React组件）

**功能描述**: 属性库展示组件，以抽屉形式展示系统支持的所有属性。

**主要属性**:
- `open`: boolean - 是否打开
- `onClose`: Function - 关闭回调

**主要功能**:
- 左侧树形菜单展示属性分类
- 右侧展示选中属性的详细信息
- 支持属性搜索和查看
- 包含属性的入参、类型、描述等信息

---

### 30. FunctionLibraryPanel - 函数库

**组件名称**: `FunctionLibraryPanel`（React组件）

**功能描述**: 函数库展示组件，以抽屉形式展示系统支持的所有函数。

**主要属性**:
- `open`: boolean - 是否打开
- `onClose`: Function - 关闭回调

**主要功能**:
- 左侧树形菜单展示函数分类
- 右侧展示选中函数的详细信息
- 包含函数的入参、返回值、示例等信息

---

### 31. emptyPanel - 空面板

**组件名称**: `emptyPanel`（推测）

**功能描述**: 空白占位面板，用于没有可配置属性的场景。

---

### 32. modeSelect - 模式选择器

**组件名称**: `modeSelect`（未详细实现）

**功能描述**: 用于选择组件的不同模式。

---

### 33. formFieldsSet - 表单字段设置

**组件名称**: `formFieldsSet`（推测）

**功能描述**: 联系人作战地图基础信息设置面板。

---

### 34. csgCardPanel - CSG卡片面板

**组件名称**: `csgCardPanel`（推测）

**功能描述**: 联系人作战地图卡片设置面板。

---


### 35. businessTypePanel - 业务类型面板

**组件名称**: `businessTypePanel`（未完成）

**功能描述**: 实体属性面板，暂未使用，亦未开发完。

**注意**: 这是一个未完成的组件，目前只是占位。

---


## 配置项注册机制

所有属性配置项通过以下方式注册到系统：

### 1. Amis 渲染器注册

使用 `@Renderer` 装饰器注册：

```typescript
@Renderer({
  name: 'panelInput',
  test: /(?:^|\/)panelInput$/i,
})
export default class ComponentRenderer extends React.Component {
  // ...
}
```

### 2. PropertyEditor 注册

特殊属性通过 PropertyEditor 注册：

```typescript
PropertyEditor.register(
  { itemType: '999', apiKey: '$alias' },
  'PropertyAliasEditor'
);
```

### 3. 直接导入注册

某些配置项通过直接导入方式注册：

```typescript
import './input';
import './fieldSetting';
import './events';
```

---

## 使用指南

### 在属性面板配置中使用

属性配置项通常在组件的 propsSchema 中定义：

```typescript
const propsSchema = {
  type: 'form',
  body: [
    {
      type: 'panelInput',
      name: 'title',
      label: '标题',
      helpText: '请输入组件标题'
    },
    {
      type: 'panelSelect',
      name: 'visible',
      label: '是否可见',
      options: [
        { label: '是', value: true },
        { label: '否', value: false }
      ]
    },
    {
      type: 'xObjectDataApi',
      name: 'dataSource',
      label: '数据源配置'
    }
  ]
};
```

### 直接使用React组件

某些配置项可以作为React组件直接使用：

```typescript
import { ExpressionInput } from '../expressionInput';
import { VarSelector } from '../varSelector';
import { DragList } from '../DragList';

// 在组件中使用
<ExpressionInput 
  isPopover={true}
  expressionObj={{ enabled: true, expression: '' }}
  onChangeValue={(value) => console.log(value)}
/>

<VarSelector
  treeData={varStructData}
  onChange={(value) => console.log(value)}
/>

<DragList
  group={listData}
  onAdd={handleAdd}
  onDel={handleDel}
  onChange={handleChange}
/>
```

---
