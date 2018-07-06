import React, { Component } from 'react';
import ViolinMetrics from '../../libs/ViolinMetrics.js'
import * as d3 from 'd3';
import './violin.less'

class Violin extends Component {
    constructor() {
        super();
        console.log('Violin Init');
    }
    dataToRightView(violin) {
        var {height, data, width, max} = violin;
        var statistic = new ViolinMetrics(Object.values(data));

        var xScale = d3.scaleLinear()
            .domain([0, max])
            .range([0, height]);    
        

        var yScale = d3.scaleLinear()
            .domain([0, 0.5])
            .range([0, width / 2]);

        var line = d3.line()
            .curve(d3.curveBasis)
            .y(function (d) {return xScale(d.x);})
            .x(function (d) {return yScale(d.y)});
        
        return line(statistic.kdeData);
    }
    dataToLeftView(violin) {
        var {height, data, width, max} = violin;
        var statistic = new ViolinMetrics(Object.values(data));

        var xScale = d3.scaleLinear()
            .domain([0, max])
            .range([0, height]);    
        
        var yScale = d3.scaleLinear()
            .domain([0, 0.5])
            .range([0, -width / 2]);

        var line = d3.line()
            .curve(d3.curveBasis)
            .y(function (d) {return xScale(d.x);})
            .x(function (d) {return yScale(d.y)});
        
        return line(statistic.kdeData);
    }
    render() {
        return (
            <g>{
                this.props.violinData.map(violin => {
                    return (<g key={violin.year} transform={`translate(${violin.x}, ${violin.y})`}>
                        <path className="violin-path" d={this.dataToRightView(violin)}></path>
                        <path className="violin-path" d={this.dataToLeftView(violin)}></path>
                    </g>)
                })
            }</g>
        );
    }
}

export default Violin;
