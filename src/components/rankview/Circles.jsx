import React, {Component} from 'react'
import Global from "../Store/Global"
import CirclesItem from "./CirclesItem"

class Circles extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <g name={'Circles'}>
                {Global.yearArr.map(year => {
                    return <g key={year} year={year} transform={`translate(${Global.axisPos[year]})`}>
                        {Global.circlePos.hasOwnProperty(year) ? <CirclesItem key={year} year={year}/> : null}
                    </g>
                })}
            </g>
        )
    }
}

export default Circles
