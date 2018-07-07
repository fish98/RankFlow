import React, {Component} from 'react'
import {Row, Col} from 'antd'
import './rankview.less'
import Time from './Time'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS,trace } from 'mobx'

@observer
class RankItems extends Component {
    constructor(props) {
        super(props)
    }

    dealHistogram(prop_data, nodes) {
        nodes.forEach((name, i) => {
            const data = prop_data.obj[name]
            const layer = data.layer
        })
    }

    componentWillReceiveProps(props) {

    }
    componentDidUpdata() {
        console.log(this.props.year,'RankItems Did Mount')
    }

    render() {
        if (Global.hisData.hasOwnProperty(this.props.year))
            return (
                <g transform={`translate(${this.props.x})`}>
                    <Time data={this.props.year}/>
                    <g transform={`translate(-15,${ Global.diffHeight})`}>
                        {
                            Global.hisData[this.props.year].map((d, i) => {
                                const width = d * (Global.eachWidth) / (Global.maxHIsVal - Global.minHisVal)
                                return <rect key={i} width={width}
                                             height={(Global.rankHeight - Global.diffHeight) / Global.layer - 2}
                                             y={i * (Global.rankHeight - Global.diffHeight) / Global.layer}
                                             fill={'rgba(24,144,255,0.6)'}
                                />
                            })
                        }{
                        Global.nodes.map((d, i) => {
                            const data = Global.yearData[this.props.year].obj[d]
                            const layer = data.layer
                            const cy = layer * Global.rankHeight / Global.layer + Global.rankR

                            return <circle key={d} cy={cy} r={Global.rankR} cx={Global.rankR}
                                           fill={'rgba(255,77,79,0.8)'}/>
                        })
                    }
                    </g>
                </g>
                // {/*<Time/>*/}
                // {/*<Histograom/>*/}
                // {/*<RankAxis/>*/}
            )
        else {
            return <g/>
        }
    }
}

export default RankItems
