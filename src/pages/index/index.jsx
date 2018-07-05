import React, { Component } from 'react';
import './index.less';
import rankData from './tRankData.json';
import RankView from '../../components/rankview/rankview';
import DetailView from '../../components/detailview/detailview';

class Index extends Component {
    constructor() {
        super();
        let self = this;
        self.state = {
            rankData: {}
        };
        console.log('Index Init');
    }
    componentDidMount() {
        console.log(rankData);
        this.setState({
            rankData: rankData
        });
        console.log('Index Did Mount');
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
                        <RankView data={this.state.rankData}></RankView>
                    </div>
                    <div className="right-bottom-container">
                        <DetailView data={this.state.rankData}></DetailView>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
