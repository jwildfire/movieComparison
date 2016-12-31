//adds count and shortens movie titles for labels
export default function axisLabels(chart){
  var y_labels = chart.svg
  .select(".x.axis")
  .selectAll(".tick text")
  .text(function(d){
   var count = chart.raw_data.filter(function(e){return d==e.movie}).length
   return d.slice(0,25) +" ("+count+")"
  })
}