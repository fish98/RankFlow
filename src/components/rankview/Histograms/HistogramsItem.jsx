import React, {Component} from 'react'
import * as d3 from 'd3'
import Global from '../../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'
import {Tooltip} from 'antd'

@observer
class HistogramItem extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            opacity: 0,
            // stroke:'gray',
            // strokeWidth:0,
        })

    }

    onMouseOver(e) {
        const layer = e.target.getAttribute('layer')
        const year = e.target.getAttribute('year')
        const type = e.target.getAttribute('type')
        // d3.selectAll(`rect[layer="${layer}"][year="${year}"][type="${type}"]`).attr('stroke', 'gray').attr('stroke-width', 2)
        Global.setOverLayer(layer)
        Global.setOverYear(year)
        Global.setOverType(type)
        // d3.selectAll(`rect[layer="${a}"]`)
    }

    onMouseOut(e) {
        Global.setOverLayer(null)
        Global.setOverYear(null)
        const layer = e.target.getAttribute('layer')
        const year = e.target.getAttribute('year')
        const type = e.target.getAttribute('type')
        Global.setOverType(null)
        // d3.selectAll(`rect[layer="${layer}"][year="${year}"][type="${type}"]`).attr('stroke', 'gray').attr('stroke-width', 0)
    }

    onRectMouseOver = (e) => {

        const year = Number(e.target.getAttribute('year'))
        d3.selectAll(`.outLines${year}`).attr('opacity', 0)
        d3.selectAll(`.histogram${year}`).attr('opacity', 1)
    }

    onRectMouseOut = (e) => {

        const year = e.target.getAttribute('year')
        d3.selectAll(`.outLines${year}`).attr('opacity', 1)
        d3.selectAll(`.histogram${year}`).attr('opacity', 0)

    }

    onClick = (e) => {
        const layer = e.target.getAttribute('layer')
        const year = e.target.getAttribute('year')
        const type = e.target.getAttribute('type')
        d3.select(`.outLines${year}`).attr('opacity', 0)
        d3.selectAll(`.histogram${year}`).attr('opacity', 1)

        if (layer === Global.clickLayer && year === Global.clickYear) {
            Global.setClickLayer(null)
            Global.setClickYear(null)
            Global.setClickType(null)
        } else {
            Global.setClickLayer(layer)
            Global.setClickYear(year)
            Global.setClickType(type)
        }
        // d3.selectAll(`rect[year="${year}"][type="${type}"]`).attr('stroke', 'gray').attr('stroke-width', 0)
        // d3.selectAll(`rect[layer="${layer}"][year="${year}"][type="${type}"]`).attr('stroke', 'black').attr('stroke-width', 2)
    }

    render() {
        const {year, data, type} = this.props
        const {maxHisVal, minHisVal} = data
        const fill = type ? 'red' : 'rgba(24,144,255,0.6)'
        return (
            <g transform={`translate(${Global.subWidth},${ Global.diffHeight})`}
               onMouseOver={this.onRectMouseOver}
               onMouseOut={this.onRectMouseOut}
               opacity={0}
               year={year}
               className={`histogram${year}`}
            >
                {
                    data.hisData[year].map((d, i) => {
                        const width = d * (Global.eachWidth - Global.hisDataWidthdiff) / (maxHisVal - minHisVal)
                        if (!data.hisDataObj[year].hasOwnProperty(i)) return null
                        const items = Object.entries(data.hisDataObj[year][i].rankData)
                        let strNode = items.map((e, i) => {
                            if (i === items.length - 1) {
                                return <div key={`${year}_${i}_${e[0]}`}>{e[0]}:{e[1]}</div>
                            }
                            return <div key={`${year}_${i}_${e[0]}`}>{e[0]}:{e[1]}<br/></div>
                        })
                        let stroke = 'gray'
                        let strokeWidth = 0
                        if (Global.clickLayer === i && Global.clickYear === year && Global.clickType === String(type)) {
                            stroke = 'black'
                            strokeWidth = 2
                        }
                        if (Global.overLayer === i && Global.overYear === year && Global.overType === String(type)) {
                            stroke = 'gray'
                            strokeWidth = 2
                        }
                        // let newRect = false
                        // let newWidth = 0
                        // if (Global.compareFlag && data.hisData.hasOwnProperty(year) && data.hisData[year].hasOwnProperty(i)) {
                        //     const newData = data.newHisData[year][i]
                        //     newWidth = newData * (Global.eachWidth - Global.hisDataWidthdiff) / (data.maxHIsVal - data.minHisVal) - 5
                        //     newRect = true`
                        // }
                        return (
                            <g key={`${year}_${i}`}>

                                {/*<Tooltip key={`${year}_${i}`} title={strNode} placement={'right'}>*/}
                                <rect key={`${year}_${i}`} width={width}
                                      height={(Global.rankHeight - Global.diffHeight) / Global.layer - Global.hisDataHeightSel}
                                      y={i * (Global.rankHeight - Global.diffHeight) / Global.layer}
                                      layer={i}
                                      year={year}
                                      type={type}
                                      fill={fill}
                                      onMouseOver={this.onMouseOver}
                                      onMouseOut={this.onMouseOut}
                                      onClick={this.onClick}
                                      stroke={stroke}
                                      strokeWidth={strokeWidth}
                                />
                                {/*</Tooltip>*/}
                                {/*{newRect ? <rect key={`new${year}_${i}`} width={newWidth}*/}
                                {/*height={(Global.rankHeight - Global.diffHeight) / Global.layer - Global.hisDataHeightSel}*/}
                                {/*y={i * (Global.rankHeight - Global.diffHeight) / Global.layer}*/}
                                {/*layer={i}*/}
                                {/*year={year}*/}
                                {/*fill={'red'}*/}
                                {/*type={'new'}*/}
                                {/*opacity={0.8}*/}
                                {/*onMouseOver={this.onMouseOver}*/}
                                {/*onMouseOut={this.onMouseOut}*/}
                                {/*onClick={this.onClick}*/}
                                {/*new={1}*/}

                                {/*// onClick={this.onClick}*/}
                                {/*// onMouseOver={this.onMouseOver}*/}
                                {/*// onMouseOut={this.onMouseOut}*/}
                                {/*// onClick={this.onClick}*/}
                                {/*// stroke={hisMouserOverF ? 'gray' : 'black'}*/}
                                {/*// strokeWidth={(hisClickF || hisMouserOverF) ? 2 : 0}*/}
                                {/*/> : null}*/}
                            </g>
                        )
                    })
                }
            </g>
        )
    }
}

export default HistogramItem
