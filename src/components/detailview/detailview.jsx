import React, { Component } from 'react';
import * as d3 from 'd3';
import { Row, Col } from 'antd';
import TimeAxis from './timeaxis/timeaxis';
import Violin from './violin/violin';
import TrendLine from './trendline/trendline';
import './detailview.less';

class DetailView extends Component {
    constructor() {
        super();
        console.log('DetailView Init');
        this.state = {
            svgHeight: 0,
            svgWidth: 0,
            timeAxises: [],
            violinData: [],
            trendData: {},
            xScale: null,
            yScale: null
        }
    }
    
    componentWillReceiveProps(props) {
        console.log('Detail Will Receive Props: ', props);
        if(props.data && props.axis) {
            let svgContainer = document.getElementsByClassName('detail-wrapper-content')[0];
            let svgHeight = svgContainer.clientHeight;
            let svgWidth = svgContainer.clientWidth;
            
            let topPadding = 20, bottomPadding = 10;

            var maxValue = Object.values(props.data).reduce((max, data) => {
                return Math.max(d3.max(Object.values(data)))
            }, 0)

            var years = Object.keys(props.axis).sort((a, b) => a - b);
            var axisPos = years.map(year => props.axis[year]);
            var axisWidth = props.axis[years[1]] - props.axis[years[0]];

            var xScale = d3.scaleOrdinal().domain(axisPos.map((a, i) => i)).range(axisPos);
            var yScale = d3.scaleLinear().domain([0, maxValue]).range([topPadding, svgHeight - topPadding - bottomPadding])

            let violinData = [], trendData = {};
            let timeAxises = years.map((year, index) => {
                let x1 = props.axis[year], x2 = x1;
                let y1 = topPadding, y2 = svgHeight - bottomPadding;
                
                if(year in props.data) {
                    violinData[index] = {
                        year: year,
                        x: x1,
                        y: topPadding,
                        height: svgHeight - topPadding - bottomPadding,
                        width: axisWidth,
                        data: props.data[year],
                        max: maxValue
                    }
                    for(let key in props.data[year]) {
                        if(!trendData[key]) {
                            trendData[key] = new Array(years.length).fill(-1);
                        }
                        trendData[key][index] = props.data[year][key];
                    }
                }

                return {
                    width: axisWidth,
                    x1: x1,
                    x2: x2,
                    y1: y1,
                    y2: y2,
                    text: year
                }
            });

            this.setState({
                svgWidth: svgWidth,
                svgHeight: svgHeight,
                timeAxises: timeAxises,
                violinData: violinData,
                trendData: trendData,
                xScale: xScale,
                yScale: yScale
            })
        }
    }

    componentDidUpdate() {
        console.log('Detail Did Mount: ', this.props);
    }

    componentDidMount() {
        console.log('Detail Did Mount: ', this.props);
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
                    <svg height={this.state.svgHeight} width={this.state.svgWidth}>
                        <TimeAxis timeAxises={this.state.timeAxises}></TimeAxis>
                        <Violin violinData={this.state.violinData}></Violin>
                        <TrendLine data={this.state.trendData} xScale={this.state.xScale} yScale={this.state.yScale}></TrendLine>
                    </svg>
                </div>
            </div>
        );
    }
}

export default DetailView;