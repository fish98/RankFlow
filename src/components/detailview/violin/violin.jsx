import React, { Component } from 'react';
import ViolinMetrics from '../../../libs/ViolinMetrics.js'
import * as d3 from 'd3';
import './violin.less'

class Violin extends Component {
    constructor() {
        super();
        console.log('Violin Init');
    }
    render() {
        return (
            <g>{
                this.props.violinData.map(violin => {
                    var {data, width, x, maxRank} = violin;
                    var statistic = new ViolinMetrics(Object.values(data).map(d => d / maxRank * 100));
                    var maxProbility = statistic.kdeData.reduce((max, d) => Math.max(max, d.x), 0)
                    var yScale = this.props.yScale;
                    var xScale = d3.scaleLinear()
                        .domain([0, maxProbility * 3 / 2])
                        .range([0, width / 2]);
                    var leftLine = d3.line()
                        .curve(d3.curveNatural)
                        .x(function (d) {return x - xScale(d.x);})
                        .y(function (d) {return yScale(d.y)});
                    var rightLine = d3.line()
                        .curve(d3.curveNatural)
                        .x(function (d) {return x + xScale(d.x);})
                        .y(function (d) {return yScale(d.y)});
                    var left = leftLine(statistic.kdeData);
                    var right = rightLine(statistic.kdeData);
                    return (<g key={violin.year}>
                        <path className="violin-path" d={left}></path>
                        <path className="violin-path" d={right}></path>
                    </g>)
                })
            }</g>
        );
    }
}

export default Violin;
