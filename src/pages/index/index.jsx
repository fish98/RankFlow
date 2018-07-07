import React, {Component} from 'react'
import './index.less'
import rankData from './tRankData.json'
import yearData from './year_data.json'
import RankView from '../../components/rankview/rankview'
import DetailView from '../../components/detailview/detailview'
import Global from '../../components/Store/Global'
import {observer} from 'mobx-react'

@observer
class Index extends Component {
    constructor() {
        super()
        let self = this
        // let yearData = this.dealData(rankData, Global.layer)
        Global.setRankData(rankData)
        Global.setYearData(yearData)
        self.state = {
            // rankData: rankData,
            // yearData: yearData,
            // staData: staData,
            axisPos: null,
            detailData: rankData['Aidong Lu'],
            // layer: layer,
        }

    }

    dealData(data, layer) {
        let year_obj = {}

        function compare(mean) {
            return function (obj1, obj2) {
                let value1 = obj1[mean]
                let value2 = obj2[mean]
                return value1 - value2     // 升序
            }
        }

        Object.keys(data).forEach(name => {
            const d = data[name]
            Object.keys(d).forEach(year => {
                if (!year_obj.hasOwnProperty(year)) {
                    year_obj[year] = {obj: {}, arr: []}
                }
                const sum = Object.values(d[year]).reduce((a, b) => a + b)
                const l = Object.keys(d[year]).length
                const mean = sum / l
                const variance = Object.values(d[year]).reduce((a, b) => a + Math.pow(b - mean, 2)) / l
                year_obj[year].obj[name] = {data: d[year], mean: mean, name: name, variance: variance}
            })
        })
        Object.keys(year_obj).forEach(year => {
            year_obj[year].arr = Object.values(year_obj[year].obj).sort(compare('mean'))
            const l = year_obj[year].arr.length

            year_obj[year].arr.forEach((d, i) => {
                year_obj[year].obj[d.name].mean_rank = i
                year_obj[year].obj[d.name].layer = Math.floor(i / (l / layer))
            })
        })
        return year_obj
    }


    axisPosition(years, width, opts = {
        left: Global.left,
        right: Global.right
    }) {
        let axisPos = {}
        let {left, right} = opts
        let axisWidth = (width - left - right) / years.length
        years.forEach((year, index) => {
            axisPos[year] = index * axisWidth + left + axisWidth / 2
        })
        return axisPos
    }

    componentDidMount() {
        console.log('Index Did Mount')
        let rightContainer = document.getElementsByClassName('right-container')[0]
        let width = rightContainer.clientWidth
        let axisPos = this.axisPosition(Object.keys(Global.yearData).sort((a, b) => a - b), width)
        Global.setAxisPos(axisPos)

        // store.setData(this.yearData)
        // store.setNodes([])
    }

    render() {
        return (
            <div className="page-wrapper">
                <div className="left-container">
                    <div className="left-top-container">
                        t-SNE
                    </div>
                    <div className="left-middle-container"/>
                    <div className="left-bottom-container"/>
                </div>
                <div className="right-container">
                    <div className="right-top-container">
                        <RankView axis={this.state.axisPos}/>
                    </div>
                    <div className="right-bottom-container">
                        <DetailView data={this.state.detailData} axis={Global.axisPos}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
