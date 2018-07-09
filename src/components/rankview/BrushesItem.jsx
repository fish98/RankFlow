import React, {Component} from 'react'
import * as d3 from 'd3'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'
import {Tooltip} from 'antd'

@observer
class BrushesItem extends Component {
    constructor(props) {
        super(props)
        this.compute = d3.interpolate(d3.rgb(255, 0, 0), d3.rgb(242, 117, 162))
    }

    onMouseOver(e) {
        Global.setOverNode(e.target.getAttribute('name'))
    }

    onMouseOut(e) {
        Global.setOverNode([])
    }

    onClick(e) {
        let name = e.target.getAttribute('name')
        if (Global.selectNode === name) {
            name = []
        }
        Global.setSelectNode(name)
    }

    render() {
        const year = this.props.year
        return (
            <g transform={`translate(${Global.subWidth},${ Global.diffHeight})`}>
                <rect year={year}/>
            </g>
        )
    }
}

export default BrushesItem
