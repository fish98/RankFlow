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

    onClickHandler = () => {
        this.setState({
            detailData: Object.values(rankData)[Math.floor(Math.random() * 100)]
        })
    }

    render() {
        return (
            <div className="page-wrapper">
                <div className="left-container">
                    <div className="left-top-container">
                        <TSNEView/>
                    </div>
                    <div className="left-middle-container">
                        <Filter/>
                    </div>
                    <div className="left-top-container"/>

                    <div className="left-bottom-container" onClick={this.onClickHandler}/>
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
