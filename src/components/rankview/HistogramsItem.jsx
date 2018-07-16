import React, {Component} from 'react'
import * as d3 from 'd3'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'
import {Tooltip} from 'antd'

@observer
class HistogramItem extends Component {
    constructor(props) {
        super(props)

    }

    onMouseOver(e) {
        Global.setOverLayer(e.target.getAttribute('layer'))
        Global.setOverYear(e.target.getAttribute('year'))

    }

    onMouseOut(e) {
        Global.setOverLayer(null)
        Global.setOverYear(null)
    }

    onClick(e) {
        const layer = e.target.getAttribute('layer')
        const year = e.target.getAttribute('year')
        if (layer === Global.clickLayer && year === Global.clickYear) {
            Global.setClickLayer(null)
            Global.setClickYear(null)
        } else {
            Global.setClickLayer(layer)
            Global.setClickYear(year)
        }

    }
    render() {
        const year = this.props.year
        return (
            <g transform={`translate(${Global.subWidth},${ Global.diffHeight})`}>
                {
                    Global.hisData[year].map((d, i) => {
                        const width = d * (Global.eachWidth - Global.hisDataWidthdiff) / (Global.maxHIsVal - Global.minHisVal)
                        if (!Global.hisDataObj[year].hasOwnProperty(i)) return null
                        const items = Object.entries(Global.hisDataObj[year][i].rankData)
                        let strNode = items.map((e, i) => {
                            if (i === items.length - 1) {
                                return <div key={`${year}_${i}_${e[0]}`}>{e[0]}:{e[1]}</div>
                            }
                            return <div key={`${year}_${i}_${e[0]}`}>{e[0]}:{e[1]}<br/></div>
                        })
                        let hisClickF = false
                        if (Number(Global.clickLayer) === i && Global.clickYear === year) {
                            hisClickF = true
                        }
                        let hisMouserOverF = false
                        if (Number(Global.overLayer) === i && Global.overYear === year) {
                            hisMouserOverF = true
                        }
                        return (
                            <Tooltip key={`${year}_${i}`} title={strNode} placement={'right'}>
                                <rect key={`${year}_${i}`} width={width}
                                      height={(Global.rankHeight - Global.diffHeight) / Global.layer - Global.hisDataHeightSel}
                                      y={i * (Global.rankHeight - Global.diffHeight) / Global.layer}
                                      layer={i}
                                      year={year}
                                      fill={'rgba(24,144,255,0.6)'}
                                      onClick={this.onClick}
                                      onMouseOver={this.onMouseOver}
                                      onMouseOut={this.onMouseOut}
                                      onClick={this.onClick}
                                      stroke={hisMouserOverF ? 'gray' : 'black'}
                                      strokeWidth={(hisClickF||hisMouserOverF) ? 2 : 0}
                                />
                            </Tooltip>
                        )
                    })
                }
            </g>
        )
    }
}

export default HistogramItem
