import axisLabels from './axisLabels';
import adjustTicks from './adjustTicks';

export default function avgRankResize(){
	//clean up the x axis
	axisLabels(this)
	adjustTicks.call(this, 'x', 0, 0, 45, "start");
}

