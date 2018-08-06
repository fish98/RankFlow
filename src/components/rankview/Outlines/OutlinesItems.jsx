import React, {Component} from 'react'
import * as d3 from 'd3'
import Global from '../../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'
import {Tooltip} from 'antd'

@observer
class OutlinesItems extends Component {
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
        const {year, data, type} = this.props
        const height = (Global.rankHeight - Global.diffHeight) / Global.layer - Global.hisDataHeightSel
        const fill = type ? 'red' : 'lightblue'
        const stroke = type ? '#red' : '0e88eb'

        let path = 'M0 0'
        data.hisData[year].map((d, i) => {
            const width = d * (Global.eachWidth - Global.hisDataWidthdiff) / (Global.maxHIsVal - data.minHisVal)
            const y = i * (Global.rankHeight - Global.diffHeight) / Global.layer + height / 2
            path += `L${width} ${y}`
        })
        path += `L0 ${Global.rankHeight - Global.diffHeight} L 0 0`


        // let newPath = 'M0 0'
        // if (Global.compareFlag && newData.obj.newHisData.hasOwnProperty(year)) {
        //     newData.obj.newHisData[year].map((d, i) => {
        //         let width = d * (Global.eachWidth - Global.hisDataWidthdiff) / (Global.maxHIsVal - Global.minHisVal)
        //         const y = i * (Global.rankHeight - Global.diffHeight) / Global.layer + height / 2
        //         if (width) {
        //             width -= 2
        //         }
        //         newPath += `L ${width} ${y}`
        //     })
        //     newPath += `L0 ${Global.rankHeight - Global.diffHeight} L 0 0`
        // }

        return (
            <g transform={`translate(${Global.subWidth},${ Global.diffHeight})`}
               className={`outLines${year}`}
            >
                <path key={year}
                      d={path}
                      year={year}
                      stroke={stroke}
                      strokeWidth={2}
                      fill={fill}
                      opacity={0.6}
                />
            </g>
        )
    }
}

export default OutlinesItems
