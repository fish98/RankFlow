import * as d3 from 'd3';

// function kernelDensityEstimator(kernel, x) {
//     return function (sample) {
//         return x.map(function (x) {
//             return {
//                 x: x,
//                 y: d3.mean(sample, function (v) {
//                     return kernel(x - v);
//                 })
//             };
//         });
//     };
// };

// function eKernel(scale) {
//     return function (u) {
//         return Math.abs(u /= scale) <= 1 ? .75 * (1 - u * u) / scale : 0;
//     };
// };

class ViolinMetrics {
    max = null
    upperOuterFence = null
    upperInnerFence = null
    quartile3 = null
    median = null
    mean = null
    iqr = null
    quartile1 = null
    lowerInnerFence = null
    lowerOuterFence = null
    min = null
    kdeData = null
    constructor(values, opts = {
        ticksCount: 8
    }) {
        this.min = d3.min(values);
        this.quartile1 = d3.quantile(values, 0.25);
        this.median = d3.median(values);
        this.mean = d3.mean(values);
        this.quartile3 = d3.quantile(values, 0.75);
        this.max = d3.max(values);
        this.iqr = this.quartile3 - this.quartile1;

        //The inner fences are the closest value to the IQR without going past it (assumes sorted lists)
        var LIF = this.quartile1 - (1.5 * this.iqr);
        var UIF = this.quartile3 + (1.5 * this.iqr);
        for (var i = 0; i <= values.length; i++) {
            if (values[i] < LIF) {
                continue;
            }
            if (!this.lowerInnerFence && values[i] >= LIF) {
                this.lowerInnerFence = values[i];
                continue;
            }
            if (values[i] > UIF) {
                this.upperInnerFence = values[i - 1];
                break;
            }
        }
        this.lowerOuterFence = this.quartile1 - (3 * this.iqr);
        this.upperOuterFence = this.quartile3 + (3 * this.iqr);
        if (!this.lowerInnerFence) {
            this.lowerInnerFence = this.min;
        }
        if (!this.upperInnerFence) {
            this.upperInnerFence = this.max;
        }

        var bandWidth = (this.max - this.min) / opts.ticksCount;
        var kdeData = [{x: this.min, y: 0}];
        for(let start = this.min; this.max - start > 0.001; start += bandWidth) {
            kdeData.push({
                x: start + bandWidth / 2,
                y: 0
            });
        }
        values.forEach(value => {
            let index = Math.floor((value - this.min) / bandWidth) + 1
            if(index >= kdeData.length) {
                index = kdeData.length - 1
            }
            kdeData[index].y++;
        });
        kdeData.push({
            x: this.max,
            y: 0
        });
        kdeData.forEach(d => {
            d.y /= values.length;
        });
        this.kdeData = kdeData;
        // var scale = d3.scaleLinear().domain([this.min, this.max])
        // var kde = kernelDensityEstimator(eKernel(opts.bandwidth), scale.ticks(Math.ceil((this.max - this.min) / opts.bandwidth)));
        // this.kdeData = kde(values);
    }
}

export default ViolinMetrics;