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
        const layer = e.target.getAttribute('layer')
        Global.setOverLayer(layer)
    }

    render() {
        const year = this.props.year
        return (
            <g transform={`translate(${Global.subWidth},${ Global.diffHeight})`}>
                {
                    Global.hisData[year].map((d, i) => {
                        const width = d * (Global.eachWidth - Global.hisDataWidthdiff) / (Global.maxHIsVal - Global.minHisVal)
                        if (!Global.hisDataObj[year].hasOwnProperty(i)) return <g/>
                        let strNode = Object.entries(Global.hisDataObj[year][i]).map(e => {
                            return <p>{e[0]}:{e[1]}</p>
                        })
                        return (
                            <Tooltip key={`${year}_${i}`} title={strNode} placement={'right'}>
                                <rect key={`${year}_${i}`} width={width}
                                      height={(Global.rankHeight - Global.diffHeight) / Global.layer - Global.hisDataHeightSel}
                                      y={i * (Global.rankHeight - Global.diffHeight) / Global.layer}
                                      layer={i}
                                      fill={'rgba(24,144,255,0.6)'}
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
