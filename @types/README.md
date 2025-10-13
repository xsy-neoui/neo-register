### 说明
当前 TS 项目中同时使用了 Vue 和 React，会导致 JSX 类型定义冲突。
Vue 定义：JSX.Element extends VNode（包含 isRootInsert、isComment 等 Vue 特有属性）
React 定义：JSX.Element 是 React.ReactElement（不包含 Vue 的那些属性）
当 TypeScript 尝试合并这两个定义时，React 组件的返回类型不满足 Vue 扩展的 JSX.Element 要求，从而报错。

#### 临时解决方案
在 @types/vue 覆盖 vue/@types 的类型定义，并在 tsconfig.json 中 通过 paths 对 vue 进行重定向。