import React, {Component} from 'react'
import './rankview.less'
import Time from './Time'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'
import Histogram from "./Histogram"
import Circle from './Circle'
import Line from './Line'

@observer
class RankItems extends Component {
    constructor(props) {
        super(props)
        this.getLine = this.getLine.bind(this)
        this.state=({
            lineData:[]
        })
    }


    componentWillReceiveProps(props) {

    }
    getLine(data){
        const line = this.props.getCirclePos(data)
        this.setState({
            lineData:line
        })
    }


    render() {
        if (Global.hisData.hasOwnProperty(this.props.year)) {
            return (
                <g transform={`translate(${this.props.x})`}>
                    <Time year={this.props.year}/>
                    <Histogram year={this.props.year}/>
                    <Circle year={this.props.year} getCirclePos={this.getLine}/>
                    <Line data={this.state.lineData}/>
                </g>
            )
        } else {
            return <g/>
        }
    }
}

export default RankItems
