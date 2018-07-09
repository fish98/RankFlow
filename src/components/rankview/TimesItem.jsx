import React, {Component} from 'react'
import Global from'.././Store/Global'
class TimesItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <text x={Global.diffHeight} y={10}>
                {this.props.year}
            </text>
        )
    }
}

export default TimesItem
