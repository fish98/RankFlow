import React, {Component} from 'react'
import './index.less'
import rankData from './tRankData.json'
import yearData from './year_data.json'
import RankView from '../../components/rankview/rankview'
import DetailView from '../../components/detailview/detailview'
import TSNEView from '../../components/tsneview/tsneview'
import Global from '../../components/Store/Global'
import {observer} from 'mobx-react'
import Filter from "../../components/filter/Filter"

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
        Global.setMaxRank(maxRank)
        self.state = {
            axisPos: null,
            detailData: detailData,
            maxRank: maxRank
        }
    }

    dealData(data, layer) {
        let year_obj = {}
        Object.keys(data).forEach(name => {
            const d = data[name]
            Object.keys(d).forEach(year => {
                if (!year_obj.hasOwnProperty(year)) {
                    year_obj[year] = {obj: {}, arr: []}
                }
                const sum = Object.values(d[year]).reduce((a, b) => a + b)
                const l = Object.keys(d[year]).length
                const mean = sum / l
                const variance = Object.values(d[year]).reduce((a, b) => a + Math.pow(b - mean, 2), 0) / l
                year_obj[year].obj[name] = {
                    data: d[year],
                    mean: mean,
                    name: name,
                    rankL: l,
                    variance: variance,
                    varianceSqrt: Math.sqrt(variance),
                }
            })
        })
        let countLayer = {}
        Object.keys(year_obj).forEach(year => {
            year_obj[year].arr = Object.values(year_obj[year].obj).sort((a, b) => a.mean - b.mean)
            const l = year_obj[year].arr.length
            countLayer[year] = {}
            year_obj[year].arr.forEach((d, i) => {//排好序，所以layer的时候都是从小到大加的
                let data = year_obj[year].obj[d.name]
                data.mean_rank = i
                data.mean_rank_per = i / l//百分比
                const data_arr = Object.values(data.data)
                const sum = data_arr.reduce((a, b) => a + b) / l
                const mean = sum / data.rankL
                const variance = data_arr.reduce((a, b) => a + Math.pow(b / l - mean, 2), 0) / data.rankL
                data.variance_per = variance
                data.varianceSqrt_per = Math.sqrt(variance)
                data.data_per = {}
                Object.keys(data.data).forEach(e => {
                    data.data_per[e] = parseFloat((data.data[e] / l / sum * 100).toFixed(2))
                })
                const newLayer = Math.floor(i / (l / layer))
                year_obj[year].obj[d.name].layer = newLayer
                if (!countLayer[year].hasOwnProperty(newLayer)) countLayer[year][newLayer] = []
                year_obj[year].obj[d.name].layerIndex = countLayer[year][newLayer].length
                countLayer[year][newLayer].push(d.name)
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
    //
    // componentDidMount() {
    //     console.log('Index Did Mount')
    //     // let rightContainer = document.getElementsByClassName('right-container')[0]
    //     // let width = rightContainer.clientWidth
    //     // let axisPos = this.axisPosition(Object.keys(Global.yearData).sort((a, b) => a - b), width)
    //     // let axisPos = this.axisPosition(Object.keys(Global.oldData.circlePos).sort((a, b) => a - b), width)
    //     Global.setAxisPos(Global.oldData.circlePos)
    // }

    onClickHandler = () => {
        this.setState({
            detailData: Object.values(rankData)[Math.floor(Math.random() * 100)]
        })
    }

    render() {
        console.log(Global.selectNode, Global.rankData[Global.selectNode], Global.axisPos, this.state.maxRank)
        return (
            <div className="page-wrapper">
                <div className="left-container">
                    <div className="left-top-container">
                        <TSNEView/>
                    </div>
                    <div className="left-middle-container">
                        <Filter/>
                        {/*{Global.selectNode === null ? null : <Filter/>}*/}
                    </div>
                    <div className="left-top-container"/>

                    <div className="left-bottom-container" onClick={this.onClickHandler}/>
                </div>
                <div className="right-container">
                    <div className="right-top-container" style={{zIndex: 10}}>
                        <RankView axis={this.state.axisPos}/>
                    </div>
                    <div className="right-bottom-container" style={{zIndex: Global.selectNode ? 100 : 1}}>
                        <DetailView data={Global.rankData[Global.selectNode]} axis={Global.axisPos}
                                    maxRank={this.state.maxRank}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
