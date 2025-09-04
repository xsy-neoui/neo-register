import React from 'react';
import Vue from 'vue';

// 方便取值的时候能够把上层的取到，但是获取的时候不会全部把所有的数据获取到。
function cloneObject(target, persistOwnProps = true) {
    const obj = target && target.__super
        ? Object.create(target.__super, {
            __super: {
                value: target.__super,
                writable: false,
                enumerable: false,
            },
        })
        : Object.create(Object.prototype);
    persistOwnProps &&
        target &&
        Object.keys(target).forEach((key) => (obj[key] = target[key]));
    return obj;
}
function extendObject(target, src, persistOwnProps = true) {
    const obj = cloneObject(target, persistOwnProps);
    src && Object.keys(src).forEach((key) => (obj[key] = src[key]));
    return obj;
}

const consoleTag = '[neo-widget]'; // 输出标记
/**
 * 获取技术栈标识
 * 目的：兼容用户非标准写法
 */
function getFramework(_framework) {
    let defaultFramework = Framework.react;
    if (!_framework) {
        return defaultFramework;
    }
    let curFramework = _framework.toLowerCase().trim();
    switch (curFramework) {
        case 'jquery':
        case 'jq':
            curFramework = Framework.jquery;
            break;
        case 'vue2':
        case 'vue 2':
        case 'vue2.0':
        case 'vue 2.0':
            curFramework = Framework.vue2;
            break;
        case 'vue':
        case 'vue3':
        case 'vue 3':
        case 'vue3.0':
        case 'vue 3.0':
            curFramework = Framework.vue3;
            console.error('neo-widget 暂不支持 vue3.0 技术栈。');
            break;
        default:
            curFramework = Framework.react;
    }
    return curFramework;
}
/**
 * 识别自定义组件技术栈类型
 * react 编译后是 一个函数组件
 * vue 编译后是 一个类对象: { render: ƒ, __file: 'xx/xx.vue', __compiled: true, ... }
 */
function getFrameworkByCmp(component) {
    if (isVueComponent(component)) {
        return 'vue2';
    }
    return 'react';
}
function isVueComponent(component) {
    return (typeof component === 'object' &&
        ((component._compiled && component.components) ||
            (component.__file && component.__file.endsWith('.vue'))));
}
var Usage;
(function (Usage) {
    Usage["renderer"] = "renderer";
    Usage["formitem"] = "formitem";
})(Usage || (Usage = {}));
/**
 * 获取neo渲染器类型标识
 * 目的：兼容用户非标准写法
 */
function getUsage(_usage) {
    let defaultUsage = Usage.renderer;
    if (!_usage) {
        return defaultUsage;
    }
    let curUsage = _usage.toLowerCase().trim();
    switch (curUsage) {
        case 'renderer':
        case 'renderers':
            curUsage = Usage.renderer;
            break;
        case 'formitem':
        case 'form-item':
        case 'form item':
            curUsage = Usage.formitem;
            break;
        default:
            curUsage = Usage.renderer;
    }
    return curUsage;
}
/**
 * 当前 neo-widget 支持的技术栈
 * 备注：vue2和vue3不能同时存在
 */
var Framework;
(function (Framework) {
    Framework["react"] = "react";
    Framework["vue2"] = "vue2";
    Framework["vue3"] = "vue3";
    Framework["jquery"] = "jquery";
})(Framework || (Framework = {}));
// 判断是否缺失editor插件关键字段
function isEditorPlugin(EditorPluginClass) {
    let _isEditorPlugin = false;
    if (!EditorPluginClass) {
        return false;
    }
    const _editorPluginObj = new EditorPluginClass();
    if (!_editorPluginObj.cmpType) {
        console.error(`${consoleTag} / registerNeoEditorPlugin: 自定义组件注册失败，cmpType 不能为空。`);
    }
    else if (!_editorPluginObj.label) {
        console.error(`${consoleTag} / registerNeoEditorPlugin: 自定义组件注册失败，名称（label）不能为空。`);
    }
    else if (!_editorPluginObj.tags) {
        console.error(`${consoleTag} / registerNeoEditorPlugin: 自定义组件注册失败，组件分类（tags）不能为空。`);
    }
    else if (!Array.isArray(_editorPluginObj.tags)) {
        console.error(`${consoleTag} / registerNeoEditorPlugin: 自定义组件注册失败，组件分类（tags）格式异常。`);
    }
    else {
        // 1.设置一个默认 icon
        if (!_editorPluginObj.icon) {
            Object.assign(EditorPluginClass.prototype, {
                icon: 'https://neo-widgets.bj.bcebos.com/custom-widget.svg',
            });
        }
        _isEditorPlugin = true;
    }
    return _isEditorPlugin;
}
// 判断是否是字符串类型
function isString(str) {
    return Object.prototype.toString.call(str).slice(8, -1) === 'String';
}
function isProxy(obj) {
    if (!obj) {
        return false;
    }
    const hasMSTProperties = !!(obj.$treenode ||
        obj.$mstObservable ||
        obj.$modelType ||
        obj.$modelId);
    return (hasMSTProperties || Object.prototype.toString.call(obj) === '[object Proxy]');
}

