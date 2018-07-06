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
            x:1000,
            height:1000,
            each_width:100
        }
        console.log(props.x)
        this.diffHieght = 15
        this.diffWidth = 30

    }

    componentWillReceiveProps(props){
        this.setState({
            data: props.data,
            year: props.year,
            x: props.x,
            height:props.height,
            each_width:props.each_width
        })
    }
    render() {
        return (
            <g transform={`translate(${this.state.x})`}>
                <Time data={this.state.year}/>
                <g transform={`translate(0,${ this.diffHieght})`}>
                <Histogram data={this.state.data} each_width = {this.state.each_width-this.diffWidth} layer={20} height={this.state.height- this.diffHieght}/>
                </g>
            </g>
            // {/*<Time/>*/}
            // {/*<Histograom/>*/}
            // {/*<RankAxis/>*/}
        )
    }
}

export default RankItems
