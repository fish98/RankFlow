import React, { Component } from 'react';
import {Tooltip} from 'antd';
import * as d3 from 'd3';
import './trendline.less';

class Line extends Component {
    constructor(props) {
        super(props);
        this.circles = {};
    }
    componentDidMount() {
        console.log('Line Did Mount', this.circles);
    }

    componentDidUpdate() {
        console.log('Line Did Update', this.circles);
    }
    
    onMouseEnterHandler = (e) => {
        console.log('Enter: ', this, e.target);
        let id = e.target.id;
        if(this.circles[id]) {
            this.circles[id].state = true;
        }
        const enterEvent = new MouseEvent('mouseover', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        
        Object.values(this.circles).forEach(circle => {
            if(!circle.state) {
                circle.DOM.dispatchEvent(enterEvent);
            }
        });
    }
    onMouseOutHandler = (e) => {
        const outEvent = new MouseEvent('mouseout', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        let id = e.target.id;
        if(this.circles[id]) {
            this.circles[id].state = false;
        }
        Object.values(this.circles).forEach(circle => {
            if(circle.state) {
                circle.DOM.dispatchEvent(outEvent);
            }
        });
    }
    render() {
        let line = this.props.line, curve = this.props.curve, name = this.props.name,
            xScale = this.props.scale.xScale, yScale = this.props.scale.yScale;
        return (
            <g>
                <path className="trend-line"
                    d={curve(line)}
                    onMouseEnter={this.onMouseEnterHandler}
                    onMouseOut={this.onMouseOutHandler}>
                </path>
                {
                    line.map((point, i) => {
                        let id = `${name}-trend-point-${i}`;
                        return (
                            <g key={point.x}>
                                <Tooltip title={point.v}>
                                    <circle ref={(circle) => this.circles[id] = {
                                        DOM: circle,
                                        state: false
                                    }}
                                        id={id}
                                        cx={xScale(point.x)}
                                        cy={yScale(point.y)}
                                        className="trend-point"
                                        onMouseEnter={this.onMouseEnterHandler}
                                        onMouseOut={this.onMouseOutHandler}>
                                    </circle>
                                </Tooltip>
                            </g>
                        )
                    })
                }
            </g>
        );
    }
}

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
                        if(e == undefined) {
                            if(tmp.length) lines.push(tmp);
                            tmp = [];
                        } else {
                            tmp.push({
                                x: i,
                                y: e[1],
                                v: e[0]
                            });
                        }
                    })
                    if(tmp.length) lines.push(tmp);
                    
                    return <g key={key}>{
                        lines.map((line, i) => {
                            return <Line key={i}
                                name={key}
                                line={line}
                                curve={curve}
                                scale={{
                                    xScale: xScale,
                                    yScale: yScale
                                }}></Line>
                        })
                    }</g>
                })
            }</g>
        );
    }
}

export default TrendLine;