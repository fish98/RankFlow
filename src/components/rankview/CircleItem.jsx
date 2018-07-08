import React, {Component} from 'react'
import * as d3 from 'd3'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'

@observer
class CircleItem extends Component {
    constructor(props) {
        super(props)
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
            <g transform={`translate(-15,${ Global.diffHeight})`}>
                {
                    Object.keys(Global.circlePos[year]).map(name => {
                        const data = Global.circlePos[year][name]
                        return <circle key={`${year}_${name}`} cy={data.cy} r={Global.rankR} cx={data.cx}
                                       name={name}
                                       onMouseOver={this.onMouseOver}
                                       onMouseOut={this.onMouseOut}
                                       onClick={this.onClick}
                                       fill={'rgba(255,77,79,0.8)'}/>
                    })
                }
            </g>
        )
    }
}

export default CircleItem
