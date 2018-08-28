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
                {Object.keys(this.props.data.circlePos).map(year => {
                    return <g key={year} year={year} transform={`translate(${Global.axisPos[year]})`}>
                         <BrushesItem key={year} year={year}/>
                    </g>
                })}
            </g>
        )
    }
}

export default Brushes
