import React, { Component } from 'react';
import * as d3 from 'd3';
import './scatter.less';

class Scatter extends Component {
    constructor(props) {
        super();
        console.log('Scatter Init', props);

        this.svg = null;
        this.state = {
            padding: {
                left: 20,
                right: 20,
                top: 10,
                bottom: 20
            },
            originData: [],
            data: [],
            xScale: d3.scaleLinear(),
            yScale: d3.scaleLinear()
        };
    }
    
    componentWillReceiveProps(props) {
        console.log('TSNE Will Receive Props: ', props);
        let {width, height, data} = props;
        
        let xmax = -Infinity, ymax = -Infinity, xmin = Infinity, ymin = Infinity;
        data.forEach(d => {
            xmin = Math.min(xmin, d.x);
            xmax = Math.max(xmax, d.x);
            ymin = Math.min(ymin, d.y);
            ymax = Math.max(ymax, d.y);
        });
        
        let {left, right, top, bottom} = this.state.padding;
        let xScale = d3.scaleLinear().domain([xmin, xmax]).range([left, width - right]),
            yScale = d3.scaleLinear().domain([ymin, ymax]).range([top, height - bottom]);
        
        this.setState({
            originData: data,
            data: data.map(d => ({
                x: xScale(d.x),
                y: yScale(d.y)
            })),
            xScale: xScale,
            yScale: yScale
        });
    }

    componentDidUpdate() {
        console.log('TSNE Did Update: ', this.props);
    }

    componentDidMount() {
        let self = this;
        console.log('TSNE Did Mount: ', self.props);
        var zoom = d3.zoom().on('zoom', zoomed);
        d3.select(self.svg).call(zoom);
        function zoomed () {
            let transform = d3.event.transform;
            let newXScaleFunc = transform.rescaleX(self.state.xScale),
                newYScaleFunc = transform.rescaleY(self.state.yScale)
                self.setState({
                    data: self.state.originData.map(d => ({
                        x: newXScaleFunc(d.x),
                        y: newYScaleFunc(d.y)
                    }))
            });
        }
    }

    render() {
        console.log('Scatter Render');
        let{width, height} = this.props;
        return (
            <svg height={height} width={width} className='scatter-svg' ref={svg => this.svg=svg}>
                <g>{
                    this.state.data.map((d, i) => <circle className='scatter-point' key={i} cx={d.x} cy={d.y}></circle>)
                }</g>
            </svg>
        );
    }
}

export default Scatter;