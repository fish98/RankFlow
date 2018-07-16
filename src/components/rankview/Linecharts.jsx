import React, {Component} from 'react'
import Global from "../Store/Global"
import {observer} from 'mobx-react'
import LinechartsItems from './LinechartsItems'

@observer
class Linecharts extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (

            <g name={'Linecharts'} transform={`translate(0,-17)`}>
                {Global.yearArr.map(year => {
                    return <g key={year} year={year} transform={`translate(${Global.axisPos[year]})`}>
                        {Global.circlePos.hasOwnProperty(year) ? <LinechartsItems key={year} year={year}/> : null}
                    </g>
                })}
            </g>
        )
    }
}

export default Linecharts
