import React, {Component} from 'react'
import Global from "../../Store/Global"
import HistogramItem from "./HistogramsItem"
import {observer} from 'mobx-react'
import {Object} from 'core-js'

@observer
class Histograms extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            clickIndex: null
        })
        // this.clickItems = this.clickItems.bind(this)
    }

    // clickItems(e) {
    //     const layer = e.target.getAttribute('layer')
    //     const year = e.target.getAttribute('year')
    //     this.setState({
    //         clickLayer: layer,
    //         clickYear: year,
    //     })
    // }

    render() {
        return (
            <g name={'Histograms'} type={this.props.type}>
                {Object.keys(this.props.data.circlePos).map(year => {
                    return <g key={year} year={year} transform={`translate(${Global.axisPos[year]})`}>
                        <HistogramItem key={year}
                                       data={this.props.data}
                                       type={this.props.type}
                            // clickItems={this.clickItems}
                            // clickLayer={this.state.clickLayer}
                            // clickYear={this.state.clickYear}
                                       year={year}/>
                    </g>
                })}
            </g>
        )
    }
}

export default Histograms
