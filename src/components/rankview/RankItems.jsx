import React, {Component} from 'react'
import './rankview.less'
import Time from './Time'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'
import Histogram from "./Histogram"
import Circle from './Circle'

@observer
class RankItems extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(props) {

    }


    render() {
        if (Global.hisData.hasOwnProperty(this.props.year)) {
            return (
                <g transform={`translate(${this.props.x})`}>
                    <Time year={this.props.year}/>
                    <Histogram year={this.props.year}/>
                    <Circle year={this.props.year}/>
                </g>
            )
        } else {
            return <g/>
        }
    }
}

export default RankItems
