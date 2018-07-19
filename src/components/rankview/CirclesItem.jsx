import React, {Component} from 'react'
import * as d3 from 'd3'
import Global from '../Store/Global'
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
    }

    onMouseOut(e) {
        Global.setOverNode(null)
        Global.setOverYear(null)
    }

    onClick(e) {
        let name = e.target.getAttribute('name')
        let year = e.target.getAttribute('year')

        if (Global.selectNode === name) {
            name = null
            year = null
            Global.setRankHeight(940)
        } else {
            Global.setRankHeight(588)

        }
        Global.setSelectNode(name)
        Global.setClickYear(year)
    }

    onVisibleChange(e) {

    }

    render() {
        const year = this.props.year
        return (
            <g transform={`translate(${Global.subWidth},${ Global.diffHeight})`}>                {
                Object.keys(Global.circlePos[year]).map(name => {
                    const data = Global.circlePos[year][name]
                    const linear = d3.scaleLinear()
                        .domain([Math.sqrt(Global.minVar), Math.sqrt(Global.maxVar)])
                        .range([0, 1])
                    const fill = this.compute(linear(Math.sqrt(Global.yearData[year].obj[name].variance)))
                    let circleNode = null
                    let hisMouseOverF = false
                    if (Global.overYear === year) {
                        circleNode = <div>
                            {name}<br/>
                            mean_rank:{Global.yearData[year].obj[name].mean_rank}({Global.yearData[year].obj[name].mean_rank_per.toFixed(2).slice(2, 4) + '%'})
                        </div>
                    } else {
                        circleNode =
                            <div>{Global.yearData[year].obj[name].mean_rank}({Global.yearData[year].obj[name].mean_rank_per.toFixed(2).slice(2, 4) + '%'})</div>
                    }

                    if (((Global.overLayer !== null && Global.overYear === year)) && Global.hisDataObj[year][Global.overLayer].nameData.hasOwnProperty(data.layer) && Global.hisDataObj[year][Global.overLayer].nameData[data.layer].hasOwnProperty(name)) {
                        circleNode = Object.entries(Global.hisDataObj[year][Global.overLayer].nameData[data.layer][name]).map(e => {
                            const str = (e[1] / Global.maxRank[year]).toFixed(2).slice(2, 4) + '%'

                            return <div key={`${year}_${name}_${e[0]}`}>{e[0]}:{e[1]}({str})</div>
                        })
                        hisMouseOverF = true
                    }
                    let hisMouseClickF = false
                    if (((Global.clickLayer !== null && Global.clickYear === year)) && Global.hisDataObj[year][Global.clickLayer].nameData.hasOwnProperty(data.layer) && Global.hisDataObj[year][Global.clickLayer].nameData[data.layer].hasOwnProperty(name)) {
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
                    //     const rankName  = Global.hisDataObj[year][data.layer]
                    //     const rank = Global.hisDataObj[year][data.layer].obj[name]
                    //     circleNode = <div>Global.overLayer<div>
                    // }


                    return <Tooltip key={`${year}_${name}`}
                        // visible={Global.overNode === name || hisMouseOverF || hisMouseClickF}
                                    visible={Global.overNode === name}
                                    mouseLeaveDelay={0}
                                    title={circleNode}
                                    placement={placement}
                                    onVisibleChange={this.onVisibleChange}
                    >
                        <circle key={`${year}_${name}`} cy={data.cy} r={Global.rankR} cx={data.cx}
                                name={name}
                                year={year}
                                layer={data.layer}
                                onMouseOver={this.onMouseOver}
                                onMouseOut={this.onMouseOut}
                                onClick={this.onClick}
                                fill={fill}
                                stroke={(Global.overNode === name || hisMouseOverF) ? 'gray' : 'black'}
                                strokeWidth={(Global.overNode === name || Global.selectNode === name || hisMouseOverF || hisMouseClickF) ? 2 : 0}
                        />
                    </Tooltip>
                })
            }
            </g>
        )
    }
}

export default CirclesItem
