import React, {Component} from 'react';
import {Row, Col} from 'antd';
import './rankview.less';
import RankItems from './RankItems'

class RankView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [1,2,3]
        }
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
            <div className="rank-wrapper-content">
                {this.state.data.map((i, d) => {
                    return <RankItems data={d}/>
                })}
            </div>
        </div>;
    }
}

export default RankView;
