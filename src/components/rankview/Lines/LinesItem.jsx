import React, {Component} from 'react'
import * as d3 from 'd3'
import Global from '../../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'

@observer
class LinesItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {year, data, type} = this.props
        return (
            <g transform={`translate(${-Global.eachWidth + Global.subWidth},${ Global.diffHeight})`}>
                {Object.keys(data.lineGroup[year]).map(name => {
                    const dataObj = data.lineGroup[year][name]
                    let opacity = 0
                    if (Global.overNode === name && Global.overType === String(type))
                        opacity = 1
                    if (Global.selectNode === name && Global.selectType === String(type))
                        opacity = 1
                    return <line key={`${year}_${name}`}
                                 x1={dataObj.real.source.x}
                                 y1={dataObj.real.source.y}
                                 x2={dataObj.real.target.x}
                                 y2={dataObj.real.target.y}
                                 strokeWidth={2} stroke={'red'} opacity={opacity}
                        // onMouseOver={this.onMouseOver}
                    />
                })}
            </g>
        )
    }
}

export default LinesItem
