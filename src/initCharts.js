import makeLongData from "./makeLongData";
import avgRankSettings from "./avgRankSettings";
import avgRankResize from "./avgRankResize";
import smallMultipleSettings from "./smallMultipleSettings";

export default function initCharts(data, tabletop){
  //Make long data set
  var longData = makeLongData(data)

  //Average ranking chart
  var avgRankChart = webCharts.createChart("#avgRankChart", avgRankSettings,null);
  avgRankChart.on("resize",avgRankResize)
  avgRankChart.init(longData);

  //Small Multiples
  smallMultipleSettings.y.domain=[0,data.length]
  var smallMultipleChart = webCharts.createChart("#detailChart", smallMultipleSettings,null);
  webCharts.multiply(smallMultipleChart,longData,"movie")
}