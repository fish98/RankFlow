import React, {Component} from 'react'
import Global from "../Store/Global"
import HistogramItem from "./HistogramsItem"

class Histograms extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <g name={'Histograms'}>{
                Global.yearArr.map(year => {
                    return <g key={year} year={year} transform={`translate(${Global.axisPos[year]})`}>
                        {Global.hisData.hasOwnProperty(year) ? <HistogramItem key={year} year={year}/> : null}
                    </g>
                })}
            </g>
        )
    }
}

export default Histograms
