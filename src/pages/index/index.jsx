import React, { Component } from 'react';
import './index.less';

class Index extends Component {
    constructor() {
        super();
        let self = this;
        self.state = {
        };
    }
    
    render() {
        return (
            <div className="page-wrapper">
                <div className="left-container">
                    <div className="left-top-container"></div>
                    <div className="left-middle-container"></div>
                    <div className="left-bottom-container"></div>
                </div>
                <div className="right-container">
                    <div className="right-top-container"></div>
                    <div className="right-bottom-container"></div>
                </div>
            </div>
        );
    }
}

export default Index;
