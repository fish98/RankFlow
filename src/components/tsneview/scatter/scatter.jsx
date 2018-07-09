import React, { Component } from 'react';
import * as d3 from 'd3';
import lasso from '../../../libs/d3-lasso.js';
import './scatter.less';

class Scatter extends Component {
    constructor(props) {
        super();
        console.log('Scatter Init', props);

        this.svg = null;
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
        this.lasso.items(nodes);
    }

    componentDidMount() {
        let self = this;
        console.log('Scatter Did Mount: ', self.props);
        
        self.zoom = d3.zoom().on('zoom', zoomed);
        
        self.lasso = lasso().closePathSelect(true)
            .closePathDistance(100)
            .targetArea(d3.select(self.svg))
            .on("start", lasso_start)
            .on("draw", lasso_draw)
            .on("end", lasso_end);

        d3.select(self.svg).call(self.lasso);


        function lasso_start () {
            self.lasso.items()
                .attr("r", 3.5) // reset size
                .classed("not_possible", true)
                .classed("selected", false);
        }
        function lasso_draw () {
        
            // Style the possible dots
            self.lasso.possibleItems()
                .classed("not_possible", false)
                .classed("possible", true);
        
            // Style the not possible dot
            self.lasso.notPossibleItems()
                .classed("not_possible", true)
                .classed("possible", false);
        }
        
        function lasso_end () {
            var ids = []
            console.log(self.lasso.selectedItems());
            self.lasso.selectedItems().each(item => {
                ids.push(item.id)
            })
            console.log(ids)
            // Reset the color of all dots
            self.lasso.items()
                .classed("not_possible", false)
                .classed("possible", false);
        
            // Style the selected dots
            self.lasso.selectedItems()
                .classed("selected", true)
                .attr("r", 7);
        
            // Reset the style of the not selected dots
            self.lasso.notSelectedItems()
                .attr("r", 3.5);
        
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
                    this.state.data.map((d, i) => <circle className='scatter-point' key={i} cx={d.x} cy={d.y}></circle>)
                }</g>
            </svg>
        );
    }
}

export default Scatter;