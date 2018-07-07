import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Row, Col} from 'antd'
import './rankview.less'
import RankItems from './RankItems'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'

@observer
class RankView extends Component {
    constructor(props) {
        super(props)
        this.circlePosPer = {}
        this.yearPer = 0
        this.getCirclePos = this.getCirclePos.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    getCirclePos(data) {
        const year = Object.keys(data)[0]
        let lineGroup = []
        if (this.circlePosPer !== {} && Number(year) - Number(this.yearPer) === 1) {//之前有值，年份相邻差1
            Object.keys(data[year]).forEach(name => {
                const circleRight = data[year][name]
                const circleLeft = this.circlePosPer[name]
                lineGroup.push({
                    source: {
                        x: 0,
                        y: circleLeft.y,
                    },
                    target: {
                        x: Global.eachWidth,
                        y: circleRight.y
                    },
                    valLeft:circleLeft.val,
                    valRight:circleRight.val,
                    r:Global.rankR,
                    name:circleLeft.name,
                })

            })
        }
        this.yearPer = year
        this.circlePosPer = data[this.yearPer]
        return lineGroup
    }

    componentDidMount() {
        Global.setRankWidth(this.refs.rankView.clientWidth)
        Global.setRankHeight(this.refs.rankView.clientHeight)
        const count = Object.keys(Global.yearData).length
        let eachWidth = (this.refs.rankView.clientWidth - Global.left - Global.right) / count
        if (!count) eachWidth = 0
        Global.setEachWidth(eachWidth)
        console.log('rankView DidMount')
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
        // nodesLayer.for
    }

    handleClick() {
        const nodes = ['Melanie Tory', 'Aidong Lu']
        Global.setNodes(nodes)
        let his_val = {}
        let max_val = -1000
        let min_val = 1000000
        let rank_val = {}
        let his_val_obj = {}
        let yearData = Global.yearData
        Object.keys(yearData).sort().map((year, i) => {
            his_val[year] = Array(Global.layer).fill(0)
            his_val_obj[year] = {}
            rank_val[year] = {}
            nodes.forEach(name => {
                Object.entries(yearData[year].obj[name].data).forEach((e) => {
                    let la = Math.floor(e[1] / (Object.keys(yearData[year].obj).length / Global.layer))
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
                    {
                        Object.keys(Global.yearData).sort().map((year, i) => {
                            return <RankItems key={year} year={year} data={Global.yearData[year]}
                                              x={Global.axisPos == null ? 0 : Global.axisPos[year]}
                                              getCirclePos={this.getCirclePos}
                            />
                        })}
                </svg>
            </div>
        </div>
    }
}

export default RankView
