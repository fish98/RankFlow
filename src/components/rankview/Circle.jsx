import React, {Component} from 'react'
import * as d3 from 'd3'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'

@observer
class Circle extends Component {
    constructor(props) {
        super(props)
        this.circlePos = {}
    }

    dealCircleData() {
        let r = {}
        this.circlePos = {}
        const year = this.props.year
        this.circlePos[year] = {}
        Global.nodes.map(name => {
            if (!Global.yearData[year].obj.hasOwnProperty(name)) return
            const layer = Global.hisRankObj[year][name].layer
            const index = Global.hisRankObj[year][name].index
            const x = index * 2 * Global.rankR
            const layerLayer = Math.floor((x + Global.rankR) / Global.hisRankWidth)
            const y = layer * (Global.rankHeight - Global.diffHeight) / Global.layer + layerLayer * 2 * Global.rankR
            const cx = x + Global.rankR
            const cy = y + Global.rankR
            this.circlePos[year][name] = {
                val: Math.sqrt(Global.yearData[year].obj[name].variance),
                x: 0,
                y: cy,
                r: Global.rankR,
                name:name,
            }
            r[name] = {cy: cy, cx: cx}
        })
        return r
    }
    componentDidMount(){
        this.props.getCirclePos(this.circlePos)
    }
    componentDidUpdate(){
        this.props.getCirclePos(this.circlePos)
    }
    render() {
        const year = this.props.year
        if (!Global.yearData.hasOwnProperty(year)) return <g/>
        const r = this.dealCircleData()
        return (
            <g transform={`translate(-15,${ Global.diffHeight})`}>
                {
                    Global.nodes.map(name => {
                        if (!Global.yearData[year].obj.hasOwnProperty(name)) return <circle/>
                        const data = r[name]
                        return <circle key={name} cy={data.cy} r={Global.rankR} cx={data.cx}
                                       fill={'rgba(255,77,79,0.8)'}/>
                    })
                }
            </g>
        )
    }
}

export default Circle
