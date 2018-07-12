// import * as d3 from 'd3';
import { drag } from 'd3-drag';
import {event, mouse} from "d3-selection";
import {line} from 'd3-shape';
function inside (point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var isInside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
    }
    
    return isInside;
};

var lasso = function() {

    var items =[],
        hoverSelect = false,
        targetArea,
        on = {start:function(){}, draw: function(){}, end: function(){}};

    // Function to execute on call
    function lasso(_this) {

        // add a new group for the lasso
        var g = _this.append("g")
            .attr("class","lasso");
        
        // add the drawn path for the lasso
        var dyn_path = g.append("path")
            .attr("class","drawn");
        
        // add a closed path
        // var close_path = g.append("path")
        //     .attr("class","loop_close");
        
        // add an origin node
        var origin_node = g.append("circle");
        origin_node.classed("origin", true);

        // The transformed lasso path for rendering
        var tpath;

        // The lasso origin for calculations
        // var origin;

        // The transformed lasso origin for rendering
        // var torigin;

        // Store off coordinates drawn
        var drawnCoords;

         // Apply drag behaviors
        var _drag = drag()
            .on("start",dragstart)
            .on("drag",dragmove)
            .on("end",dragend);

        // Call drag
        targetArea.call(_drag);

        function dragstart() {
            // Init coordinates
            drawnCoords = [];

            // Initialize paths
            tpath = "";
            dyn_path.attr("d", null);
            // close_path.attr("d", null);

            // Set every item to have a false selection and reset their center point and counters
            items.each(function(e) {            
                e.__lasso.possible = false;
                e.__lasso.selected = false;
                e.__lasso.hoverSelect = false;
                e.__lasso.loopSelect = false;
                
                e.__lasso.lassoPoint = [
                    e.x,
                    e.y
                ]
                // var box = e.getBoundingClientRect();
                // e.__lasso.lassoPoint = [box.left + box.width / 2, box.top + box.height / 2];
            });

            // if hover is on, add hover function
            if(hoverSelect) {
                items.on("mouseover.lasso",function() {
                    // if hovered, change lasso selection attribute to true
                    this.__lasso.hoverSelect = true;
                });
            }
            var tx = mouse(this)[0];
            var ty = mouse(this)[1];
            // console.log(`x:${x}, y:${y}, tx:${tx}, ty:${ty}`);

            // Initialize the path or add the latest point to it
            
            tpath = tpath + "M " + tx + " " + ty;
            // origin = [x,y];
            // torigin = [tx,ty];
            // Draw origin node
            origin_node
                .attr("cx", tx)
                .attr("cy", ty)
                .attr("display",null);
            
            // Run user defined start function
            on.start();
        }

        function dragmove() {
            // Get mouse position within body, used for calculations
            var x,y;
            if(event.sourceEvent.type === "touchmove") {
                x = event.sourceEvent.touches[0].clientX;
                y = event.sourceEvent.touches[0].clientY;
            }
            else {
                x = event.sourceEvent.clientX;
                y = event.sourceEvent.clientY;
            }
            

            // Get mouse position within drawing area, used for rendering
            var tx = mouse(this)[0];
            var ty = mouse(this)[1];
            // console.log(`x:${x}, y:${y}, tx:${tx}, ty:${ty}`);

            // Initialize the path or add the latest point to it
            if (tpath==="") {
                tpath = tpath + "M " + tx + " " + ty;
                // origin = [x,y];
                // torigin = [tx,ty];
                // Draw origin node
                origin_node
                    .attr("cx",tx)
                    .attr("cy",ty)
                    .attr("r",7)
                    .attr("display",null);
            }
            else {
                tpath = tpath + " L " + tx + " " + ty;
            }

            drawnCoords.push([tx,ty]);

            // Set the closed path line
            // var close_draw_path = "M " + tx + " " + ty + " L " + torigin[0] + " " + torigin[1];

            // Draw the lines
            dyn_path.datum(drawnCoords.map(d => ({x: d[0], y: d[1]}))).attr("d", function(d) {
                var _line = line().x(d => d.x).y(d => d.y);
                console.log(`line: ${_line(d)}, tpath: ${tpath}`);
                return _line(d);
            });

            // close_path.attr("d",close_draw_path);

            items.each(function(n) {
                n.__lasso.loopSelect = inside(n.__lasso.lassoPoint, drawnCoords);
                n.__lasso.possible = n.__lasso.hoverSelect || n.__lasso.loopSelect; 
            });

            on.draw();
        }

        function dragend() {
            // Remove mouseover tagging function
            items.on("mouseover.lasso", null);

            items.each(function(n) {
                n.__lasso.selected = n.__lasso.possible;
                n.__lasso.possible = false;
            }); 

            // Clear lasso
            dyn_path.attr("d",null);
            // close_path.attr("d",null);
            origin_node.attr("display", "none");

            // Run user defined end function
            on.end();
        }
    }

    // Set or get list of items for lasso to select
    lasso.items  = function(_) {
        if (!arguments.length) return items;
        items = _;
        var nodes = items;
        nodes.each(function(n) {
            n.__lasso = {
                "possible": false,
                "selected": false
            };
        });
        return lasso;
    };

    // Return possible items
    lasso.possibleItems = function() {
        return items.filter(function(d) {
            return d.__lasso.possible;
        });
    }

    // Return selected items
    lasso.selectedItems = function() {
        return items.filter(function(d) {
            return d.__lasso.selected;
        });
    }

    // Return not possible items
    lasso.notPossibleItems = function() {
        return items.filter(function(d) {
            return !d.__lasso.possible;
        });
    }

    // Return not selected items
    lasso.notSelectedItems = function() {
        return items.filter(function(d) {
            return !d.__lasso.selected;
        });
    }

    // Option to select on hover or not
    lasso.hoverSelect = function(_) {
        if (!arguments.length) return hoverSelect;
        hoverSelect = _===true ? true : false;
        return lasso;
    };

    // Events
    lasso.on = function(type,_) {
        if(!arguments.length) return on;
        if(arguments.length === 1) return on[type];
        var types = ["start", "draw", "end"];
        if(types.indexOf(type)>-1) {
            on[type] = _;
        }
        return lasso;
    };

    // Area where lasso can be triggered from
    lasso.targetArea = function(_) {
        if(!arguments.length) return targetArea;
        targetArea = _;
        return lasso;
    }
    
    return lasso;
    
}

export default lasso;