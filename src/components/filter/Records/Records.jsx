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

    onChange = (e) => {
        console.log(e)
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