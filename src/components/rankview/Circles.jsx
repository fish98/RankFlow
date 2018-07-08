import React, {Component} from 'react'
import Global from "../Store/Global"
import CircleItem from "./CircleItem"

class Circles extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <g name={'Lines'}>
                {Global.yearArr.map(year => {
                    return <g key={year} year={year} transform={`translate(${Global.axisPos[year]})`}>
                        {Global.circlePos.hasOwnProperty(year) ? <CircleItem key={year} year={year}/> : null}
                    </g>
                })}
            </g>
        )
    }
}

export default Circles
