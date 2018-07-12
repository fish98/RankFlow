
import { drag } from 'd3-drag';
import {mouse} from "d3-selection";
import {line} from 'd3-shape';

function inside (point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    var x = point.x, y = point.y;
    
    var isInside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].x, yi = vs[i].y;
        var xj = vs[j].x, yj = vs[j].y;
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
    }
    
    return isInside;
};

var lasso = function() {
    var items = [],
        area,
        onFunc = {
            start: function(){},
            draw: function(){},
            end: function(){}
        },
        state = [];
    function _lasso(that) {
        var _drag = drag().on('start', start).on('drag', draw).on('end', end);
        area.call(_drag);
        var group = that.append('g').attr('class', 'lasso');
        var initCircle = group.append('circle').attr('class', 'init-circle').attr('display', 'none');
        var lassoPath = group.append('path').attr('class', 'lasso-path');
        var pathPoints = [];
        function start() {
            var mx = mouse(this)[0], my = mouse(this)[1];
            initCircle.attr('cx', mx).attr('cy', my).attr("display", null);
            
            pathPoints = [];
            state.forEach(function(s) {
                s.possible = false;
                s.selected = false;
            });
            onFunc['start']();
        }
        function draw() {
            var mx = mouse(this)[0], my = mouse(this)[1];
            pathPoints.push({
                x: mx, 
                y: my
            });
            
            lassoPath.attr("d", function(d) {
                var _line = line().x(d => d.x).y(d => d.y);
                return _line(pathPoints);
            });

            items.forEach(function (item, i) {
                state[i].possible = inside(item, pathPoints);
            });

            onFunc['draw']();
        }
        function end() {
            items.forEach(function (item, i) {
                state[i].selected = state[i].possible;
                state[i].possible = false;
            })

            lassoPath.attr('d', null);
            initCircle.attr('display', 'none');

            onFunc['end']();
        }
    }

    _lasso.items = function() {
        if(!arguments.length) return items;
        items = arguments[0];
        state = items.map(function() {
            return {
                'possible': false, 
                'selected': false
            }
        });
        return _lasso;
    }

    _lasso.possibleItems = function() {
        return items.filter(function(d, i) {
            return state[i].possible;
        });
    }
    
    _lasso.selectedItems = function() {
        return items.filter(function(d, i) {
            return state[i].selected;
        });
    }
    
    _lasso.notPossibleItems = function() {
        return items.filter(function(d, i) {
            return !state[i].possible;
        });
    }
    
    _lasso.notSelectedItems = function() {
        return items.filter(function(d, i) {
            return !state[i].selected;
        });
    }

    // Events
    _lasso.on = function(type, _) {
        if(!arguments.length) return onFunc;
        if(arguments.length === 1) return onFunc[type];
        if(type in onFunc) {
            onFunc[type] = _;
        }
        return _lasso;
    };

    // Area where lasso can be triggered from
    _lasso.area = function(_) {
        if(!arguments.length) return area;
        area = _;
        return _lasso;
    }
    
    return _lasso;
}

export default lasso;