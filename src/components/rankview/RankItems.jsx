import React, {Component} from 'react'
import './rankview.less'
import TimesItem from './TimesItem'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'
import Histograms from "./HistogramsItem"
import CirclesItem from './CirclesItem'
import LinesItem from './LinesItem'

@observer
class RankItems extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const year = this.props.year
        return (
            <g transform={`translate(${this.props.x})`}>
                <TimesItem year={year}/>
                {Global.linePos.hasOwnProperty(year) ? <LinesItem year={year}/> : null}
                {Global.hisData.hasOwnProperty(year) ? <Histograms year={year}/> : null}
                {Global.circlePos.hasOwnProperty(year) ? <CirclesItem year={year}/> : null}
            </g>
        )
    }
}

export default RankItems
