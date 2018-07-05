import React, {Component} from 'react'
import './index.less'
import rankData from './tRankData.json'
import RankView from '../../components/rankview/rankview'
import DetailView from '../../components/detailview/detailview'

class Index extends Component {
    constructor() {
        super()
        let self = this
        let yearData = this.dealData(rankData)
        let staData = this.dealSta(yearData)
        self.state = {
            rankData: rankData,
            yearData: yearData,
            staData: staData,
        }
    }

    dealData(data) {
        let year_obj = {}
        let max_rank = -100
        let min_rank = 1000000
        function compare(mean){
            return function(obj1,obj2){
                var value1 = obj1[mean];
                var value2 = obj2[mean];
                return value1 - value2;     // 升序
            }
        }
        Object.keys(data).forEach(name => {
            const d = data[name]
            Object.keys(d).forEach(year => {
                if (!year_obj.hasOwnProperty(year)) {
                    year_obj[year]={obj:{},arr:[]}
                }
                const sum = Object.values(d[year]).reduce((a,b)=>a+b)
                const l = Object.keys(d[year]).length
                const mean= sum/l
                year_obj[year].obj[name]={data:d[year], mean:mean, name:name}
                // if (mean>max_rank){
                //     max_rank = mean
                // }
                // if (mean<min_rank){
                //     min_rank =mean
                // }
            })
        })
        Object.keys(year_obj).forEach(year=>{
            year_obj[year].arr = Object.values(year_obj[year].obj).sort(compare('mean'))
        })
        return year_obj
    }

    dealSta(data){
        let year_sta = {}
        Object.keys(data).forEach(name => {

        })
        return year_sta
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="page-wrapper">
                <div className="left-container">
                    <div className="left-top-container">
                        t-SNE
                    </div>
                    <div className="left-middle-container"></div>
                    <div className="left-bottom-container"></div>
                </div>
                <div className="right-container">
                    <div className="right-top-container">
                        <RankView data={this.state.yearData}></RankView>
                    </div>
                    <div className="right-bottom-container">
                        <DetailView data={this.state.rankData}></DetailView>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
