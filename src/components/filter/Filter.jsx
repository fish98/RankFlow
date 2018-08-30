import React, { Component } from 'react'
import { Row, Col } from 'antd'
import * as d3 from 'd3'
import './filter.less'
import { Checkbox, Tree } from 'antd'
import { observer } from 'mobx-react'
import Global from '../Store/Global'
import { Button } from 'antd'
import Records from "./Records/Records"
import Item from 'antd/lib/list/Item';

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

    onChangeEles = (checkedKeys) => {
        this.filterEles = checkedKeys.checked
    }

    onChangeYears = (checkedKeys) => {
        if (checkedKeys.checked.indexOf('All years') >= 0) {
            checkedKeys.checked = ['All years'].concat(Global.yearArr)
        }
        this.filterYears = checkedKeys.checked
    }

    onChangeNodes = (checkedKeys) =>{
        if (checkedKeys.checked.indexOf('All items') >= 0) {
            checkedKeys.checked = ['All items'].concat(Global.selectNode)
        }
        this.filterNodes = checkedKeys.checked
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
        const TreeNode = Tree.TreeNode
        return (
            <div className="filter-wrapper">
                <div className="filter-trees">

                    {/* Here goes the Tree Components */}
                    {/* Element Filter Here */}

                    {optionsEles.length ?
                        <Tree
                            checkable
                            checkStrictly
                            defaultExpandAll
                            onCheck={this.onChangeEles}
                        >
                            <TreeNode title="Elements" key="elements" disableCheckbox disabled >
                                {optionsEles.map(item => {
                                    return <TreeNode title={item} key={item} />
                                })}
                            </TreeNode>
                        </Tree> : ""}

                    {/* Years Filter Here  */}

                    {optionsYears.length ?
                        <Tree
                            checkable
                            checkStrictly
                            onCheck={this.onChangeYears}
                        >
                            <TreeNode title="Years" key="years" >
                                {optionsYears.map(item => {
                                    return <TreeNode title={item} key={item} />
                                })}
                            </TreeNode>
                        </Tree> : ""}

                    {/* Nodes Filter Here */}

                    {optionsNodes.length
                        ? 
                    <Tree 
                        checkable
                        checkStrictly
                        onCheck={this.onChangeNodes}
                    >
                        <TreeNode title="Nodes" key="nodes" >
                            {optionsNodes.map(item => {
                                return <TreeNode title={item} key={item} />
                            })}
                        </TreeNode>
                    </Tree> : ""}
                </div>
                <div className="button-container">
                    <Button className="button" type="primary" onClick={this.onClick}>Filter</Button>
                    <Button className="button" type="primary" onClick={this.onClickInit}>Init</Button>
                    <Button className="button" type="primary" onClick={this.onClickRecord}>Record</Button>
                </div>
                <Records />
                {/*</div>*/}
            </div>
        )
    }
}

export default Filter