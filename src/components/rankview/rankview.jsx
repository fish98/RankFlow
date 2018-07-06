import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Row, Col} from 'antd'
import './rankview.less'
import RankItems from './RankItems'

class RankView extends Component {
    constructor(props) {
        super(props)
        let his_data = {}
        this.count = Object.keys(props.data).length
        Object.keys(props.data).forEach(year => {
            his_data[year] = Array(this.layer).fill(0)
        })
        this.state = {
            data: props.data,
            height: 100,
            width: 100,
            his_data: his_data,
            max_val : -1000,
            min_val : 1000000,
            layer:props.layer,
            his_rank:[],
            nodes:[],
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data,
        })
    }

    componentDidMount() {
        this.setState({
            height: this.refs.rankView.clientHeight,
            width: this.refs.rankView.clientWidth,
        })
    }

    handleClick() {
        const nodes = ['Melanie Tory', 'Song Zhang', "Nelson L. Max"]
        this.setState({
            nodes: nodes
        })
        let his_val = {}
        let max_val = -1000
        let min_val = 1000000
        let rank_val = {}
        Object.keys(this.state.data).sort().map((year, i) => {
            his_val[year] = Array(this.state.layer).fill(0)
            rank_val[year] = {}
            nodes.forEach(name => {
                Object.entries(this.state.data[year].obj[name].data).forEach((e) => {
                    his_val[year][Math.floor(e[1] / (Object.keys(this.state.data[year].obj).length / this.state.layer))] += 1
                    let layer = this.state.data[year].obj[name].layer
                    if (!rank_val[year].hasOwnProperty(layer)) rank_val[year][layer]=[]
                    rank_val[year][layer].push(name)
                })
            })
            const val0 = Math.max(...his_val[year])
            const val1 = Math.min(...his_val[year])
            if (val1 < min_val) min_val = val1
            if (val0 > max_val) max_val = val0
        })



        this.setState({
            his_data: his_val,
            his_rank: rank_val,
            max_val: max_val,
            min_val: min_val,
        })
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
                <svg width={this.state.width} height={this.state.height} onClick={this.handleClick}>
                    {
                        Object.keys(this.state.data).sort().map((year, i) => {
                            let x = i * this.state.width / this.count
                            return <RankItems key={i} year={year} data={this.state.data[year]}
                                              x={x} each_width={this.state.width / this.count}
                                              height={this.state.height}
                                              layer={this.state.layer}
                                              min_val={this.state.min_val}
                                              max_val={this.state.max_val}
                                              his_data={this.state.his_data[year]}
                                              his_rank={this.state.his_rank[year]}
                                              nodes = {this.state.nodes}
                                              people={Object.keys(this.state.data[year].obj).length}/>
                        })}
                </svg>
            </div>
        </div>
    }
}

export default RankView
