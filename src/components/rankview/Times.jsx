import React, {Component} from 'react'
import Global from "../Store/Global"
import TimesItem from './TimesItem'

class Times extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <g name={'Times'}>
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
