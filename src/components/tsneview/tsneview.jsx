import React, { Component } from 'react';
import { Row, Col } from 'antd';
import * as d3 from 'd3';
import Scatter from './scatter/scatter'
import './tsneview.less';


class TSNEView extends Component {
    constructor() {
        super();
        console.log('TSNE Init');
        this.svgContainer = null;
        let randomData = new Array(100).fill(0).map((d, i) => {
            return {
                id: i,
                x: Math.random(),
                y: Math.random()
            }
        });
        this.state = {
            svgHeight: 0,
            svgWidth: 0,
            data: randomData
        };
    }
    
    componentWillReceiveProps(props) {
        console.log('TSNE Will Receive Props: ', props);
        let {svgHeight, svgWidth} = this.state;
        if(svgHeight == 0 || svgWidth == 0) {
            svgHeight = this.svgContainer.clientHeight;
            svgWidth = this.svgContainer.clientWidth;
            this.setState({
                svgHeight: svgHeight,
                svgWidth: svgWidth
            })
        }
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
                <div className="tsne-wrapper-content" ref={(div) => this.svgContainer = div}>
                    <Scatter
                        data={this.state.data}
                        height={this.state.svgHeight}
                        width={this.state.svgWidth}>
                    </Scatter>
                </div>
            </div>
        );
    }
}

export default TSNEView;