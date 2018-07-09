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
        Global.setYearArr(Object.keys(yearData).sort())
        let detailData = Object.values(rankData)[10]
        let maxRank = Object.entries(yearData).reduce((result, data) => {
            result[data[0]] = data[1].arr.length
            return result
        }, {})
        self.state = {
            axisPos: null,
            detailData: detailData,
            maxRank: maxRank
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
        let countLayer = {}
        Object.keys(year_obj).forEach(year => {
            year_obj[year].arr = Object.values(year_obj[year].obj).sort((a, b) => a.mean - b.mean)
            const l = year_obj[year].arr.length
            countLayer[year] = {}
            year_obj[year].arr.forEach((d, i) => {//排好序，所以layer的时候都是从小到大加的
                year_obj[year].obj[d.name].mean_rank = i
                const newLayer = Math.floor(i / (l / layer))
                year_obj[year].obj[d.name].layer = newLayer
                if (!countLayer[year].hasOwnProperty(newLayer)) countLayer[year][newLayer] = []
                year_obj[year].obj[d.name].layerIndex = countLayer[year][newLayer].length
                countLayer[year][newLayer].push(d.name)
            })
            // year_obj[year].count =
            // Object.keys(countLayer[year]).forEach(layer=>{//这里改mean_rank可以让每一层按照方差来排序
            //     countLayer[year][layer].sort((a,b)=>year_obj[year].obj[a].mean_rank-year_obj[year].obj[b].mean_rank)
            // })
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
                        <DetailView data={Global.rankData[Global.selectNode]} axis={Global.axisPos}
                                    maxRank={this.state.maxRank}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
