# 属性配置项类型汇总

本文档汇总了可作为组件属性配置项的所有表单组件类型，包括 amis 提供的配置项、NeoCRM 平台数据源配置项以及 NeoCRM 自定义表单配置项。

## 目录

- [一、amis 表单组件配置项](#一amis-表单组件配置项)
  - [1. 基础输入类](#1-基础输入类)
  - [2. 选择类](#2-选择类)
  - [3. 特殊输入类](#3-特殊输入类)
  - [4. 文件上传类（暂不可用）](#4-文件上传类暂不可用)
  - [5. 富文本编辑类](#5-富文本编辑类)
  - [6. 布局容器类](#6-布局容器类)
  - [7. 复合组件类](#7-复合组件类)
  - [8. 特殊功能类](#8-特殊功能类)
- [二、NeoCRM 平台数据源配置项](#二neocrm-平台数据源配置项)
  - [xObjectEntityList - 实体列表数据源](#xobjectentitylist---实体列表数据源)
  - [xObjectDataApi - 实体业务数据列表数据源](#xobjectdataapi---实体业务数据列表数据源)
  - [xObjectDetailApi - 实体详情数据源](#xobjectdetailapi---实体详情数据源)
- [三、NeoCRM 自定义表单配置项](#三neocrm-自定义表单配置项)
- [使用说明](#使用说明)

---

## 一、amis 表单组件配置项

### 1. 基础输入类

#### 文本输入
- **text** - 文本输入框
- **password** - 密码输入框  
- **email** - 邮箱输入框
- **url** - URL输入框
- **native-date** - 原生日期输入
- **native-time** - 原生时间输入
- **native-number** - 原生数字输入

#### 多行文本
- **textarea** - 多行文本输入框

#### 数字输入
- **number** - 数字输入框

#### 日期时间
- **date** - 日期选择器
- **datetime** - 日期时间选择器
- **time** - 时间选择器
- **month** - 月份选择器
- **quarter** - 季度选择器
- **year** - 年份选择器
- **date-range** - 日期范围选择器
- **datetime-range** - 日期时间范围选择器
- **month-range** - 月份范围选择器

### 2. 选择类

#### 单选/多选
- **select** - 下拉选择框
- **multi-select** - 多选下拉框
- **radios** - 单选框组
- **checkboxes** - 复选框组
- **checkbox** - 单个复选框

#### 树形选择
- **tree-select** - 树形选择器
- **nested-select** - 嵌套选择器

#### 级联选择
- **chained-select** - 级联选择器

#### 穿梭框
- **transfer** - 穿梭框组件
- **tabs-transfer** - 标签页穿梭框

#### 其他选择
- **picker** - 选择器

### 3. 特殊输入类

#### 开关
- **switch** - 开关组件

#### 滑块
- **range** - 范围滑块

#### 评分
- **rating** - 评分组件（待完善）

#### 颜色
- **color** - 颜色选择器

#### 图标
- **icon-picker** - 图标选择器

#### 城市
- **city** - 城市选择器

#### 位置
- **location** - 位置选择器 

### 4. 文件上传类（暂不可用）

#### 文件上传
- **file** - 文件上传组件 

#### 图片上传
- **image** - 图片上传组件

### 5. 富文本编辑类

#### 编辑器
- **js-editor** - JavaScript 编辑器
- **ts-editor** - TypeScript 编辑器
- **rich-text** - 富文本编辑器
- **editor** - 通用编辑器 
- **diff-editor** - 差异编辑器 

### 6. 布局容器类

#### 容器
- **container** - 容器组件
- **hbox** - 水平盒子布局
- **grid** - 网格布局 

#### 分组
- **field-set** - 字段集
- **group** - 分组组件

#### 标签页
- **tabs** - 标签页组件

### 7. 复合组件类

#### 组合
- **combo** - 组合组件
- **array** - 数组组件 
- **repeat** - 重复组件 

#### 子表单
- **form** - 子表单

#### 表格
- **table** - 表格组件 

#### 矩阵
- **matrix** - 矩阵组件

### 8. 特殊功能类

#### 隐藏字段
- **hidden** - 隐藏字段

#### 静态显示
- **static** - 静态文本显示

#### 按钮
- **button** - 按钮组件
- **submit** - 提交按钮
- **reset** - 重置按钮
- **button-toolbar** - 按钮工具栏

#### 输入组合
- **input-group** - 输入组合组件

#### 服务
- **service** - 服务组件

#### 公式
- **formula** - 公式组件 

#### 条件构建器
- **condition-builder** - 条件构建器 

#### UUID
- **uuid** - UUID 生成器

---

## 二、NeoCRM 平台数据源配置项

### xObjectEntityList - 实体列表数据源

这是一个简化的对象实体列表选择配置项，采用直接下拉列表配置方式，专门用于选择对象实体。

**功能特性：**
1. **实体列表展示**：以下拉列表形式展示当前可选择的实体对象
2. **搜索功能**：支持实体名称搜索
3. **数据存储**：选择的实体ID存储到 value 中
4. **实体类型控制**：通过 custom 属性控制使用标准实体还是自定义实体

**使用方法：**

在属性配置面板（propsSchema）中使用：

```json
{
  "type": "xObjectEntityList",
  "name": "xObjectApiKey",
  "label": "对象实体列表",
  "custom": false
}
```

**组件属性：**

- `name`: 字段名称
- `label`: 标签文本
- `disabled`: 是否禁用
- `custom`: 是否使用自定义实体，设置为 false 则表示展示标准实体列表，不传则展示标准实体和自定义实体
- `value`: 当前已选择的实体对象ID（xObjectApiKey）
- `onChange`: 值变化回调

---

### xObjectDataApi - 实体业务数据列表数据源

这是一个用于获取实体业务数据列表的属性配置项。

**功能特性：**
1. **输入框展示**：以输入框形式展示当前配置的实体和选择的字段信息
2. **设置按钮**：右侧设置图标，点击打开配置弹窗
3. **实体类型选择**：弹窗中支持选择标准实体或自定义实体
4. **实体选择**：弹窗中支持下拉选择实体
5. **字段选择**：使用 antd Transfer 组件选择字段，默认选中所有实体字段
6. **分页配置**：配置页码（默认展示第几页）和每页条数（每页展示多少条数据）
7. **数据存储**：选择的实体ID存储到 `xObjectApiKey`，选中的字段列表存储到 `fields`，字段信息列表存储到 `fieldDescList`，页码存储到 `page`，每页条数存储到 `pageSize`

**使用方法：**

在属性配置面板（propsSchema）中使用：

```json
{
  "type": "xObjectDataApi",
  "name": "dataSource",
  "label": "数据源配置"
}
```

**组件属性：**

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

---

### xObjectDetailApi - 实体详情数据源

这是一个用于配置获取实体业务详情数据的属性配置项。

**功能特性：**
1. **输入框展示**：以输入框形式展示当前配置的实体、业务数据ID和字段信息
2. **设置按钮**：右侧设置图标，点击打开配置弹窗
3. **实体选择**：弹窗中支持下拉选择实体（标准实体/自定义实体）
4. **业务数据ID选择**：根据选择的实体，使用 xObject.query 获取业务数据列表，支持选择具体的业务数据ID
5. **字段选择**：使用 antd Transfer 组件选择字段，默认全部选中
6. **数据存储**：选择的实体ID存储到 `xObjectApiKey`，业务数据ID存储到 `objectId`，字段列表存储到 `fieldDescList`

**使用方法：**

在属性配置面板（propsSchema）中使用：

```json
{
  "type": "xObjectDetailApi",
  "name": "dataSource",
  "label": "业务详情数据源配置"
}
```

**组件属性：**

- `name`: 字段名称
- `label`: 标签文本
- `disabled`: 是否禁用
- `value`: 当前值，格式为 `{ xObjectApiKey: string, objectId: string }`
- `onChange`: 值变化回调

**特性：**
- **实体类型切换**：支持标准实体和自定义实体的切换
- **智能联动**：选择实体后自动加载对应的业务数据列表和字段列表
- **搜索过滤**：所有选择器都支持搜索过滤功能

---

## 三、NeoCRM 自定义表单配置项

### 表单输入组件
以下组件均可作为属性配置项使用：

- **neoInput** - Input 输入框
- **neoInputNumber** - InputNumber 数字输入框
- **neoInputTree** - InputTree 树形输入框
- **neoSearch** - Search 搜索框
- **neo_select** - Select 选择器
- **neoCustomSelect** - CustomSelect 自定义选择器
- **neoTreeSelect** - TreeSelect 树形选择器
- **neoCascader** - Cascader 级联选择器
- **neoAutoComplete** - AutoComplete 自动完成
- **neoMentions** - Mentions 提及
- **neoDatePicker** - DatePicker 日期选择器
- **neoTimePicker** - TimePicker 时间选择器
- **neoSwitch** - Switch 开关
- **neoRadio** - Radio 单选框
- **neoCheckbox** - Checkbox 复选框
- **neoCheckboxGroup** - CheckboxGroup 复选框组
- **neoRate** - Rate 评分
- **neoSlider** - Slider 滑动输入条
- **neoUpload** - Upload 上传
- **neoRichText** - RichText 富文本编辑器
- **neoEditor** - Editor 编辑器

---

## 使用说明

### amis 表单项
- 以上 amis 表单项基于 amis 1.1.5 私有化版本
- 相关表单项使用说明请见 [amis 使用文档](https://aisuda.bce.baidu.com/amis/zh-CN/components/form/index)

### NeoCRM 表单组件
- NeoCRM 自定义表单组件是在平台中注册的增强型表单组件
- 这些组件在 amis 基础上提供了更贴合 NeoCRM 业务场景的功能

