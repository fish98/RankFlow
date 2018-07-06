import React, {Component} from 'react'
import * as d3 from 'd3'

class Histogram extends Component {
    constructor(props) {
        super(props)
        this.state={
            each_width:props.each_width,
            height:props.height,
            layer:props.layer
        }
    }
    dealHistogram(data){

    }
    componentWillReceiveProps(props) {
        this.setState({
            each_width:props.each_width,
            height:props.height,
            layer:props.layer
        })
        this.count = props.data.arr.length
        this.scaleX = d3.scaleLinear().range([props.each_width, 0])
    }

    render() {
        return (
            <g>
                {Array(this.state.layer).fill(1).map((d, i) => {
                    return <rect key={i} width={this.state.each_width - 5}
                                 height={this.state.height / this.state.layer - 2}
                                 y={i * this.state.height / this.state.layer}/>
                })
                }
            </g>
        )
    }
}

export default Histogram