/**
 * registerNeoEditorPlugin: 注册 neo-editor 自定义插件
 */
function registerNeoEditorPlugin(curEditorPlugin, cmpType) {
    if (curEditorPlugin && isEditorPlugin(curEditorPlugin)) {
        const curCmpType = cmpType || new curEditorPlugin().cmpType;
        const curEditorPluginObj = new curEditorPlugin();
        Object.assign(curEditorPlugin.prototype, {
            custom: true,
            exposedToDesigner: curEditorPluginObj.exposedToDesigner ?? true,
            namespace: curEditorPluginObj.namespace ?? 'neo-widget-cli',
            cmpType: curCmpType
        });
        // registerEditorPlugin(curEditorPlugin); // 不直接注册为 neo-editor 插件
        // 通过 postMessage 告知 neo-editor 注册一个新的插件
        if (window && window.postMessage) {
            const newComponentType = AddCustomEditorPlugin(curCmpType, curEditorPlugin);
            if (newComponentType) {
                console.info(`${consoleTag}触发注册自定义插件(${curCmpType})事件`);
                window.postMessage({
                    type: 'neo-plugin-register-event',
                    eventMsg: `${consoleTag}注册一个 neo-editor 自定义插件`,
                    cmpType: curCmpType,
                }, '*');
            }
        }
    }
}
function AddCustomEditorPlugin(cmpType, plugin) {
    if (window && !window.NEOEditorCustomPlugins) {
        window.NEOEditorCustomPlugins = {};
    }
    if (!window.NEOEditorCustomPlugins[cmpType]) {
        window.NEOEditorCustomPlugins[cmpType] = plugin;
        return cmpType;
    }
    else {
        console.error(`${consoleTag}注册自定义插件失败，已存在重名插件(${cmpType})。`);
    }
    return null;
}

/**
 * 将 vue2.0 自定义组件包裹成一个 react组件
 */
function createVue2Component(vueObj) {
    if (!vueObj || (typeof vueObj !== 'function' && typeof vueObj !== 'object')) {
        return;
    }
    class VueFactory extends React.Component {
        domRef;
        vm;
        isUnmount;
        // 指定 contextType 读取当前的 scope context。
        // React 会往上找到最近的 scope Provider，然后使用它的值。
        // static contextType = ScopedContext; // 待支持
        constructor(props, context) {
            super(props);
            this.domRef = React.createRef();
            this.isUnmount = false;
            /*
            // 待支持（自定义组件支持事件动作）
            const scoped = context;
            scoped.registerComponent(this);
            */
            this.resolveNeoProps = this.resolveNeoProps.bind(this);
        }
        componentDidMount() {
            const { neoData, neoMSTData, neoFunc } = this.resolveNeoProps();
            const { data, ...rest } = (vueObj =
                typeof vueObj === 'function' ? new vueObj() : vueObj);
            const vueData = typeof data === 'function' ? data() : data;
            const curVueData = extendObject(vueData, neoData);
            // 传入的Vue属性
            this.vm = new Vue({
                ...rest,
                data: () => curVueData,
                props: extendObject(neoFunc, {
                    ...(rest.props || {}),
                    ...neoMSTData,
                }),
            });
            Object.keys(neoFunc).forEach((key) => {
                this.vm.$props[key] = neoFunc[key];
            });
            if (this.domRef.current) {
                this.domRef.current.appendChild(this.vm.$mount().$el);
            }
        }
        componentDidUpdate() {
            if (!this.isUnmount) {
                const { neoData } = this.resolveNeoProps();
                if (this.vm) {
                    Object.keys(neoData).forEach((key) => {
                        this.vm[key] = neoData[key];
                    });
                    this.vm.$forceUpdate();
                }
            }
        }
        componentWillUnmount() {
            this.isUnmount = true;
            /*
            // 待支持
            const scoped = this.context;
            scoped.unRegisterComponent(this);
            */
            if (this.vm) {
                this.vm.$destroy();
            }
        }
        resolveNeoProps() {
            let neoFunc = {};
            let neoData = {};
            let neoMSTData = {};
            Object.keys(this.props).forEach((key) => {
                const value = this.props[key];
                if (typeof value === 'function') {
                    neoFunc[key] = value;
                }
                else if (isProxy(value)) {
                    neoMSTData[key] = value;
                }
                else {
                    neoData[key] = value;
                }
            });
            return { neoData, neoMSTData, neoFunc };
        }
        /**
         * reload动作处理
         */
        reload() {
            if (this.vm && this.vm.reload) {
                this.vm.reload();
            }
            else {
                console.warn('自定义组件暂不支持reload动作。');
            }
        }
        /**
         * 事件动作处理:
         * 在这里设置自定义组件对外暴露的动作，其他组件可以通过组件动作触发自定义组件的对应动作
         */
        doAction(action, args) {
            if (this.vm && this.vm.doAction) {
                this.vm.doAction(action, args);
            }
            else {
                console.warn('自定义组件中不存在 doAction。');
            }
        }
        render() {
            return React.createElement("div", { ref: this.domRef });
        }
    }
    return VueFactory;
}

