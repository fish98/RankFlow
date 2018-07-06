import React, {Component} from 'react'
import {Row, Col} from 'antd'
import './rankview.less'
import Time from './Time'
import Histogram from './Histogram'

class RankItems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            year: 1000,
            x: 1000,
            height: 1000,
            each_width: 100,
            people: 100,
            layer: 0,
            his_data: [],
            r: 3,
            nodes: [],
        }
        this.diffHeight = 15
        this.diffWidth = 30
        this.layer_num = []
    }

    dealHistogram(prop_data,nodes) {
        nodes.forEach((name, i) => {
            const data = prop_data.obj[name]
            const layer = data.layer
            // data.cy =
        })
        // return data
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data,
            year: props.year,
            x: props.x,
            height: props.height,
            each_width: props.each_width,
            people: props.people,
            layer: props.layer,
            his_data: props.his_data,
            nodes: props.nodes,
        })
        this.dealHistogram(props.data,props.nodes)
    }


    render() {
        return (

            <g transform={`translate(${this.state.x})`}>
                <Time data={this.state.year}/>
                <g transform={`translate(0,${ this.diffHeight})`}>
                    {
                        this.state.his_data.map((d, i) => {
                            const width = d * (this.state.each_width) / (this.props.max_val - this.props.min_val)
                            return <rect key={i} width={width}
                                         height={this.state.height / this.state.layer - 2}
                                         y={i * this.state.height / this.state.layer}
                                         fill={'rgba(24,144,255,0.6)'}
                            />
                        })
                    }{
                    this.state.nodes.map((d, i) => {
                        const data = this.state.data.obj[d]
                        const layer = data.layer
                        const cy = layer * this.state.height / this.state.layer + this.state.r

                        return <circle key={i} cy={cy} r={this.state.r} cx={this.state.r} fill={'rgba(255,77,79,0.8)'}/>
                    })
                }
                </g>
            </g>
            // {/*<Time/>*/}
            // {/*<Histograom/>*/}
            // {/*<RankAxis/>*/}
        )
    }
}

export default RankItems
