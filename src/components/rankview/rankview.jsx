import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Row, Col} from 'antd'
import './RankView.less'
import RankItems from './RankItems'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'
import Histograms from "./Histograms/Histograms"
import Circles from './Circles/Circles'
import Lines from './Lines/Lines'
import Times from './Times/Times'
import Brushes from "./Brushes/Brushes"
import * as d3 from 'd3'
import Linecharts from "./Linecharts/Linecharts"
import Trend from './trend'
import Outlines from "./Outlines/Outlines"

@observer
class RankView extends Component {
    constructor(props) {
        super(props)
    }

    getWidth(self) {
        Global.setRankWidth(self.refs.rankView.clientWidth)
        // Global.setRankHeight(self.refs.rankView.clientHeight)
        // Global.setRankHeight(940)
        // let eachWidth = 0
        //
        // if ( Global.oldData.circlePos !== undefined && Global.oldData.circlePos !== null){
        //     const count = Object.keys(Global.oldData.circlePos).length
        //     eachWidth = (self.refs.rankView.clientWidth - Global.left - Global.right) / count
        // }
        // Global.setEachWidth(eachWidth)
    }


    componentDidMount() {
        this.getWidth(this)
        // const nodes = ["Nan Cao", "Tom Peterka", "Yifan Hu"]
        Global.setNodes([])
        console.log('rankView DidMount')
    }

    onClick() {
        Global.setRankHeight(Global.rankHeight - 50)
    }

    render() {

        return <div className="rank-wrapper">
            {/*<Row className="rank-wrapper-title" onClick={this.onClick}>*/}
            {/*<Col span={8}/>*/}
            {/*<Col span={8}>*/}
            {/*Rank View*/}
            {/*</Col>*/}
            {/*<Col span={8}/>*/}
            {/*</Row>*/}
            <div className="rank-wrapper-content" ref='rankView'>
                <svg width={Global.rankWidth} height={Global.rankHeight}>
                    <defs>
                        <filter id="f1" x="0" y="0">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                        </filter>
                    </defs>
                    {Global.axisPos === null ? null :
                        <g>
                            <Linecharts data={Global.oldData} type={0}/>
                            {Global.compareFlag ? <Linecharts data={Global.newData} type={1}/> : null}

                            <Times data={Global.oldData}/>

                            <Trend data={Global.oldData}/>

                            <Outlines data={Global.oldData} type={0}/>
                            {Global.compareFlag ? <Outlines data={Global.newData} type={1}/> : null}

                            <Brushes data={Global.oldData}/>

                            <Histograms data={Global.oldData} type={0}/>
                            {Global.compareFlag ? <Histograms data={Global.newData} type={1}/> : null}

                            <Lines data={Global.oldData} type={0}/>
                            {Global.compareFlag ? <Lines data={Global.newData} type={1}/> : null}

                            <Circles data={Global.oldData} type={0}/>
                            {Global.compareFlag ? <Circles data={Global.newData} type={1}/> : null}
                        </g>}
                </svg>
            </div>
        </div>
    }
}

export default RankView
