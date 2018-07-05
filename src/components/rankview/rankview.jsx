import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './rankview.less';

class RankView extends Component {
    render() {
        return (
            <div className="rank-wrapper">
                <Row className="rank-wrapper-title">
                    <Col span={8}></Col>
                    <Col span={8}>
                        Rank View
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <div className="rank-wrapper-content"></div>
            </div>
        );
    }
}

export default RankView;
