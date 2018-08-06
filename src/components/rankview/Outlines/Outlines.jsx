import React, {Component} from 'react'
import Global from "../../Store/Global"
import OutlinesItems from "./OutlinesItems"
import {observer} from 'mobx-react'
import {Object} from 'core-js'

@observer
class Outlines extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <g name={'outlines'} type={this.props.type}>{
                Global.yearArr.map(year => {
                    return <g key={year} year={year} transform={`translate(${Global.axisPos[year]})`}>
                        {this.props.data.circlePos.hasOwnProperty(year) ?
                            <OutlinesItems key={year}
                                           data={this.props.data}
                                           type={this.props.type}
                                           year={year}/> : null}
                    </g>
                })}
            </g>
        )
    }
}

export default Outlines
