import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Row, Col} from 'antd'
import './rankview.less'
import RankItems from './RankItems'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'
import Histograms from "./Histograms"
import Circles from './Circles'
import Lines from './Lines'
import Times from './Times'

@observer
class RankView extends Component {
    constructor(props) {
        super(props)
        this.setNodes = this.setNodes.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    getCirclePos(nodes) {
        let circlePos = {}
        let circlePosPer = {}
        let yearPer = 0
        let lineGroup = {}
        Object.keys(Global.yearData).forEach(year => {
            nodes.map(name => {//计算圆的位置
                if (!Global.yearData[year].obj.hasOwnProperty(name)) return
                const layer = Global.hisRankObj[year][name].layer
                const index = Global.hisRankObj[year][name].index
                const x = index * 2 * Global.rankR
                const layerLayer = Math.floor((x + Global.rankR) / Global.hisRankWidth)
                const y = layer * (Global.rankHeight - Global.diffHeight) / Global.layer + layerLayer * 2 * Global.rankR
                const cx = x + Global.rankR - layerLayer * Global.hisRankWidth
                const cy = y + Global.rankR
                if (!circlePos.hasOwnProperty(year)) {
                    circlePos[year] = {}
                }
                circlePos[year][name] = {
                    val: Math.sqrt(Global.yearData[year].obj[name].variance),
                    x: 0,
                    cx: cx,
                    cy: cy,
                    y: cy,
                    r: Global.rankR,
                    name: name,
                }
            })
            if (circlePosPer !== {} && Number(year) - Number(yearPer) === 1) {//之前有值，年份相邻差1
                Object.keys(circlePos[year]).forEach(name => {//计算线的位置
                    const circleRight = circlePos[year][name]
                    if (!circlePosPer.hasOwnProperty(name)) return
                    const circleLeft = circlePosPer[name]
                    if (!lineGroup.hasOwnProperty(year)) {
                        lineGroup[year] = {}
                    }
                    lineGroup[year][name] = {
                        source: {
                            x: 0,
                            y: circleLeft.y,
                        },
                        target: {
                            x: Global.eachWidth,
                            y: circleRight.y
                        },
                        valLeft: circleLeft.val,
                        valRight: circleRight.val,
                        r: Global.rankR,
                        name: circleLeft.name,
                    }
                })
            }
            yearPer = year
            circlePosPer = circlePos[yearPer]
        })
        Global.setLinePos(lineGroup)
        Global.setCirclePos(circlePos)
    }

    getWidth(self) {
        Global.setRankWidth(self.refs.rankView.clientWidth)
        Global.setRankHeight(self.refs.rankView.clientHeight)
        const count = Object.keys(Global.yearData).length
        let eachWidth = (self.refs.rankView.clientWidth - Global.left - Global.right) / count
        if (!count) eachWidth = 0
        Global.setEachWidth(eachWidth)
    }


    dealNodesLayer(nodes) {
        let nodesLayer = {}
        let r = {}
        const years = Object.keys(Global.yearData)
        years.forEach(year => {
            nodesLayer[year] = {}
            nodes.forEach(name => {
                if (!Global.yearData[year].obj.hasOwnProperty(name)) return

                const data = Global.yearData[year].obj[name]
                const layer = data.layer
                if (!nodesLayer[year].hasOwnProperty(layer)) {
                    nodesLayer[year][layer] = []
                }
                nodesLayer[year][layer].push(name)
            })
            r[year] = {}
            Object.keys(nodesLayer).forEach(year => {
                Object.keys(nodesLayer[year]).forEach(layer => {
                    nodesLayer[year][layer].sort((a, b) => Global.yearData[year].obj[a].mean_rank - Global.yearData[year].obj[b].mean_rank)
                    nodesLayer[year][layer].forEach((name, index) => {
                        r[year][name] = {layer: layer, index: index}
                    })
                })
            })
        })
        return r
    }

    setNodes(nodes) {
        Global.setNodes(nodes)
        let sumCount = 0
        let his_val = {}
        let max_val = -1000
        let min_val = 1000000
        let rank_val = {}
        let his_val_obj = {}
        let yearData = Global.yearData
        Object.keys(yearData).sort().map(year => {
            his_val[year] = Array(Global.layer).fill(0)
            his_val_obj[year] = {}
            rank_val[year] = {}
            nodes.forEach(name => {
                if (!yearData[year].obj.hasOwnProperty(name)) return
                Object.entries(yearData[year].obj[name].data).forEach((e) => {
                    let la = Math.floor(e[1] / (yearData[year].arr.length / Global.layer))
                    his_val[year][la] += 1
                    if (!his_val_obj[year].hasOwnProperty(la)) {
                        his_val_obj[year][la] = {}
                    }
                    if (!his_val_obj[year][la].hasOwnProperty(e[0])) {
                        his_val_obj[year][la][e[0]] = 0
                    }
                    his_val_obj[year][la][e[0]] += 1
                    let layer = yearData[year].obj[name].layer
                    if (!rank_val[year].hasOwnProperty(layer)) rank_val[year][layer] = []
                    rank_val[year][layer].push(name)
                    sumCount += 1
                })
            })
            const val0 = Math.max(...his_val[year])
            const val1 = Math.min(...his_val[year])
            if (val1 < min_val) min_val = val1
            if (val0 > max_val) max_val = val0
        })
        Global.setMaxHisVal(max_val)
        Global.setMinHisVal(min_val)
        Global.setHisData(his_val)
        Global.setHisRank(rank_val)
        Global.setHisDataObj(his_val_obj)
        Global.setHisRankObj(this.dealNodesLayer(nodes))
        console.info(sumCount)
        this.getCirclePos(nodes)
    }

    handleClick() {
        const min =0
        const max = 100
        const l = Math.floor(Math.random()*(max-10-min+1)+min);
        const r = Math.floor(Math.random()*(max-l+2)+l+1);
        console.log(l,r)
        const nodes = Object.keys(Global.rankData).slice(l, r)
        this.setNodes(nodes)
    }

    componentDidMount() {
        this.getWidth(this)
        const nodes = Object.keys(Global.rankData).slice(5, 50)
        this.setNodes(nodes)
        console.log('rankView DidMount')
    }

    render() {

        return <div className="rank-wrapper">
            <Row className="rank-wrapper-title">
                <Col span={8}/>
                <Col span={8}>
                    Rank View
                </Col>
                <Col span={8}/>
            </Row>
            <div className="rank-wrapper-content" ref='rankView'>
                <svg width={Global.rankWidth} height={Global.rankHeight} onClick={this.handleClick}>

                    {Global.axisPos === null ? null : <g>
                        <Times/>
                        <Histograms/>
                        <Lines/>
                        <Circles/>
                    </g>}
                </svg>
            </div>
        </div>
    }
}

export default RankView
