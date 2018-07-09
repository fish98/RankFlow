import React, { Component } from 'react';
import { Row, Col } from 'antd';
import * as d3 from 'd3';
import './tsneview.less';

class TSNEView extends Component {
    constructor() {
        super();
        console.log('TSNE Init');
    }
    
    componentWillReceiveProps(props) {
        console.log('TSNE Will Receive Props: ', props);
    }

    componentDidUpdate() {
        console.log('TSNE Did Update: ', this.props);
    }

    componentDidMount() {
        console.log('TSNE Did Mount: ', this.props);
    }

    render() {
        console.log('TSNE Render');
        return (
            <div className="tsne-wrapper">
                <Row className="tsne-wrapper-title">
                    <Col span={8}></Col>
                    <Col span={8}>
                        TSNE View
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <div className="tsne-wrapper-content">
                </div>
            </div>
        );
    }
}

export default TSNEView;