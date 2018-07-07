import React, {Component} from 'react'
import * as d3 from 'd3'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'

@observer
class Circle extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        if (!Global.yearData.hasOwnProperty(this.props.year)) return <g/>
        // this.dealData(Global.nodes)
        return (
            <g transform={`translate(-15,${ Global.diffHeight})`}>
                {
                    Global.nodes.map(name => {
                        if (!Global.yearData[this.props.year].obj.hasOwnProperty(name)) return <circle/>
                        const layer = Global.hisRankObj[this.props.year][name].layer
                        const index = Global.hisRankObj[this.props.year][name].index
                        const cy = layer * Global.rankHeight / Global.layer + Global.rankR
                        const cx = Global.rankR + index * 2 * Global.rankR
                        return <circle key={name} cy={cy} r={Global.rankR} cx={cx}
                                       fill={'rgba(255,77,79,0.8)'}/>
                    })
                }
            </g>
        )
    }
}

export default Circle
