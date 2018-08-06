import React, {Component} from 'react'
import Global from "../../Store/Global"
import BrushesItem from "./BrushesItem"
import {observer} from 'mobx-react'
@observer
class Brushes extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <g name={'Brush'}>
                {Global.yearArr.map(year => {
                    return <g key={year} year={year} transform={`translate(${Global.axisPos[year]})`}>
                        {Global.circlePos.hasOwnProperty(year) ? <BrushesItem key={year} year={year}/> : null}
                    </g>
                })}
            </g>
        )
    }
}

export default Brushes
