import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './detailview.less';

class DetailView extends Component {
    componentWillUpdate() {
        console.log(this.props.data);
    }
    componentDidUpdate() {
        console.log(this.props.data);
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div className="detail-wrapper">
                <Row className="detail-wrapper-title">
                    <Col span={8}></Col>
                    <Col span={8}>
                        Detail View
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <div className="detail-wrapper-content">
                </div>
            </div>
        );
    }
}

export default DetailView;
