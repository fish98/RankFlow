import React, {Component} from 'react'
import Global from "../Store/Global"
import LinesItem from "./LinesItem"
import {observer} from 'mobx-react'
@observer
class Lines extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <g name={'Lines'}>
                {Global.yearArr.map(year => {
                    return <g key={year} year={year} transform={`translate(${Global.axisPos[year]})`}>
                        {Global.linePos.hasOwnProperty(year) ? <LinesItem key={year} year={year}/> : null}
                    </g>
                })}
            </g>
        )
    }
}

export default Lines
