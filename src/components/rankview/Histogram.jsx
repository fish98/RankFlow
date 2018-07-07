import React, {Component} from 'react'
import * as d3 from 'd3'

class Histogram extends Component {
    constructor(props) {
        super(props)
        this.state={
            each_width:100,
            height:500,
            layer:0,
            data:props.data,
            his_data:props.his_data,
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            each_width:props.each_width,
            height:props.height,
            layer:props.layer,
            data:props.data,
            his_data:props.his_data,
        })
        this.count = props.data.arr.length
        this.scaleX = d3.scaleLinear().range([props.each_width, 0])
    }

    render() {
        return (
            <g>
                {Array(this.state.layer).fill(1).map((d, i) => {
                    const width = this.state.his_data[i]*(this.state.each_width)/(this.props.max_val-this.props.min_val)

                    return <rect key={i} width={width}
                                 height={this.state.height / this.state.layer - 2}
                                 y={i * this.state.height / this.state.layer}
                                fill={'rgba(24,144,255,0.6)'}
                    />
                })
                }
            </g>
        )
    }
}

export default Histogram
