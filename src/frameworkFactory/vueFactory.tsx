/**
 * 将 vue2.0 自定义组件包裹成一个 react组件
 */
import React from 'react';
// import ReactDOM from 'react-dom';
import Vue from 'vue';
// import { ScopedContext, IScopedContext, RendererProps } from 'neo-core';
import { extendObject, isProxy, isVueComponent } from '../utils';

interface VueFactoryProps {
  [key: string]: any;
}

interface VueFactoryState {
  [key: string]: any;
}

export function createVue2Component(vueObj: any) {
  if (!vueObj || (typeof vueObj !== 'function' && typeof vueObj !== 'object')) {
    return;
  }

  class VueFactory extends React.Component<VueFactoryProps, VueFactoryState> {
    public domRef: React.RefObject<HTMLDivElement>;
    public vm: any;
    public isUnmount: boolean;

    // 指定 contextType 读取当前的 scope context。
    // React 会往上找到最近的 scope Provider，然后使用它的值。
    // static contextType = ScopedContext; // 待支持

    constructor(props: VueFactoryProps, context: any) {
      super(props);
      this.domRef = React.createRef<HTMLDivElement>();
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
      let neoFunc: any = {};
      let neoData: any = {};
      let neoMSTData: any = {};

      Object.keys(this.props).forEach((key) => {
        const value = this.props[key];
        if (typeof value === 'function') {
          neoFunc[key] = value;
        } else if (isProxy(value)) {
          neoMSTData[key] = value;
        } else {
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
      } else {
        console.warn('自定义组件暂不支持reload动作。');
      }
    }

    /**
     * 事件动作处理:
     * 在这里设置自定义组件对外暴露的动作，其他组件可以通过组件动作触发自定义组件的对应动作
     */
    doAction(action: any, args: object) {
      if (this.vm && this.vm.doAction) {
        this.vm.doAction(action, args);
      } else {
        console.warn('自定义组件中不存在 doAction。');
      }
    }

    render() {
      return <div ref={this.domRef}></div>;
    }
  }

  return VueFactory;
}

// 自动识别并转换 vue 组件
export function autoConvertVueComponent(component: any) {
  if (isVueComponent(component)) {
    return createVue2Component(component);
  }
  return component;
}
