// Size ?
var width = 1250
var height = 500

// The svg
var svg = d3.select('#world-map-svg')
    .attr("width", width)
    .attr("height", height)

var tooltip = d3.select('#world-map-text');

// Map and projection
var projection = d3.geoMercator()
    .center([-35, 20])                // GPS of location to zoom on
    .scale(285)                       // This is like the zoom
    .translate([width / 2, height / 2])

// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function (data) {
    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("fill", "#b8b8b8")
        .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "black")
        .style("opacity", .3)

    // Three function that change the tooltip when user hover / move / leave a cell
    var mousemove = function (d) {
        tooltip
            .html(`<div class="map-title">${d.name}</div>` + d.artworks.reduce((acc, item, i) => acc + `<div class="map-item">${i+1}. ${item}</div>`, ''))
            .style("left", (d3.mouse(this)[0] + 10) + "px")
            .style("top", (d3.mouse(this)[1]) + "px");
    }
    var mouseleave = function (d) {
        tooltip.html('');
    }

    // Add circles:
    svg
        .selectAll("myCircles")
        .data(markers)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return projection([d.long, d.lat])[0] })
        .attr("cy", function (d) { return projection([d.long, d.lat])[1] })
        .attr("r",  function (d) { return 3 + d.artworks.length})
        .attr("class", "circle")
        .style("fill", "#034f11")
        .attr("stroke", "#034f11")
        .attr("stroke-width", 1)
        .attr("fill-opacity", .2)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

})