/**
 * registerRendererByType: 根据type类型注册 neo 自定义组件
 *【方法参数说明】
 * newRenderer: 自定义组件,
 * rendererOption: {
 *   cmpType: 自定义组件的type类型，比如：input、text-area、select-user等
 *   usage?: neo普通渲染器、neo表单渲染器，默认值为 neo普通渲染器
 *   weight?: 自定义组件权重
 *   framework?: 技术栈类型，默认为 react 技术栈，可选技术栈：vue2、react
 * }
 * 备注：暂不支持 vue3.0 技术栈
 */
function registerRendererByType(newRenderer, rendererOption) {
    if (!newRenderer) {
        return;
    }
    // 1.默认注册配置参数
    const curRendererOption = {
        cmpType: '',
        usage: Usage.renderer,
        weight: 0,
        // framework: Framework.react, // 默认为 react 技术栈
    };
    // 2.获取相关配置参数
    if (rendererOption && isString(rendererOption)) {
        // rendererOption为字符串则将其设置为type
        Object.assign(curRendererOption, {
            cmpType: rendererOption,
        });
    }
    else {
        Object.assign(curRendererOption, rendererOption);
    }
    if (curRendererOption && !curRendererOption.cmpType) {
        console.error(`${consoleTag} / registerRendererByType: 自定义组件注册失败，cmpType 不能为空。`);
    }
    else {
        // 根据组件结构自动识别组件技术栈
        curRendererOption.framework = curRendererOption.framework
            ? getFramework(curRendererOption.framework)
            : getFrameworkByCmp(newRenderer);
        // 修正usage数值
        curRendererOption.usage = getUsage(curRendererOption.usage);
        // 当前支持注册的渲染器类型
        const registerMap = {
            renderer: () => { },
            formitem: () => { }, // FormItem
        };
        // 当前支持的技术栈类型
        const resolverMap = {
            react: (i) => i,
            vue2: createVue2Component,
            vue3: createVue2Component, // createVue3Component,
        };
        // 支持多技术栈
        const curRendererComponent = resolverMap[curRendererOption.framework](newRenderer);
        // 注册neo渲染器
        if (!registerMap[curRendererOption.usage]) {
            console.error(`${consoleTag} / registerRendererByType: 自定义组件注册失败，暂不支持 ${curRendererOption.usage} 组件类型。`);
        }
        else {
            // 通过 postMessage 告知 neo 注册一个新的渲染器
            if (window && window.postMessage) {
                const newComponentType = AddNeoCustomRenderer(curRendererOption.cmpType, {
                    cmpType: curRendererOption.cmpType,
                    weight: curRendererOption.weight,
                    usage: curRendererOption.usage,
                    framework: curRendererOption.framework,
                    component: curRendererComponent,
                    config: curRendererOption,
                });
                if (newComponentType) {
                    console.info(`${consoleTag}触发注册自定义组件(${newComponentType})事件`);
                    window.postMessage({
                        type: 'neo-renderer-register-event',
                        eventMsg: `${consoleTag}注册一个自定义组件`,
                        neoRenderer: {
                            cmpType: newComponentType,
                            weight: curRendererOption.weight,
                            usage: curRendererOption.usage,
                            config: curRendererOption,
                        },
                    }, '*');
                }
            }
        }
    }
}
function AddNeoCustomRenderer(componentType, rendererData) {
    if (window && !window.NeoCustomRenderers) {
        window.NeoCustomRenderers = {};
    }
    if (!window.NeoCustomRenderers[componentType]) {
        window.NeoCustomRenderers[componentType] = rendererData;
        return componentType;
    }
    else {
        console.error(`${consoleTag} / registerRendererByType: 自定义组件注册失败，已存在重名渲染器(${componentType})。`);
    }
    return null;
}

export { createVue2Component, registerNeoEditorPlugin, registerRendererByType };
