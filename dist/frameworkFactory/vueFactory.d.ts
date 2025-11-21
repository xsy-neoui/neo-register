/**
 * 将 vue2.0 自定义组件包裹成一个 react组件
 */
import React from 'react';
interface VueFactoryProps {
    [key: string]: any;
}
interface VueFactoryState {
    [key: string]: any;
}
export declare function createVue2Component(vueObj: any): {
    new (props: VueFactoryProps, context: any): {
        domRef: React.RefObject<HTMLDivElement>;
        vm: any;
        isUnmount: boolean;
        componentDidMount(): void;
        componentDidUpdate(): void;
        componentWillUnmount(): void;
        resolveNeoProps(): {
            neoData: any;
            neoMSTData: any;
            neoFunc: any;
        };
        /**
         * reload动作处理
         */
        reload(): void;
        /**
         * 事件动作处理:
         * 在这里设置自定义组件对外暴露的动作，其他组件可以通过组件动作触发自定义组件的对应动作
         */
        doAction(action: any, args: object): void;
        render(): React.JSX.Element;
        context: any;
        setState<K extends string | number>(state: VueFactoryState | ((prevState: Readonly<VueFactoryState>, props: Readonly<VueFactoryProps>) => VueFactoryState | Pick<VueFactoryState, K> | null) | Pick<VueFactoryState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<VueFactoryProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<VueFactoryState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<VueFactoryProps>, nextState: Readonly<VueFactoryState>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<VueFactoryProps>, prevState: Readonly<VueFactoryState>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<VueFactoryProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<VueFactoryProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<VueFactoryProps>, nextState: Readonly<VueFactoryState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<VueFactoryProps>, nextState: Readonly<VueFactoryState>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
} | undefined;
export declare function autoConvertVueComponent(component: any): any;
export {};
