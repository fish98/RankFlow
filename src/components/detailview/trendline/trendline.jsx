import React, { Component } from 'react';
import * as d3 from 'd3';
import './trendline.less'


class TrendLine extends Component {
    constructor() {
        super();
        console.log('TrendLine Init');
    }
    render() {
        return (
            <g>{
                Object.entries(this.props.data).map(data => {
                    let key = data[0];
                    let {xScale, yScale} = this.props;
                    let curve = d3.line()
                        .curve(d3.curveCardinal)
                        .x(function (d) {return xScale(d.x);})
                        .y(function (d) {return yScale(d.y)});
                    
                    let lines = [], tmp = [];
                    data[1].forEach((e, i) => {
                        if(e == -1) {
                            if(tmp.length) lines.push(tmp);
                            tmp = [];
                        } else {
                            tmp.push({
                                x: i,
                                y: e
                            });
                        }
                    })
                    if(tmp.length) lines.push(tmp);
                    
                    return <g key={key}>{
                        lines.map((line, i) => {
                            return <g key={i}>
                                <path className="trend-line" d={curve(line)}></path>
                                {
                                    line.map(point => {
                                        return (
                                            <g key={point.x}>
                                                <circle cx={xScale(point.x)} cy={yScale(point.y)} className="trend-point"></circle>
                                            </g>
                                        )
                                    })
                                }
                            </g>
                        })
                    }</g>
                })
            }</g>
        );
    }
}

export default TrendLine;
