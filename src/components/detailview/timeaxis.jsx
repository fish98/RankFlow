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
                    return <g key={axis.text} className="time-axis">
                        <text x={axis.x1 - 15} y={axis.y1 / 2}>{axis.text}</text>
                        <line x1={axis.x1} y1={axis.y1} x2={axis.x2} y2={axis.y2}></line>
                    </g>
                })
            }</g>
        );
    }
}

export default TimeAxis;
