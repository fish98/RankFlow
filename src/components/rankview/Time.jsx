import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './rankview.less';

class Time extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <text x={10} y={10}>
                {this.props.data}
            </text>
            // {/*<Time/>*/}
            // {/*<Histograom/>*/}
            // {/*<RankAxis/>*/}
        );
    }
}

export default Time;
