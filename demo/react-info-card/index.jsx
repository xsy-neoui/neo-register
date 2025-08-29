import * as React from 'react';
import './style.scss';

export default class InfoCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.agreeDataFormat = this.agreeDataFormat.bind(this);
  }
  agreeDataFormat(agreeData) {
    if (agreeData && agreeData <= 9999) {
      return agreeData;
    }
    if (agreeData && agreeData > 9999) {
      return `${Math.floor(agreeData / 1000) / 10}w`;
    }
  }
  render() {
    const { title, backgroundImage, img_count, comment_count } = this.props;
    const curBackgroundImage =
      backgroundImage ||
      'https://neo-widgets.bj.bcebos.com/NeoCRM.jpg';
    return (
      <div className="news-card">
        <div className="news-title">
          {title ||
            '营销服全场景智能CRM，帮助企业搭建数字化客户经营平台，实现业绩高质量增长。'}
        </div>
        <div className="item-imgbox">
          <div
            className="news-img"
            style={{ backgroundImage: `url(${curBackgroundImage})` }}
          ></div>
          {img_count > 0 && <div className="img-count">{img_count}</div>}
        </div>
        <div className="news-info">
          <div className="left media-mark">NeoCRM · 低代码平台</div>
          {comment_count && comment_count > 0 && (
            <div className="cmt-num right">
              {this.agreeDataFormat(comment_count)}评
            </div>
          )}
        </div>
      </div>
    );
  }
}
