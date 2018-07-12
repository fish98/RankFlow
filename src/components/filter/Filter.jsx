import React, {Component} from 'react'
import {Row, Col} from 'antd'
import * as d3 from 'd3'
import './filter.less'
import {Checkbox} from 'antd'


class Filter extends Component {
    constructor() {
        super()
    }

    componentWillReceiveProps(props) {

    }

    componentDidUpdate() {

    }

    componentDidMount() {
    }

    render() {
        const plainOptions = ['Apple', 'Pear', 'Orange']
        const options = [
            {label: 'Apple', value: 'Apple'},
            {label: 'Pear', value: 'Pear'},
            {label: 'Orange', value: 'Orange'},
        ]
        const optionsWithDisabled = [
            {label: 'Apple', value: 'Apple'},
            {label: 'Pear', value: 'Pear'},
            {label: 'Orange', value: 'Orange', disabled: false},
        ]
        const CheckboxGroup = Checkbox.Group;

        return (
            <div className="filter-wrapper">
                <Row className="filter-wrapper-title">
                    <Col span={8}></Col>
                    <Col span={8}>
                        Filter View
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <div className="filter-wrapper-content">
                    <div>
                        <CheckboxGroup options={plainOptions} defaultValue={['Apple']}/>
                        <br/><br/>
                        <CheckboxGroup options={options} defaultValue={['Pear']}/>
                        <br/><br/>
                        <CheckboxGroup options={optionsWithDisabled} disabled defaultValue={['Apple']}
                        />
                    </div>
                    ,
                </div>
            </div>
        )
    }
}

export default Filter