import React, {Component} from 'react'
import * as d3 from 'd3'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'

@observer
class LinesItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const year = this.props.year
        return (
            <g transform={`translate(${-Global.eachWidth + Global.subWidth},${ Global.diffHeight})`}>
                {Object.keys(Global.linePos[year]).map(name => {
                    const data = Global.linePos[year][name]
                    let opacity = 0
                    if (Global.overNode === name)
                        opacity = 1
                    if (Global.selectNode === name)
                        opacity = 1
                    return <line key={`${year}_${name}`}
                                 x1={data.real.source.x}
                                 y1={data.real.source.y}
                                 x2={data.real.target.x}
                                 y2={data.real.target.y}
                                 strokeWidth={2} stroke={'red'} opacity={opacity}
                        // onMouseOver={this.onMouseOver}
                    />
                })}
            </g>
        )
    }
}

export default LinesItem
