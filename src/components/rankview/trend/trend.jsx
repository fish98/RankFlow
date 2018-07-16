import React, {
    Component
} from 'react';
import './trend.less';
import {
    toJS
} from 'mobx';
import {
    observer
} from 'mobx-react';
import * as d3 from 'd3';
import Global from '../../Store/Global';

function gauss(mu = 0, sigma = 1) {
    return function (x) {
        return 1 / sigma / Math.sqrt(2 * Math.PI) * Math.exp(-(x - mu) * (x - mu) / 2 / sigma * sigma);
    }
}

function gaussInverse(mu = 0, sigma = 1) {
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
    
    render() {
        var props = this.props;
        var scale = props.scale;
        var stepCount = 20;
        var stepScale = d3.scaleLinear().domain([0, stepCount - 1]).range([0.1, 0.9]);
        this.steps = new Array(stepCount).fill(0).map((d, i) => stepScale(i));
        this.area = d3.area().x((d) => d.x).y0((d) => d.y0).y1((d) => d.y1);
        this.items = props.data ? Object.values(props.data).map(d => {
            var gaussLeft = gaussInverse(0, scale(d.valLeft));
            var gaussRight = gaussInverse(0, scale(d.valRight));
            d.paths = this.steps.map(step => {
                var left = gaussLeft(1 - step) * d.r, right = gaussRight(1 - step) * d.r;
                if(isNaN(left)) left = 0;
                if(isNaN(right)) right = 0;
                return this.area([{
                    x: d.source.x,
                    y0: d.source.y - left,
                    y1: d.source.y + left
                }, {
                    x: d.target.x,
                    y0: d.target.y - right,
                    y1: d.target.y + right
                }]);
            });
            return d;
        }) : [];
        return (
            <g transform={`translate(${Global.subWidth},${ Global.diffHeight})`}> {
                this.items.map(item => {
                    return (<g key={item.name}>{
                        item.paths.map((path, i) => {
                            return <path key={i} d={path} style={{
                                opacity: (1 - this.steps[i])
                            }}  filter="url(#f1)"></path>;
                        })
                    }</g>)
                })
            } </g>
        );
    }
};

export default Trend;