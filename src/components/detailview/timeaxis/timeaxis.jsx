import React, { Component } from 'react';
import './timeaxis.less'

class TimeAxis extends Component {
    constructor() {
        super();
        console.log('TimeAxis Init');
    }
    render() {
        return (
            <g>{
                this.props.timeAxises.map(axis => {
                    let top = this.props.yScale.range()[0], bottom = this.props.yScale.range()[1];
                    return <g key={axis.year} className="time-axis">
                        <text x={axis.x} y={top - 5}>{axis.year}</text>
                        <line x1={axis.x} y1={top} x2={axis.x} y2={bottom}></line>
                        <text x={axis.x} y={bottom + 15}>{`MAX:${axis.max}`}</text>
                    </g>
                })
            }</g>
        );
    }
}

export default TimeAxis;
