import React, { Component } from 'react';

class TimeAxis extends Component {
    constructor() {
        super();
        console.log('TimeAxis Init');
    }
    render() {
        return (
            <g>{
                this.props.timeAxises.map(axis => {
                    return <g>
                        <text>{axis.text}</text>
                        <line className="time-axis" x0={0} y0={0} x1={0} y1={0}></line>
                    </g>
                })
            }</g>
        );
    }
}

export default TimeAxis;
