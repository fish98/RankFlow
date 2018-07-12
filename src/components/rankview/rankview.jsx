import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Row, Col} from 'antd'
import './RankView.less'
import RankItems from './RankItems'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'
import Histograms from "./Histograms"
import Circles from './Circles'
import Lines from './Lines'
import Times from './Times'
import Brushes from "./Brushes"
import * as d3 from 'd3'

@observer
class RankView extends Component {
    constructor(props) {
        super(props)
    }

    getWidth(self) {
        Global.setRankWidth(self.refs.rankView.clientWidth)
        Global.setRankHeight(self.refs.rankView.clientHeight)
        const count = Object.keys(Global.yearData).length
        let eachWidth = (self.refs.rankView.clientWidth - Global.left - Global.right) / count
        if (!count) eachWidth = 0
        Global.setEachWidth(eachWidth)
    }


    componentDidMount() {
        this.getWidth(this)
        const nodes = ["Nan Cao", "Tom Peterka", "Yifan Hu"]
        Global.setNodes(nodes)
        console.log('rankView DidMount')
    }

    onClick() {
        Global.setRankHeight(Global.rankHeight - 50)
    }

    render() {
        return <div className="rank-wrapper">
            <Row className="rank-wrapper-title" onClick={this.onClick}>
                <Col span={8}/>
                <Col span={8}>
                    Rank View
                </Col>
                <Col span={8}/>
            </Row>
            <div className="rank-wrapper-content" ref='rankView'>
                <svg width={Global.rankWidth} height={Global.rankHeight}>
                    {Global.axisPos === null ? null :
                        <g transform={`translate(-30)`}>
                            <Times/>
                            <Brushes/>
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
