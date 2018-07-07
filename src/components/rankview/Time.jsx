import React, {Component} from 'react'
import './rankview.less'

class Time extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <text x={-15} y={10}>
                {this.props.year}
            </text>
        )
    }
}

export default Time
