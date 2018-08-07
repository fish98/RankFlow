import React, {Component} from 'react'
import Global from "../../Store/Global"
import CirclesItem from "./CirclesItem"
import {observer} from 'mobx-react'

@observer
class Circles extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <g name={'Circles'} type={this.props.type}>
                {Global.yearArr.map(year => {
                    return <g key={year} year={year} transform={`translate(${Global.axisPos[year]})`}>
                        {this.props.data.circlePos.hasOwnProperty(year) ? <CirclesItem
                            key={year}
                            year={year}
                            data={this.props.data}
                            type={this.props.type}/> : null}
                    </g>
                })}
            </g>
        )
    }
}

export default Circles