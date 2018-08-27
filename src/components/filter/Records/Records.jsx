import React, {Component} from 'react'
import * as d3 from 'd3'
import {observer} from 'mobx-react'
import Global from '../../Store/Global'
import {Button} from 'antd'
import {Checkbox} from 'antd'

@observer
class Records extends Component {
    constructor() {
        super()
    }

    onChange = (checkedValue) => {
        console.log('checkedValue', checkedValue)
        const sum = checkedValue.length
        switch (sum){
            case 0:{
                Global.setCompareFlag(false)
                Global.setOldData(Global.initData)
                break
            }
            case 1:{
                Global.setCompareFlag(true)
                Global.setNewData(Global.recordsNewData[checkedValue[0]])
                break
            }
            case 2:{
                Global.setCompareFlag(true)
                Global.setOldData(Global.recordsNewData[checkedValue[0]])
                Global.setNewData(Global.recordsNewData[checkedValue[1]])
            }
        }
    }

    render() {
        const CheckboxGroup = Checkbox.Group
        const label = Global.recordsFilter.map((d, i) => {
            return {label: i, value: i}
        })
        return (<CheckboxGroup
                onChange={this.onChange}
                options={label}>
            </CheckboxGroup>
        )
    }
}

export default Records