import React, {Component} from 'react'
import * as d3 from 'd3'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'
import {Tooltip} from 'antd'

@observer
class LinechartsItems extends Component {
    constructor(props) {
        super(props)
        this.dealData = this.dealData.bind(this)
        this.state = ({
            textFlag: ""
        })
        this.onMouseOver = this.onMouseOver.bind(this)
        this.onMouseOut = this.onMouseOut.bind(this)
    }

    dealData(year) {
        let eleHis = {}
        let r = {}
        Global.elements.forEach(e => {
            eleHis[e] = {count: 0, l: 0}
        })
        Object.keys(Global.circlePos[year]).forEach(name => {
            const data = Global.yearData[year].obj[name]
            // const people = Global.yearData[year].arr.length
            // const sum = data.variance_per * data.rankL
            Object.keys(data.data_per).forEach(e => {
                eleHis[e].count += data.data_per[e]
                eleHis[e].l += 1
            })
        })
        // const compute = d3.scaleLinear().domain([0, 1]).range([0, Global.diffHeight])
        this.title = Object.keys(eleHis).map(e => {
            if (eleHis[e].l){
                r[e] = eleHis[e].count / eleHis[e].l
            }
            // return <div>{`${e}:${(eleHis[e].count / eleHis[e].l).toFixed(2)}`}</div>
        })
        return r
    }

    onMouseOver(e) {

        this.setState({
            textFlag: e.target.getAttribute('ele')
        })
    }

    onMouseOut(e) {
        this.setState({
            textFlag: ""
        })
    }

    render() {
        const year = this.props.year
        const r = this.dealData(year)
        const width = 5
        return (
            <g transform={`translate(${Global.subWidth})`}>
                {Object.keys(r).map((e, i) => {
                    const height = r[e] * Global.diffHeight/100*2
                    return <g key={`${year}_${e}_linechart`}>
                        <rect height={height}
                              width={width}
                              x={i * width}
                              y={Global.diffHeight - height}
                              fill={'#89de64'}
                              key={`${year}_${e}`}/>
                              // strokeWidth={1}
                              // stroke={'grey'}/>
                        <text x={i * width}
                              key={`${year}_${e}_text`}
                              y={30}
                              fontSize={10}
                              opacity={this.state.textFlag === e ? 1 : 0}
                        >
                            {`${e}:${r[e].toFixed(2)}%`}
                        </text>
                        <rect height={Global.diffHeight}
                              key={`${year}_${e}_`}
                              width={width}
                              x={i * width}
                              y={0}
                              opacity={0}
                              ele={e}
                              onMouseOver={this.onMouseOver}
                              onMouseOut={this.onMouseOut}
                        />

                    </g>
                })}
            </g>
        )
    }
}

export default LinechartsItems
