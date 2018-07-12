import React, { Component } from 'react';
import * as d3 from 'd3';
import lasso from '../../../libs/lassoV2.js';
import './scatter.less';
import Global from '../.././Store/Global'
import {observer} from 'mobx-react'
@observer
class Scatter extends Component {
    constructor(props) {
        super();
        console.log('Scatter Init', props);

        this.svg = null;
        this.circleMap = {};
        this.zoom = null;
        this.lasso = null;
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
        console.log('Scatter Will Receive Props: ', props);
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
                id: d.id,
                x: xScale(d.x),
                y: yScale(d.y)
            })),
            xScale: xScale,
            yScale: yScale
        });
    }

    componentDidUpdate() {
        console.log('Scatter Did Update: ', this.props);
        var nodes = d3.selectAll('#scatter-point-g .scatter-point').data(this.state.data);
        console.log(nodes.data());
        this.lasso.items(nodes.data());
    }

    componentDidMount() {
        let self = this;
        console.log('Scatter Did Mount: ', self.props);
        
        self.zoom = d3.zoom().on('zoom', zoomed);
        
        self.lasso = lasso().area(d3.select(self.svg))
            .on("start", lasso_start)
            .on("draw", lasso_draw)
            .on("end", lasso_end);

        d3.select(self.svg).call(self.lasso);

        function lasso_start () {
            self.lasso.items().forEach(item => {
                d3.select(self.circleMap[item.id])
                    .classed("selected", false);
            });
        }

        function lasso_draw () {
            self.lasso.possibleItems().forEach(item => {
                d3.select(self.circleMap[item.id])
                    .classed("possible", true);
            });
        
            self.lasso.notPossibleItems().forEach(item => {
                d3.select(self.circleMap[item.id])
                    .classed("possible", false);
            });
        }
        
        function lasso_end () {
            console.log(self.lasso.selectedItems());
            let nodes = [], ids = []
            self.lasso.selectedItems().forEach(item => {
                ids.push(item.id)
            })
            
            const names = Object.keys(Global.rankData)
            ids.forEach(id=>{
                nodes.push(names[id])
            })
            Global.setNodes(nodes)
            console.log(ids)
            
            self.lasso.items().forEach(item => {
                d3.select(self.circleMap[item.id])
                    .classed("possible", false);
            });
            
            self.lasso.selectedItems().forEach(item => {
                d3.select(self.circleMap[item.id])
                    .classed("selected", true);
            });
        }

        function zoomed () {
            let transform = d3.event.transform;
            let newXScaleFunc = transform.rescaleX(self.state.xScale),
                newYScaleFunc = transform.rescaleY(self.state.yScale)
                self.setState({
                    data: self.state.originData.map(d => ({
                        id: d.id,
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
                <g id="scatter-point-g">{
                    this.state.data.map(d => <circle className='scatter-point' key={d.id} cx={d.x} cy={d.y} ref={circle => this.circleMap[d.id] = circle}></circle>)
                }</g>
            </svg>
        );
    }
}

export default Scatter;