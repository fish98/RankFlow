import React, {Component} from 'react'
import * as d3 from 'd3';
import Global from "../Store/Global"
import HistogramItem from "./HistogramsItem"
import {toJS} from 'mobx';
import {observer} from 'mobx-react'
import Trend from './trend/trend';
import { Object } from 'core-js';

@observer
class Histograms extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var linePos = toJS(Global.linePos), maxVal = -Infinity, minVal = Infinity;
        Object.values(linePos).forEach(linePosByYear => {
            Object.values(linePosByYear).forEach(data => {
                maxVal = Math.max(data.valLeft, data.valRight, maxVal);
                minVal = Math.min(data.valLeft, data.valRight, minVal);
            })
        });
        var scale = d3.scaleLinear().domain([minVal, maxVal]).range([0.2, 5]);
        return (
            <g name={'Histograms'}>{
                Global.yearArr.map(year => {
                    return <g key={year} year={year} transform={`translate(${Global.axisPos[year]})`}>
                        {Global.hisData.hasOwnProperty(year) ?
                            <HistogramItem key={year}
                                           year={year}/> : null}
                            <Trend data={linePos[+year + 1]} scale={scale}/>
                    </g>
                })}
            </g>
        )
    }
}

export default Histograms
