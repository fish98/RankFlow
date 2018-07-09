import React, { Component } from 'react';
import {Tooltip} from 'antd';
import * as d3 from 'd3';
import './trendline.less';

class Line extends Component {
    constructor(props) {
        super(props);
        this.hoverCount = 0;
        this.state = {
            isHover: false,
            circles: {}
        }
    }
    componentDidMount() {
        console.log('Line Did Mount', this.circles);
    }

    componentDidUpdate() {
        console.log('Line Did Update', this.circles);
    }
    
    onMouseEnterHandler = (e) => {
        let id = e.target.id;
        if(this.state.circles[id]) {
            this.state.circles[id].state = true;
        }
        const enterEvent = new MouseEvent('mouseover', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        
        console.log('Enter: ', this.state.circles);

        let circlesArray = Object.values(this.state.circles);
        circlesArray.forEach(circle => {
            if(!circle.state) {
                circle.DOM.dispatchEvent(enterEvent);
            }
        });
        if(!this.state.isHover) {
            this.setState({
                isHover: true
            });
        }
    }
    onMouseOutHandler = (e) => {
        const outEvent = new MouseEvent('mouseout', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        let id = e.target.id;
        if(this.state.circles[id]) {
            this.state.circles[id].state = false;
        }

        console.log('Out: ', this.state.circles);

        Object.values(this.state.circles).forEach(circle => {
            if(circle.state) {
                circle.DOM.dispatchEvent(outEvent);
            }
        });
        if(this.state.isHover) {
            this.setState({
                isHover: false
            });
        }
    }
    render() {
        let line = this.props.line, curve = this.props.curve, name = this.props.name,
            xScale = this.props.scale.xScale, yScale = this.props.scale.yScale;
        return (
            <g>
                <path className={this.state.isHover ? "trend-line-hover" : "trend-line"}
                    d={curve(line)}
                    onMouseEnter={this.onMouseEnterHandler}
                    onMouseOut={this.onMouseOutHandler}>
                </path>
                {
                    line.map((point, i) => {
                        let id = `${name}-trend-point-${i}`;
                        return (
                                <Tooltip key={point.x} title={`${name}: ${point.v}`}>
                                    <circle ref={(circle) => {
                                        this.state.circles[id] = this.state.circles[id] ? this.state.circles[id] : {
                                            DOM: circle,
                                            state: false
                                        }
                                    }}
                                        id={id}
                                        cx={xScale(point.x)}
                                        cy={yScale(point.y)}
                                        className={this.state.isHover ? "trend-point-hover" : "trend-point"}
                                        onMouseEnter={this.onMouseEnterHandler}
                                        onMouseOut={this.onMouseOutHandler}>
                                    </circle>
                                </Tooltip>
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