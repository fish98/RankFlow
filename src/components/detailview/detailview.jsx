import React, { Component } from 'react';
import { Row, Col } from 'antd';
import TimeAxis from './timeaxis'
import './detailview.less';

class DetailView extends Component {
    constructor() {
        super();
        console.log('DetailView Init');
    }
    componentWillReceiveProps(props) {
        console.log(props.data);
        // this.setState({
        //     data: props.data
        // })
    }
    componentDidUpdate() {

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
                    <svg>
                        {/* <TimeAxis></TimeAxis> */}
                    </svg>
                </div>
            </div>
        );
    }
}

export default DetailView;
