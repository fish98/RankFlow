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
        let his_data = {}
        Object.keys(Global.yearData).forEach(year => {
            his_data[year] = Array(Global.layer).fill(0)
        })
        this.handleClick = this.handleClick.bind(this)
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

    handleClick() {
        const nodes = ['Melanie Tory']
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
                            />
                        })}
                </svg>
            </div>
        </div>
    }
}

export default RankView
