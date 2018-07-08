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
            <g transform={`translate(${-Global.eachWidth - 15},${ Global.diffHeight})`}>
                {Object.keys(Global.linePos[year]).map(name => {
                    const data = Global.linePos[year][name]
                    let opacity = 0
                    if (Global.overNode === name)
                        opacity = 1
                    if (Global.selectNode === name)
                        opacity = 1
                    return <line key={`${year}_${name}`} x1={data.source.x} y1={data.source.y} x2={data.target.x}
                                 y2={data.target.y}
                                 strokeWidth={2} stroke={'red'} opacity={opacity}
                        // onMouseOver={this.onMouseOver}
                    />
                })}
            </g>
        )
    }
}

export default LinesItem
