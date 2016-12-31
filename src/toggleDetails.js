//toggle details 
function toggleDetails(chart, id){

console.log(chart)

var points = chart.svg
.select("g.point-supergroup")
.selectAll("g.point")

var point=points
.select("circle")
.filter(function(d){return d.key==id})

point.classed("highlight", !point.classed("highlight"))

//show the detail charts
var selected =  chart.svg
.select("g.point-supergroup")
.selectAll("g.point circle.highlight")
.data()
.map(function(d){return d.key})

console.log(detailChart)

}
