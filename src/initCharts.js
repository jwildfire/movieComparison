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

  //Small Multiples
  smallMultipleSettings.y.domain=[0,data.length]
  var smallMultipleChart = webCharts.createChart("#detailChart", smallMultipleSettings,controls);
  smallMultipleChart.on("resize",smallMultipleResize)
  webCharts.multiply(smallMultipleChart,longData,"movie")

  //Make the controls
  var people = ["Jeremy", "Namps!","Sasha"]
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
    var person1 = selects[0][0].value
    var person2 = selects[0][1].value

    avgRankChart.config.person1 = person1
    avgRankChart.config.person2 = person2
    avgRankChart.config.marks[1].values.person = person1
    avgRankChart.config.marks[2].values.person = person2
    avgRankChart.draw()

    smallMultipleChart.config.person1 = person1
    smallMultipleChart.config.person2 = person2
    smallMultipleChart.draw()
  })
}