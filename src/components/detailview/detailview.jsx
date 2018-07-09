import React, { Component } from 'react';
import * as d3 from 'd3';
import { Row, Col } from 'antd';
import TimeAxis from './timeaxis/timeaxis';
import Violin from './violin/violin';
import TrendLine from './trendline/trendline';
import './detailview.less';
import {toJS} from 'mobx'
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

    violinData(timeAxises, violinData, maxRank) {
        let result = [];
        timeAxises.forEach(((timeAxis, index) => {
            let {year, width, x} = timeAxis
            if(year in violinData) {
                result[index] = {
                    year: year,
                    x: x,
                    width: width,
                    data: violinData[year],
                    maxRank: maxRank[year]
                }
            }
        }));
        
        return result;
    }

    trendData(years, violinData, maxRank) {
        let result = {};
        years.forEach((year, index) => {
            if(year in violinData) {
                for(let key in violinData[year]) {
                    if(!result[key]) {
                        result[key] = new Array(years.length);
                    }
                    result[key][index] = [violinData[year][key], violinData[year][key] / maxRank[year] * 100];
                }
            }
        })

        return result;
    }

    timeAxises(years, axises, maxRank) {
        var axisWidth = axises[years[1]] - axises[years[0]];
        let timeAxises = years.map((year, index) => {
            let x = axises[year];
            return {
                width: axisWidth,
                x: x,
                year: year,
                max: maxRank[year]
            }
        });
        
        return timeAxises;
    }
    
    componentWillReceiveProps(props) {
        console.log('Detail Will Receive Props: ',props);
        if(props.data && props.axis && props.maxRank) {
            let svgContainer = document.getElementsByClassName('detail-wrapper-content')[0];
            let svgHeight = svgContainer.clientHeight;
            let svgWidth = svgContainer.clientWidth;
            
            let topPadding = 20, bottomPadding = 20;

            var years = Object.keys(props.axis).sort((a, b) => a - b);
            var axisPos = years.map(year => props.axis[year]);

            var xScale = d3.scaleOrdinal()
                .domain(axisPos.map((a, i) => i))
                .range(axisPos);
            var yScale = d3.scaleLinear()
                .domain([0, 100])
                .range([topPadding, svgHeight - bottomPadding]);
            
            var timeAxises = this.timeAxises(years, props.axis, props.maxRank);
            var violinData = this.violinData(timeAxises, props.data, props.maxRank);
            var trendData = this.trendData(years, props.data, props.maxRank);
            
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
        console.log('Detail Did Update: ', this.props);
    }

    componentDidMount() {
        console.log('Detail Did Mount: ', this.props);
    }

    render() {
        console.log('Detail Render');
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
                        <TimeAxis 
                            timeAxises={this.state.timeAxises}
                            xScale={this.state.xScale}
                            yScale={this.state.yScale}>
                        </TimeAxis>
                        <Violin
                            violinData={this.state.violinData}
                            xScale={this.state.xScale}
                            yScale={this.state.yScale}>
                        </Violin>
                        <TrendLine
                            data={this.state.trendData}
                            xScale={this.state.xScale}
                            yScale={this.state.yScale}>
                        </TrendLine>
                    </svg>
                </div>
            </div>
        );
    }
}

export default DetailView;