'use strict';
const path = require('path');
// 统一路径解析
function resolve(dir) {
  return path.resolve(__dirname, dir);
}

// 包括生产和开发的环境配置信息
module.exports = {
  settings: {
    enableESLint: false, // 调试模式是否开启ESLint，默认开启ESLint检测代码格式
    enableESLintFix: false, // 是否自动修正代码格式，默认不自动修正
    enableStyleLint: false, // 是否开启StyleLint，默认开启ESLint检测代码格式
    enableStyleLintFix: false // 是否需要StyleLint自动修正代码格式
  },
  webpack: {
    // target: ['web', 'es5'], // 指定目标环境为 web 和 es5，确保兼容性
    resolve: {
      // webpack的resolve配置
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.esm.js', '.umd.js', '.min.js', '.json'], // 用于配置webpack在尝试过程中用到的后缀列表
      alias: {
        '@': resolve('src'),
        $function: resolve('src/function'),
        $utils: resolve('src/utils'),
      },
      // conditionNames: ['require']
    },
    // createDeclaration: false, // 打包时是否创建ts声明文件
    ignoreNodeModules: false, // 打包时是否忽略 node_modules
    allowList: [], // ignoreNodeModules为true时生效
    externals: [],
    projectDir: ['src', 'demo', 'demo2'],
    // cssLoaderUrl: true,
    moduleRules: [], // 用于配置自定义loaders
    plugins: [], // 用于配置自定义plugins
    babelPlugins: [],
  },
  linkDebug: {
    entry: { // 外链调试（在线上页面设计器端预览自定义组件）
      index: [
        './demo/react-info-card/register.js',
        './demo/react-info-card/model.js',
        './demo/vue-info-card/register.js',
        './demo/vue-info-card/model.js',
        './demo2/entity-detail/register.ts',
        './demo2/entity-detail/model.ts',
      ],
    },
    NODE_ENV: 'development',
    port: 80,
    autoOpenBrowser: false,
    closeHtmlWebpackPlugin: true, // 关闭HtmlWebpackPlugin
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '',
    hostname: 'localhost',
    cssSourceMap: true,
    closeHotReload: false, // 是否关闭热更新
  },
  linkDebug2: {
    entry: { // 外链调试（在线上页面设计器端预览自定义组件）
      index: [
        './demo2/react-info-card/register.js',
        './demo2/react-info-card/model.js',
        './demo2/vue-info-card/register.js',
        './demo2/vue-info-card/model.js',
        './demo2/entity-detail/register.ts',
        './demo2/entity-detail/model.ts',
      ],
    },
    NODE_ENV: 'development',
    port: 80,
    // autoOpenBrowser: false,
    // closeHtmlWebpackPlugin: true, // 关闭HtmlWebpackPlugin
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '',
    hostname: 'localhost',
    cssSourceMap: true
  },
  build2lib: {
    entry: {
      // webpack构建入口
      index: './src/main.ts', // 构建lib的入口
    },
    // 用于构建生产环境代码的相关配置信息
    NODE_ENV: 'production', // development / production
    libraryName: 'neoRegister', // 构建第三方功能包时最后导出的引用变量名
    assetsRoot: resolve('./dist'), // 打包后的文件绝对路径（物理路径）
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '', // 资源引用二级路径
    ignoreNodeModules: true, // 打包时是否忽略 node_modules
    // allowList: ['vue'], // ignoreNodeModules为true时生效
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css', 'json'],
    // bundleAnalyzerReport: false,
  },
  build2esm: {
    type: 'ts', // js、ts，当设置 ts 时会启动 @rollup/plugin-typescript
    input: resolve('src/main.ts'),
    fileName: 'index',
    // 不将以下依赖打包到输出文件中
    excludeList: [],
    declaration: true, // 构建时是否创建声明文件
  }
};
