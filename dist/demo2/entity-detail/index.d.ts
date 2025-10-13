import * as React from 'react';
import './style.scss';
interface EntityDetailProps {
    title?: string;
    xObjectDetailApi?: {
        xObjectApiKey: string;
        objectId: string;
        fieldDescList?: any[];
    };
    columnCount?: number;
    showTitle?: boolean;
    data?: any;
    entityData?: any;
}
interface FieldDescription {
    apiKey: string;
    label: string;
    type: string;
    [key: string]: any;
}
interface EntityDetailState {
    detailData: any;
    fieldDescriptions: FieldDescription[];
    loading: boolean;
    error: string | null;
}
export default class EntityDetail extends React.PureComponent<EntityDetailProps, EntityDetailState> {
    constructor(props: EntityDetailProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: EntityDetailProps): void;
    loadData(): Promise<void>;
    loadFieldDescriptions(): Promise<void>;
    loadEntityDetail(): Promise<void>;
    getFieldLabel(apiKey: string): string;
    getFieldType(apiKey: string): string;
    renderFieldValue(value: any, fieldType: string): any;
    renderDetailContent(): React.JSX.Element;
    render(): React.JSX.Element;
}
export {};
