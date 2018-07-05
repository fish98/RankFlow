import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Row, Col} from 'antd'
import './rankview.less'
import RankItems from './RankItems'

class RankView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: props.data,
            height: 100,
            width: 100,
        }
        this.count = Object.keys(props.data).length
    }

    componentDidMount() {
        this.setState({
            height: this.refs.rankView.clientHeight,
            width: this.refs.rankView.clientWidth,
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
                <svg width={this.state.width} height={this.state.height}>
                    {
                        Object.keys(this.state.data).map((d, i) => {
                            let x = i * this.state.width / this.count
                            return <RankItems key={i} year={d} data={this.state.data[d]}
                                              x={x} each_width={this.state.width / this.count} height={this.state.height}/>
                        })}
                </svg>
            </div>
        </div>
    }
}

export default RankView
