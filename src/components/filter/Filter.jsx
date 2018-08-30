import React, {Component} from 'react'
import {Row, Col} from 'antd'
import * as d3 from 'd3'
import './filter.less'
import {Checkbox, TreeSelect} from 'antd'
import {observer} from 'mobx-react'
import Global from '../Store/Global'
import {Button} from 'antd'
import Records from "./Records/Records"

@observer
class Filter extends Component {
    constructor() {
        super()
        this.onChangeEles = this.onChangeEles.bind(this)
        this.onChangeYears = this.onChangeYears.bind(this)
        this.onChangeNodes = this.onChangeNodes.bind(this)
        this.onClick = this.onClick.bind(this)
        this.filterEles = []
        this.filterYears = []
        this.filterNodes = []
    }

    componentWillReceiveProps(props) {

    }

    componentDidUpdate() {

    }

    componentDidMount() {

    }

    onClick() {
        let r = {}
        r.names = this.filterNodes
        r.eles = this.filterEles
        r.years = this.filterYears
        Global.setFilterObj(r)
    }

    onChangeEles(checkedValues) {
        this.filterEles = checkedValues
    }

    onChangeYears(checkedValues) {
        if (checkedValues[0] === 'All years') {
            checkedValues = Global.yearArr
        }
        this.filterYears = checkedValues
    }

    onChangeNodes(checkedValues) {
        if (checkedValues[0] === 'All items') {
            checkedValues = Global.nodes
        }
        this.filterNodes = checkedValues
    }

    onChange(e) {
        console.log(e)
    }

    onClickInit(e) {
        Global.setOldData(Global.initData)
        Global.setCompareFlag(false)
    }

    onClickRecord(e) {
        Global.setRecord()
    }

    render() {
        // const optionsEles = Global.elements.filter(ele => {
        //     return Global.yearData[Global.clickYear].obj[Global.selectNode].data.hasOwnProperty(ele)
        // })
        // const optionsYears = ['All years'].concat(Global.yearArr.filter(year => {
        //     return Global.yearData[year].obj.hasOwnProperty(Global.selectNode)
        // }))
        const optionsYears = ['All years'].concat(Global.yearArr)
        const optionsEles = Global.elements
        let optionsNodes = []
        if (Global.selectNode === null) {
            optionsNodes = ['All items']
        }
        else {
            optionsNodes = ['All items', Global.selectNode]
        }
        const CheckboxGroup = Checkbox.Group
        const TreeNode = TreeSelect.TreeNode

        return (
            <div className="filter-wrapper">

                {/*<div className="filter-wrapper-content"><TreeSelect*/}
                {/*showSearch*/}
                {/*style={{width: 270}}*/}
                {/*// value={this.state.value}*/}
                {/*dropdownStyle={{maxHeight: 400, overflow: 'auto'}}*/}
                {/*placeholder="Please select"*/}
                {/*allowClear*/}
                {/*multiple*/}
                {/*treeDefaultExpandAll*/}
                {/*onChange={this.onChange}*/}
                {/*>*/}
                {/*<TreeNode value="parent 1" title="parent 1" key="0-1">*/}
                {/*<TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">*/}
                {/*<TreeNode value="leaf1" title="my leaf" key="random"/>*/}
                {/*<TreeNode value="leaf2" title="your leaf" key="random1"/>*/}
                {/*</TreeNode>*/}
                {/*<TreeNode value="parent 1-1" title="parent 1-1" key="random2">*/}
                {/*<TreeNode value="sss" title={<b style={{color: '#08c'}}>sss</b>} key="random3"/>*/}
                {/*</TreeNode>*/}
                {/*</TreeNode>*/}
                {/*</TreeSelect>*/}

                <div>
                    <CheckboxGroup options={optionsEles} onChange={this.onChangeEles}/>
                    <br/><br/>
                    <CheckboxGroup options={optionsYears} onChange={this.onChangeYears}/>
                    <br/><br/>
                    <CheckboxGroup options={optionsNodes} onChange={this.onChangeNodes}/>
                </div>
                <div>
                    <Button type="primary" onClick={this.onClick}>Filter</Button>
                    <Button type="primary" onClick={this.onClickInit}>Init</Button>
                    <Button type="primary" onClick={this.onClickRecord}>Record</Button>
                </div>
                <Records/>
                {/*</div>*/}
            </div>
        )
    }
}

export default Filter