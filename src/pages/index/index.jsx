import React, {Component} from 'react'
import './index.less'
import rankData from './tRankData.json'
import RankView from '../../components/rankview/rankview'
import DetailView from '../../components/detailview/detailview'

class Index extends Component {
    constructor() {
        super()
        this.elements = ["HIS", "ICC", "H", "aggre_constraint", "clust_coef", "betweenness", "effective_size", "local_effic", "pagerank", "MaxD"]
        let self = this
        let layer = 10
        let yearData = this.dealData(rankData,layer)
        // let staData = this.dealSta(yearData)
        self.state = {
            rankData: rankData,
            yearData: yearData,
            layer:layer
            // staData: staData,
        }

    }

    dealData(data,layer) {
        let year_obj = {}
        let max_rank = -100
        let min_rank = 1000000

        function compare(mean) {
            return function (obj1, obj2) {
                let value1 = obj1[mean]
                let value2 = obj2[mean]
                return value1 - value2     // 升序
            }
        }

        // function compareElements(s) {
        //     return function (obj1, obj2) {
        //         let value1 = obj1.data[s]
        //         let value2 = obj2.data[s]
        //         return value1 - value2     // 升序
        //     }
        // }

        Object.keys(data).forEach(name => {
            const d = data[name]
            Object.keys(d).forEach(year => {
                if (!year_obj.hasOwnProperty(year)) {
                    year_obj[year] = {obj: {}, arr: []}
                }
                const sum = Object.values(d[year]).reduce((a, b) => a + b)
                const l = Object.keys(d[year]).length
                const mean = sum / l
                const variance = Object.values(d[year]).reduce((a,b)=>a+Math.pow(b-mean,2))/l
                year_obj[year].obj[name] = {data: d[year], mean: mean, name: name,variance:variance}
                // if (mean>max_rank){
                //     max_rank = mean
                // }
                // if (mean<min_rank){
                //     min_rank =mean
                // }
            })
        })
        Object.keys(year_obj).forEach(year => {
            year_obj[year].arr = Object.values(year_obj[year].obj).sort(compare('mean'))

            year_obj[year].arr.forEach((d,i)=>{
                year_obj[year].obj[d.name].mean_rank = i
                year_obj[year].obj[d.name].layer = Math.floor(i/(l/layer))
            })
        })
        // this.elements.forEach(d => {// d是element
        //     Object.keys(year_obj).forEach(year => {
        //         year_obj[year][d] = Object.values(year_obj[year].obj).sort(compareElements(d))
        //         year_obj[year][d].forEach((data,i)=>{
        //             year_obj[year].obj[data.name].rank_data[d] = i
        //         })
        //
        //     })
        // })
        return year_obj
    }

    // dealSta(data) {
    //     let year_sta = {}
    //     Object.keys(data).forEach(name => {
    //
    //     })
    //     return year_sta
    // }

    componentDidMount() {

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
                        <RankView data={this.state.yearData} layer = {this.state.layer}/>
                    </div>
                    <div className="right-bottom-container">
                        <DetailView data={this.state.rankData} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
