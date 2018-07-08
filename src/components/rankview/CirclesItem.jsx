import React, {Component} from 'react'
import * as d3 from 'd3'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'
import {Tooltip} from 'antd'

@observer
class CirclesItem extends Component {
    constructor(props) {
        super(props)
        this.compute = d3.interpolate(d3.rgb(255, 0, 0, 1), d3.rgb(255, 0, 0, 0.5))
    }

    onMouseOver(e) {
        Global.setOverNode(e.target.getAttribute('name'))
    }

    onMouseOut(e) {
        Global.setOverNode([])
    }

    onClick(e) {
        let name = e.target.getAttribute('name')
        if (Global.selectNode === name) {
            name = []
        }
        Global.setSelectNode(name)
    }

    render() {
        const year = this.props.year
        return (
            <g transform={`translate(-15,${ Global.diffHeight})`}>
                {
                    Object.keys(Global.circlePos[year]).map(name => {
                        const data = Global.circlePos[year][name]
                        const linear = d3.scaleLinear()
                            .domain([Math.sqrt(Global.minVar), Math.sqrt(Global.maxVar)])
                            .range([0, 1])
                        console.log(Math.sqrt(Global.yearData[year].obj[name].variance))
                        const fill = this.compute(linear(Math.sqrt(Global.yearData[year].obj[name].variance)))
                        const circleNode = <div><p>{name}</p>
                            <p>mean_rank:{Global.yearData[year].obj[name].mean_rank}</p></div>
                        return <Tooltip title={circleNode}>
                            <circle key={`${year}_${name}`} cy={data.cy} r={Global.rankR} cx={data.cx}
                                    name={name}
                                    onMouseOver={this.onMouseOver}
                                    onMouseOut={this.onMouseOut}
                                    onClick={this.onClick}
                                    fill={fill}/>
                        </Tooltip>
                    })
                }
            </g>
        )
    }
}

export default CirclesItem
