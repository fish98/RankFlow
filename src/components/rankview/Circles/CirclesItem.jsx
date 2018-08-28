import React, {Component} from 'react'
import * as d3 from 'd3'
import Global from '../../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'
import {Tooltip} from 'antd'

@observer
class CirclesItem extends Component {
    constructor(props) {
        super(props)
        this.compute = d3.interpolate(d3.rgb(255, 0, 0), d3.rgb(242, 117, 162))
        this.circleNodes = null
        this.onVisibleChange = this.onVisibleChange.bind(this)
    }

    onMouseOver(e) {
        Global.setOverNode(e.target.getAttribute('name'))
        Global.setOverYear(e.target.getAttribute('year'))
        Global.setOverType(e.target.getAttribute('type'))
    }

    onMouseOut(e) {
        Global.setOverNode(null)
        Global.setOverYear(null)
        Global.setOverType(null)
    }

    onClick(e) {
        let name = e.target.getAttribute('name')
        let year = e.target.getAttribute('year')
        let type = e.target.getAttribute('type')

        if (Global.selectNode === name) {
            name = null
            year = null
            type = null
            Global.setRankHeight(1040)
        } else {
            Global.setRankHeight(588)
        }
        Global.setSelectNode(name)
        Global.setClickYear(year)
        Global.setSelectType(type)
    }

    onVisibleChange(e) {

    }

    render() {
        const {year, data, type} = this.props
        const propsData = data
        return (
            <g transform={`translate(${Global.subWidth},${ Global.diffHeight})`}>                {
                Object.keys(propsData.circlePos[year]).map(name => {
                    const data = propsData.circlePos[year][name]
                    const linear = d3.scaleLinear()
                        .domain([Math.sqrt(Global.minVar), Math.sqrt(Global.maxVar)])
                        .range([0, 1])
                    const fill = this.compute(linear(propsData.yearData[year].obj[name].varianceSqrt_per))
                    let circleNode = null
                    let hisMouseOverF = false
                    if (Global.overYear === year && Global.overType === String(type)) {
                        circleNode = <div>
                            {name}<br/>
                            mean_rank:{propsData.yearData[year].obj[name].mean_rank}({propsData.yearData[year].obj[name].mean_rank_per.toFixed(2).slice(2, 4) + '%'})
                        </div>
                    } else if (Global.overType === String(type)) {
                        circleNode =
                            <div>{propsData.yearData[year].obj[name].mean_rank}({propsData.yearData[year].obj[name].mean_rank_per.toFixed(2).slice(2, 4) + '%'})</div>
                    }

                    if (Global.overType === String(type) && ((Global.overLayer !== null && Global.overYear === year)) && propsData.hisDataObj[year][Global.overLayer].nameData.hasOwnProperty(data.layer) && propsData.hisDataObj[year][Global.overLayer].nameData[data.layer].hasOwnProperty(name)) {
                        circleNode = Object.entries(propsData.hisDataObj[year][Global.overLayer].nameData[data.layer][name]).map(e => {
                            const str = (e[1] / Global.maxRank[year]).toFixed(2).slice(2, 4) + '%'

                            return <div key={`${year}_${name}_${e[0]}`}>{e[0]}:{e[1]}({str})</div>
                        })
                        hisMouseOverF = true
                    }
                    let hisMouseClickF = false
                    if (Global.clickType === String(type) && ((Global.clickLayer !== null && Global.clickYear === year)) && propsData.hisDataObj[year][Global.clickLayer].nameData.hasOwnProperty(data.layer) && propsData.hisDataObj[year][Global.clickLayer].nameData[data.layer].hasOwnProperty(name)) {
                        circleNode = Object.entries(Global.hisDataObj[year][Global.clickLayer].nameData[data.layer][name]).map(e => {
                            const str = (e[1] / Global.maxRank[year]).toFixed(2).slice(2, 4) + '%'
                            return <div key={`${year}_${name}_${e[0]}`}>{e[0]}:{e[1]}({str})</div>
                        })
                        hisMouseClickF = true
                    }

                    let placement = 'top'
                    if (hisMouseOverF || hisMouseClickF) {
                        placement = 'right'
                    }
                    const stroke = ((Global.overNode === name && Global.overType === String(type)) || hisMouseOverF) ? 'gray' : 'black'
                    const strokeWidth = ((Global.overNode === name && Global.overType === String(type)) || Global.selectNode === name || hisMouseOverF || hisMouseClickF) ? 2 : 0
                    //     const rankName  = Global.hisDataObj[year][data.layer]
                    //     const rank = Global.hisDataObj[year][data.layer].obj[name]
                    //     circleNode = <div>Global.overLayer<div>
                    // }


                    return <g key={`${year}_${name}`}>
                        {/*<Tooltip key={`${year}_${name}`}*/}
                            {/*// visible={Global.overNode === name || hisMouseOverF || hisMouseClickF}*/}
                                 {/*visible={Global.overNode === name && Global.overType === String(type)}*/}
                                 {/*mouseLeaveDelay={0}*/}
                                 {/*title={circleNode}*/}
                                 {/*placement={placement}*/}
                                 {/*onVisibleChange={this.onVisibleChange}*/}
                        {/*>*/}
                            <circle key={`${year}_${name}`} cy={data.cy} r={Global.rankR} cx={data.cx}
                                    type={type}
                                    name={name}
                                    year={year}
                                    layer={data.layer}
                                    onMouseOver={this.onMouseOver}
                                    onMouseOut={this.onMouseOut}
                                    onClick={this.onClick}
                                    fill={fill}
                                    stroke={stroke}
                                    strokeWidth={strokeWidth}
                            />
                        {/*</Tooltip>*/}
                    </g>
                })
            }
            </g>
        )
    }
}

export default CirclesItem
