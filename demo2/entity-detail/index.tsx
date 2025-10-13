import * as React from 'react';
import {
  Card,
  Row,
  Col,
  Spin,
  Empty,
  Descriptions,
  Button,
  Tag,
  Divider,
  Typography,
} from 'antd';
import {
  ReloadOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
// @ts-ignore
import { xObject } from 'neo-open-api'; // Neo OpenAPI SDK
import './style.scss';

const { Title, Text } = Typography;

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

export default class EntityDetail extends React.PureComponent<
  EntityDetailProps,
  EntityDetailState
> {
  constructor(props: EntityDetailProps) {
    super(props);

    this.state = {
      detailData: {},
      fieldDescriptions: [],
      loading: false,
      error: null,
    };

    this.loadEntityDetail = this.loadEntityDetail.bind(this);
    this.loadFieldDescriptions = this.loadFieldDescriptions.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: EntityDetailProps) {
    const { xObjectDetailApi } = this.props;
    if (
      xObjectDetailApi?.xObjectApiKey !==
        prevProps.xObjectDetailApi?.xObjectApiKey ||
      xObjectDetailApi?.objectId !== prevProps.xObjectDetailApi?.objectId
    ) {
      this.loadData();
    }
  }

  async loadData() {
    const { xObjectDetailApi } = this.props;
    if (!xObjectDetailApi?.xObjectApiKey || !xObjectDetailApi?.objectId) {
      this.setState({
        error: '缺少必要参数：实体类型或业务数据ID',
        loading: false,
      });
      return;
    }

    await Promise.all([this.loadFieldDescriptions(), this.loadEntityDetail()]);
  }

  async loadFieldDescriptions() {
    const { xObjectDetailApi } = this.props || {};

    // 方式一：直接从 props.xObjectDetailApi 中获取字段描述（当开启「自动获取数据」时可用）
    if (xObjectDetailApi && xObjectDetailApi.fieldDescList) {
      this.setState({ fieldDescriptions: xObjectDetailApi.fieldDescList });
    }

    /*
    // 方式二：自行通过 OpenAPI SDK 获取字段描述
    if (!xObjectDetailApi.xObjectApiKey) return;
    try {
      const result = await xObject.getDesc(xObjectDetailApi.xObjectApiKey);
      if (result?.status) {
        const fields = result.data?.fields || [];
        this.setState({ fieldDescriptions: fields });
      }
    } catch (error: any) {
      console.error('获取字段描述失败:', error);
    }
    */
  }

  async loadEntityDetail() {
    const xObjectDetailApi: any = this.props.xObjectDetailApi || {};
    if (!xObjectDetailApi.xObjectApiKey || !xObjectDetailApi.objectId) return;

    // 方式一：直接从 props 中取实体数据源相关数据
    const { entityData: detailData } = this.props;
    if (detailData) {
      this.setState({ detailData });
    }

    /*
    // 方式一：使用 Neo Open API SDK 获取详情数据
    this.setState({ loading: true, error: null });

    try {
      const result = await xObject.get(xObjectDetailApi);

      if (result?.status) {
        const data = result.data || {};
        this.setState({
          detailData: data,
          loading: false,
        });
      } else {
        this.setState({
          error: result?.msg || '获取详情数据失败',
          loading: false,
        });
      }
    } catch (error: any) {
      this.setState({
        error: error.message || '获取详情数据失败',
        loading: false,
      });
    }
    */
  }

  getFieldLabel(apiKey: string): string {
    const { fieldDescriptions } = this.state;
    const field = fieldDescriptions.find((f) => f.apiKey === apiKey);
    return field?.label || apiKey;
  }

  getFieldType(apiKey: string): string {
    const { fieldDescriptions } = this.state;
    const field = fieldDescriptions.find((f) => f.apiKey === apiKey);
    return field?.type || 'text';
  }

  renderFieldValue(value: any, fieldType: string) {
    if (value === null || value === undefined || value === '') {
      return <Text type="secondary">-</Text>;
    }

    // 根据字段类型渲染不同的值
    switch (fieldType) {
      case 'boolean':
        return value ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            是
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="default">
            否
          </Tag>
        );
      case 'date':
      case 'datetime':
        return new Date(value).toLocaleString('zh-CN');
      case 'number':
      case 'currency':
      case 'percent':
        return typeof value === 'number'
          ? value.toLocaleString('zh-CN')
          : value;
      case 'url':
        return (
          <a href={value} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        );
      case 'email':
        return <a href={`mailto:${value}`}>{value}</a>;
      case 'phone':
        return <a href={`tel:${value}`}>{value}</a>;
      default:
        return String(value);
    }
  }

  renderDetailContent() {
    const { detailData } = this.state;
    const { columnCount = 3 } = this.props;

    if (!detailData || Object.keys(detailData).length === 0) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="暂无详情数据"
        />
      );
    }

    // 过滤系统字段和空字段
    const displayFields = Object.keys(detailData).filter(
      (key) =>
        // 可以根据需要自定义过滤规则
        !key.startsWith('_') && detailData[key] !== undefined,
    );

    // 将字段分成多组，每组对应一列
    const fieldsPerColumn = Math.ceil(displayFields.length / columnCount);
    const columnGroups: string[][] = [];

    for (let i = 0; i < columnCount; i++) {
      const start = i * fieldsPerColumn;
      const end = start + fieldsPerColumn;
      columnGroups.push(displayFields.slice(start, end));
    }

    return (
      <Row gutter={[24, 24]}>
        {columnGroups.map((fields, colIndex) => (
          <Col xs={24} sm={24} md={24 / columnCount} key={colIndex}>
            <Card className="detail-column-card" bordered={false} size="small">
              <Descriptions
                column={1}
                size="middle"
                bordered
                labelStyle={{
                  fontWeight: 500,
                  backgroundColor: '#fafafa',
                  width: '35%',
                }}
                contentStyle={{
                  backgroundColor: '#ffffff',
                }}
              >
                {fields.map((fieldKey) => {
                  const fieldType = this.getFieldType(fieldKey);
                  const fieldLabel = this.getFieldLabel(fieldKey);
                  const fieldValue = detailData[fieldKey];

                  return (
                    <Descriptions.Item label={fieldLabel} key={fieldKey}>
                      {this.renderFieldValue(fieldValue, fieldType)}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  render() {
    const { title, showTitle = true } = this.props;
    const { loading, error } = this.state;
    const curAmisData = this.props.data || {};
    const systemInfo = curAmisData.__NeoSystemInfo || {};
    console.log('this.props：', this.props);

    return (
      <div className="entity-detail-container">
        {showTitle && (
          <div className="detail-header">
            <div className="header-content">
              <Title level={4} className="header-title">
                <InfoCircleOutlined className="title-icon" />
                {title || '实体数据详情'}
                {systemInfo.tenantName ? (
                  <Tag color="blue" style={{ marginLeft: 8 }}>
                    {systemInfo.tenantName}
                  </Tag>
                ) : null}
              </Title>
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                onClick={this.loadEntityDetail}
                loading={loading}
                className="refresh-button"
                size="small"
              >
                刷新
              </Button>
            </div>
            <Divider style={{ margin: '12px 0' }} />
          </div>
        )}

        <div className="detail-content">
          <Spin spinning={loading} tip="加载详情数据中...">
            {error ? (
              <div className="error-container">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <div>
                      <div style={{ color: '#ff4d4f', marginBottom: 8 }}>
                        {error}
                      </div>
                      <Button type="primary" onClick={this.loadEntityDetail}>
                        重新加载
                      </Button>
                    </div>
                  }
                />
              </div>
            ) : (
              this.renderDetailContent()
            )}
          </Spin>
        </div>
      </div>
    );
  }
}
