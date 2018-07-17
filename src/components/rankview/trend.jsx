import React, {
    Component
} from 'react';
import {
    toJS
} from 'mobx';
import {
    observer
} from 'mobx-react';
import * as d3 from 'd3';
import Global from '../Store/Global';
import { Object } from 'core-js';

function gauss(mu = 0, sigma = 1) {
    return function (x) {
        return 1 / sigma / Math.sqrt(2 * Math.PI) * Math.exp(-(x - mu) * (x - mu) / 2 / sigma * sigma);
    }
}

function gaussInverseFunc(mu = 0, sigma = 1) {
    return function(y) {
        return mu + Math.sqrt(-2 * sigma * sigma * Math.log(sigma * Math.sqrt(2 * Math.PI) * y));
    }
}

@observer
class Trend extends Component {
    constructor(props) {
        super();
        console.log('Trend Init:', (props));
    }
    componentWillReceiveProps(props) {
        console.log('Trend WPP:', (props));
    }

    render () {
        console.log('Trend Render:', this.props);
        var props = this.props;
        var {scale, linePos, axis} = props;
        var years = Object.keys(axis).sort((a, b) => a - b);

        var stepCount = 20;
        var stepScale = d3.scaleLinear().domain([0, stepCount - 1]).range([0.1, 0.9]);
        var steps = new Array(stepCount).fill(0).map((d, i) => stepScale(i));
        var area = d3.area().curve(d3.curveCardinal).x((d) => d.x).y0((d) => d.y0).y1((d) => d.y1);

        var sections = [];
        if(linePos) {
            Object.values(linePos).forEach(d => {
                var section = [];
                years.forEach(year => {
                    if(d[year] == undefined) {
                        if(section.length) {
                            sections.push(section);
                            section = [];
                        }
                    } else {
                        d[year].year = year;
                        section.push(d[year]);
                    }
                });
                if(section.length) sections.push(section);
            });
        }

        var pathGroups = sections.map(section => {
            var points = [];
            for(let i = 0; i < section.length; i++) {
                var d = section[i];
                points.push({
                    x: axis[d.year],
                    y: d.source.y,
                    val: d.valLeft,
                    r: d.r
                });
                if(i == section.length - 1) {
                    points.push({
                        x: axis[+d.year + 1],
                        y: d.target.y,
                        val: d.valRight,
                        r: d.r
                    });
                }
            }
            return steps.map(step => {
                return area(points.map(point => {
                    var gaussInverse = gaussInverseFunc(0, scale(point.val));
                    var halfWidth = gaussInverse(1 - step) * point.r;
                    if(isNaN(halfWidth)) halfWidth = 0;
                    return {
                        x: point.x,
                        y0: point.y - halfWidth,
                        y1: point.y + halfWidth
                    }
                }));
            });
        });
        return (<g transform={`translate(${Global.subWidth},${ Global.diffHeight})`}>{
            pathGroups.map((pathGroup, i) => {
                return (<g key={i}>{
                    pathGroup.map((path, j) => {
                        return <path key={j} d={path} style={{
                            opacity: (1 - steps[j])
                        }}  filter="url(#f1)"></path>
                    })
                }</g>)
            })
        }</g>);
    }
};

export default Trend;