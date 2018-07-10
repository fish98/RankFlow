import React, {Component} from 'react'
import * as d3 from 'd3'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'
import {Tooltip} from 'antd'

@observer
class BrushesItem extends Component {
    constructor(props) {
        super(props)
        this.y = d3.scaleLinear().domain([0, Global.layer]).range([0, Global.rankHeight - Global.diffHeight])
        this.brush = d3.brushY().extent([[0, 0], [Global.eachWidth - Global.subWidth, Global.rankHeight - Global.diffHeight]])
            .on('end', this.ended)
        this.newNodesLayer = new Set()


    }

    ended = (e) => {
        const d = d3
        const year = this.props.year
        if (!d3.event.sourceEvent) {//选完之后
            // Global.saveNodes[year] = this.saveNodes
            Global.setSaveNodes(year, this.newNodesLayer)
            return
        }// Only transition after input.
        if (!d3.event.selection) {//取消掉这行全选
            this.newNodesLayer = new Set()
            // Global.saveNodes[year] = this.saveNodes
            Global.setSaveNodes(year, this.newNodesLayer)
            return // Ignore empty selections.
        }
        const eachHight = (Global.rankHeight - Global.diffHeight) / Global.layer
        let x0 = Math.floor(d3.event.selection[0] / eachHight)
        let x1 = (Math.floor(d3.event.selection[1] / eachHight) + 1)
        if (x0 > x1) {
            const t = x1
            x1 = x0
            x0 = t
        }
        const s = `${year}_Brush`
        this.newNodesLayer = new Set()
        Global.nodes.forEach(name => {
            if (Global.yearData[year].obj.hasOwnProperty(name) && Global.yearData[year].obj[name].layer >= x0 && Global.yearData[year].obj[name].layer < x1) {//从x0层开始到x1层开始，选的是x0层
                this.newNodesLayer.add(name)
            }
        })
        d3.select(this.refs[s]).transition().call(this.brush.move, [x0 * eachHight, x1 * eachHight - Global.hisDataHeightSel])

        //如果当前
        // if (Global.saveNodes.length) {
        //     Global.saveNodes.filter(name => this.newNodesLayer.hasOwnProperty(name))
        // }
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

    onMouseOver = () => {
        console.log(1111111)
    }

    componentDidMount() {
        const s = `${this.props.year}_Brush`
        d3.select(this.refs[s]).call(this.brush)
    }

    render() {
        const year = this.props.year
        const s = `${year}_Brush`
        return (
            <g ref={s} transform={`translate(${Global.subWidth},${ Global.diffHeight})`}>
                <rect year={year} width={Global.eachWidth - Global.subWidth}
                      height={Global.rankHeight - Global.diffHeight}
                      opacity={0.1}
                      onMouseOver={this.onMouseOver}
                />
            </g>
        )
    }
}

export default BrushesItem
