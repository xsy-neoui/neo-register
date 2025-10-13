# 实体数据详情组件
实体数据详情组件（entity-detail）是一个用于展示实体数据详细信息的自定义组件。它通过 Neo Open API 获取数据，支持多列布局展示，自动识别字段类型并进行格式化显示。

## 功能特性

- ✅ **数据获取**：基于 Neo Open API 获取实体数据详情
- ✅ **多列布局**：支持 1-4 列的灵活布局配置
- ✅ **字段类型识别**：自动识别并格式化不同类型的字段（布尔值、日期、数字、URL、邮箱、电话等）
- ✅ **可视化配置**：在编辑器中可视化配置实体类型、数据ID、列数等属性
- ✅ **响应式设计**：支持不同屏幕尺寸的自适应布局
- ✅ **刷新功能**：支持手动刷新数据
- ✅ **错误处理**：完善的错误提示和重试机制

## 使用场景

- 实体记录详情页展示
- 数据详情弹窗
- 审批流程中的数据展示
- 仪表盘中的详细信息卡片

## 组件属性配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | string | '实体数据详情' | 组件标题 |
| showTitle | boolean | true | 是否显示标题栏和刷新按钮 |
| xObjectDetailApi | object | { xObjectApiKey: 'account', objectId: '' } | 业务详情数据配置，包含实体对象API Key和数据ID |
| xObjectDetailApi.xObjectApiKey | string | 'account' | 实体对象的 API Key |
| xObjectDetailApi.objectId | string | '' | 要展示的数据记录ID，支持变量如 ${recordId} |
| columnCount | number | 3 | 详情页面的列数布局（1-4列） |

## 字段类型支持

组件会根据字段类型自动格式化显示：

- **boolean**：显示为带图标的标签（是/否）
- **date/datetime**：格式化为本地日期时间
- **number/currency/percent**：使用千分位格式化
- **url**：显示为可点击的链接
- **email**：显示为邮箱链接
- **phone**：显示为电话链接
- **text**：普通文本显示
- **空值**：显示为 "-"

## 使用示例

### 基础用法

```jsx
<EntityDetail
  title="客户详情"
  xObjectDetailApi={{
    xObjectApiKey: "account",
    objectId: "12345"
  }}
  columnCount={3}
/>
```

### 使用变量

在 Neo 平台中，可以使用上下文变量：

```jsx
<EntityDetail
  title="当前记录详情"
  xObjectDetailApi={{
    xObjectApiKey: "customContact__c",
    objectId: "${recordId}"
  }}
  columnCount={2}
/>
```

### 隐藏标题栏

```jsx
<EntityDetail
  showTitle={false}
  xObjectDetailApi={{
    xObjectApiKey: "account",
    objectId: "12345"
  }}
  columnCount={1}
/>
```

## 技术实现

### 数据获取

组件使用以下 API 获取数据：

1. **xObject.get**：获取单条实体数据
2. **xObject.getDesc**：获取实体字段描述信息

```typescript
// 获取详情数据
const result = await xObject.get(xObjectDetailApi.xObjectApiKey, xObjectDetailApi.objectId);

// 获取字段描述
const descResult = await xObject.getDesc(xObjectDetailApi.xObjectApiKey);
```

### 布局方案

组件采用 Ant Design 的 Row/Col 栅格系统，根据 `columnCount` 属性动态分配字段到不同的列中：

- 1列：每列占 24 格（100%宽度）
- 2列：每列占 12 格（50%宽度）
- 3列：每列占 8 格（33.3%宽度）
- 4列：每列占 6 格（25%宽度）

### 响应式适配

- **桌面端**（>1200px）：按配置的列数显示
- **平板端**（768px-1200px）：3列及以上自动调整为2列
- **移动端**（<768px）：自动调整为单列显示

## 样式定制

组件提供了丰富的 CSS 类名，可以通过自定义样式进行个性化定制：

```scss
.entity-detail-container {
  // 容器样式
  
  .detail-header {
    // 头部样式
  }
  
  .detail-content {
    // 内容区域样式
    
    .detail-column-card {
      // 列卡片样式
    }
  }
}
```

## 注意事项

1. **xObjectDetailApi 参数必填**：必须提供有效的 `xObjectDetailApi` 对象，包含 `xObjectApiKey` 和 `objectId` 才能正常展示
2. **权限要求**：确保当前用户有权限访问指定的实体对象
3. **字段过滤**：组件会自动过滤以下划线开头的系统字段
4. **性能优化**：大量字段时建议使用2-3列布局以保证用户体验
5. **属性结构**：使用 `xObjectDetailApi` 对象结构，提供更清晰的数据配置方式

## 开发说明

### 目录结构

```
entity-detail/
├── index.tsx       # 组件主文件
├── model.ts        # 编辑器配置文件
├── style.scss      # 样式文件
└── README.md       # 组件文档
```

### 依赖包

- react: ^16.9.0
- antd: ^4.9.4
- neo-open-api: ^1.0.2