import React, {Component} from 'react'
import * as d3 from 'd3'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'

@observer
class Line extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <g transform={`translate(${-Global.eachWidth-15},${ Global.diffHeight})`}>
                {this.props.data.map(d => {
                    return <line key={d.name} x1={d.source.x} y1={d.source.y} x2={d.target.x} y2={d.target.y}
                                 strokeWidth={2} stroke={'red'}/>
                })}
            </g>
        )
    }
}

export default Line
