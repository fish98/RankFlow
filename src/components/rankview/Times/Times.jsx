import React, {Component} from 'react'
import Global from "../../Store/Global"
import TimesItem from './TimesItem'

class Times extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <g name={'Times'} transform={`translate(0,${Global.diffHeight-14})`}>
                {Global.yearArr.map(year => {
                    return <g key={year} year={year} transform={`translate(${Global.axisPos[year]})`}>
                        <TimesItem key={year} year={year}/>
                    </g>
                })}
            </g>
        )
    }
}

export default Times
