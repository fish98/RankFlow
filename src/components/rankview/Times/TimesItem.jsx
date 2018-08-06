import React, {Component} from 'react'
import Global from '../../Store/Global'
import '../RankView.less'
class TimesItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <text x={15} y={10} className="no-select-text">
                {this.props.year}
            </text>
        )
    }
}


export default TimesItem
