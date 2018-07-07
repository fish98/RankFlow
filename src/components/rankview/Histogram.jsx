import React, {Component} from 'react'
import * as d3 from 'd3'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'

@observer
class Histogram extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <g transform={`translate(-15,${ Global.diffHeight})`}>
                {
                    Global.hisData[this.props.year].map((d, i) => {
                        const width = d * (Global.eachWidth - 5) / (Global.maxHIsVal - Global.minHisVal)
                        return <rect key={i} width={width}
                                     height={(Global.rankHeight - Global.diffHeight) / Global.layer - 2}
                                     y={i * (Global.rankHeight - Global.diffHeight) / Global.layer}
                                     fill={'rgba(24,144,255,0.6)'}
                        />
                    })
                }
            </g>
        )
    }
}

export default Histogram
