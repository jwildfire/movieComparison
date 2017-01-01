import makeLongData from "./makeLongData";
import controlsSettings from "./controlsSettings";

import avgRankSettings from "./avgRankSettings";
import avgRankResize from "./avgRankResize";
import avgRankLayout from "./avgRankLayout";

import smallMultipleSettings from "./smallMultipleSettings";
import smallMultipleResize from "./smallMultipleResize";

export default function initCharts(data, tabletop){
  //Make long data set
  var longData = makeLongData(data)

  //Average ranking chart
  var avgRankChart = webCharts.createChart("#avgRankChart", avgRankSettings, null);
  avgRankChart.on("resize",avgRankResize)
  avgRankChart.on("layout",avgRankLayout)
  avgRankChart.init(longData);

  smallMultipleSettings.y.domain=[0,data.length]
  var smallMultipleChart = webCharts.createChart("#detailChart", smallMultipleSettings,controls);
  smallMultipleChart.on("resize",smallMultipleResize)
  webCharts.multiply(smallMultipleChart,longData,"movie")

  //Make the controls
  var people = d3.set(longData.map(function(d){return d.person})).values()
  controlsSettings.inputs[0].values = people
  controlsSettings.inputs[0].start = "Namps!"
  controlsSettings.inputs[1].values = people
  controlsSettings.inputs[1].start = "Sasha"
  var controls = webCharts.createControls('.controls', controlsSettings);
  controls.targets = [avgRankChart, smallMultipleChart]
  controls.init(longData)
  console.log(controls)

  var selects = controls.wrap.selectAll("div.control-group").select("select")
  //Update the highlights on both charts when the controls change
  selects.on("change",function(d){
    var name1 = selects[0][0].value
    var name2 = selects[0][1].value

    avgRankChart.config.person1 = name1
    avgRankChart.config.person2 = name2
    avgRankChart.config.marks[1].values.person = name1
    avgRankChart.config.marks[2].values.person = name2
    avgRankChart.draw()

    //Highlight cells for selected reviewers
    var mults = d3.select("div#detailChart")
    .select("div.wc-small-multiples")
    .selectAll("div.wc-chart")
    console.log(mults)
    var rects = mults
    .select("svg")
    .select("g")
    .select("g.bar-supergroup")
    .selectAll("g.bar-group")
    .selectAll('rect')

    rects.attr("fill","white")

    var person1 = rects.filter(function(d){return d.key == name1})
    person1.attr("fill","yellow")

    var person2 = rects.filter(function(d){return d.key == name2})
    person2.attr("fill","blue")  
  })
}