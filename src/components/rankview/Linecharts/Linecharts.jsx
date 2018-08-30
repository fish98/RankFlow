import React, {Component} from 'react'
import Global from "../../Store/Global"
import {observer} from 'mobx-react'
import LinechartsItems from './LinechartsItems'

@observer
class Linecharts extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (

            <g name={'Linecharts'} transform={`translate(0,-17)`} type={this.props.type}>
                {Object.keys(this.props.data.circlePos).map(year => {
                    return <g key={year} year={year} transform={`translate(${Global.axisPos[year]})`}>
                        <LinechartsItems key={year} year={year} data={this.props.data} type={this.props.type}/>
                    </g>
                })}
            </g>
        )
    }
}

export default Linecharts
