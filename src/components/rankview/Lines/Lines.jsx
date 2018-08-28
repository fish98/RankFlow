import React, {Component} from 'react'
import Global from "../../Store/Global"
import LinesItem from "./LinesItem"
import {observer} from 'mobx-react'

@observer
class Lines extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <g name={'Lines'} type={this.props.type}>
                {Object.keys(this.props.data.lineGroup).map(year => {
                    return <g key={year} year={year} transform={`translate(${Global.axisPos[year]})`}>
                        <LinesItem
                            key={year}
                            data={this.props.data}
                            type={this.props.type}
                            year={year}/>
                    </g>
                })}
            </g>
        )
    }
}

export default Lines
