"use strict";

var movieComparison = (function () {
	'use strict';

	//Make an object with one record per review (per person)
	function makeLongData(data) {

		var longData = [];
		var movies = Object.getOwnPropertyNames(data[1]).slice(2);

		data.forEach(function (d) {
			movies.forEach(function (m) {
				longData.push({
					person: d["Who are you? "],
					movie: m,
					score: +d[m]
				});
			});
		});

		longData = longData.filter(function (d) {
			return d.score >= 1;
		});
		return longData;
	}

	////////////////////////////////
	//average movie rankings chart
	////////////////////////////////

	var avgRankSettings = {
		"width": 1200,
		"height": 350,
		resizable: false,
		"y": {
			"label": "Average Rating",
			"type": "linear",
			"column": "score",
			"format": "0.1f",
			"domain": [1, 5]
		},
		"x": {
			"type": "ordinal",
			"label": "",
			"column": "movie",
			"sort": "total-descending"
		},
		"margin": { bottom: 150, right: 75 },
		gridlines: "y",
		"marks": [{
			"type": "circle",
			"per": ["movie"],
			"summarizeY": "mean",
			"attributes": {
				"fill": "white",
				"stroke": "black",
				"stroke-width": 2
			}
		}, {
			"type": "circle",
			"per": ["movie", "person"],
			"summarizeY": "mean",
			"attributes": {
				"stroke": "black",
				"stroke-width": 1,
				"fill": "yellow",
				"fill-opacity": 0.5,
				"transform": "translate(2,0)"
			},
			values: { person: "Sasha" }
		}, {
			"type": "circle",
			"per": ["movie", "person"],
			"summarizeY": "mean",
			"attributes": {
				"stroke": "black",
				"stroke-width": 1,
				"fill": "blue",
				"fill-opacity": 0.5,
				"transform": "translate(-2,0)"

			},
			values: { person: "Namps!" }
		}, {
			"type": "line",
			"per": ["movie"],
			"attributes": {
				"stroke": "black",
				"stroke-width": 2
			},
			values: { person: ["Sasha", "Namps!"] }
		}, {
			"type": "text",
			"per": ["movie"],
			"summarizeY": "mean",
			"text": "$y",
			"attributes": {
				"text-anchor": "middle",
				"dy": "-10",
				"alignment-baseline": "middle",
				"font-size": 8
			}
		}

		/*{
    "type":"line",
    "per":["movie"],
    "attributes":{"stroke-opacity":0.2, "stroke-dasharray":"3 3", "stroke":"#888"}
  }*/
		]
	};

	//adds count and shortens movie titles for labels
	function axisLabels(chart) {
		var y_labels = chart.svg.select(".x.axis").selectAll(".tick text").text(function (d) {
			var count = chart.raw_data.filter(function (e) {
				return d == e.movie;
			}).length;
			return d.slice(0, 25) + " (" + count + ")";
		});
	}

	function adjustTicks(axis, dx, dy, rotation, anchor) {
		if (!axis) return;
		this.svg.selectAll("." + axis + ".axis .tick text").attr({
			"transform": "rotate(" + rotation + ")",
			"dx": dx,
			"dy": dy
		}).style("text-anchor", anchor || 'end');
	}

	function avgRankResize() {
		//clean up the x axis
		axisLabels(this);
		adjustTicks.call(this, 'x', 0, 0, 45, "start");
	}

	////////////////////////////////
	// movie details chart
	////////////////////////////////
	var smallMultipleSettings = {
		"width": 150,
		"height": 150,
		resizable: false,
		"x": {
			"label": "Rating",
			"type": "ordinal",
			"column": "score",
			"label": "",
			"format": "0.1f",
			domain: [1, 2, 3, 4, 5]
		},
		"y": {
			"type": "linear",
			"column": "score",
			"label": ""
		},
		"marks": [{
			"type": "bar",
			"arrange": "stacked",
			"group": "person",
			"summarizeY": "count",
			"split": "person",
			"per": ["score"],
			"attributes": {
				"fill": "white",
				"stroke": "black",
				"stroke-width": "2px",
				"style": "clip-path:null"
			},
			"tooltip": '[person] gave [movie] a [score]'
		}]
	};

	function initCharts(data, tabletop) {
		//Make long data set
		var longData = makeLongData(data);

		//Average ranking chart
		var avgRankChart = webCharts.createChart("#avgRankChart", avgRankSettings, null);
		avgRankChart.on("resize", avgRankResize);
		avgRankChart.init(longData);

		//Small Multiples
		smallMultipleSettings.y.domain = [0, data.length];
		var smallMultipleChart = webCharts.createChart("#detailChart", smallMultipleSettings, null);
		webCharts.multiply(smallMultipleChart, longData, "movie");
	}

	return initCharts;
})();

