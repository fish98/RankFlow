import React, {Component} from 'react'
import * as d3 from 'd3'
import {observer} from 'mobx-react'
import Global from '../../Store/Global'
import {Button} from 'antd'
import {Checkbox} from 'antd'
import Draggable, {DraggableCore} from 'react-draggable'

@observer
class Records extends Component {
    constructor() {
        super()

        this.state = ({
            activeDrags: 0,
            deltaPosition: {
                x: 0, y: 0
            },
            controlledPosition: {
                x: -400, y: 200
            }
        })
    }

    onStart = () => {
        this.setState({activeDrags: ++this.state.activeDrags})
    }

    onStop = () => {
        this.setState({activeDrags: --this.state.activeDrags})
    }

    onChange = (checkedValue) => {
        console.log('checkedValue', checkedValue)
        const sum = checkedValue.length
        switch (sum) {
            case 0: {
                Global.setCompareFlag(false)
                Global.setOldData(Global.initData)
                break
            }
            case 1: {
                Global.setCompareFlag(true)
                Global.setNewData(Global.recordsNewData[checkedValue[0]])
                break
            }
            case 2: {
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
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop}

        return (
            <CheckboxGroup
                onChange={this.onChange}
                options={label}>
            </CheckboxGroup>
            // <Draggable bounds={{top: -100, left: -100, right: 100, bottom: 100}} {...dragHandlers}>
            //     <div className="box">I can only be moved 100px in any direction.</div>
            //
            // </Draggable>

        )
    }
}

export default Records