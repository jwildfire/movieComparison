'use strict';

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

	var controlsSettings = {
		location: 'top',
		inputs: [{ type: "dropdown", option: "person1", label: "Person #1", require: true }, { type: "dropdown", option: "person2", label: "Person #2", require: true }]
	};

	////////////////////////////////
	//average movie rankings chart
	////////////////////////////////
	var avgRankSettings = {
		"person1": "Jeremy",
		"person2": "Sasha",
		"width": 1200,
		"height": 350,
		resizable: false,
		"y": {
			"label": "Average Rating",
			"type": "linear",
			"column": "score",
			"format": "0.1f",
			"domain": [0.8, 5]
		},
		"x": {
			"type": "ordinal",
			"label": "",
			"column": "movie",
			"sort": "total-descending"
		},
		"margin": { bottom: 150, right: 75 },
		"gridlines": "y",
		"marks": [{
			"type": "circle",
			"per": ["movie"],
			"summarizeY": "mean",
			"tooltip": 'The mean score for [movie] was %y',
			"attributes": {
				"fill": "white",
				"stroke": "black",
				"stroke-width": 2
			}
		}, {
			"type": "circle",
			"per": ["movie", "person"],
			"summarizeY": "mean",
			"tooltip": '[person] gave [movie] a [score]',
			"attributes": {
				"stroke": "black",
				"stroke-width": 1,
				"fill": "yellow",
				"fill-opacity": 0.5,
				"transform": "translate(2,0)"
			},
			"values": { "person": null } //set in callback
		}, {
			"type": "circle",
			"per": ["movie", "person"],
			"summarizeY": "mean",
			"tooltip": '[person] gave [movie] a [score]',
			"attributes": {
				"stroke": "black",
				"stroke-width": 1,
				"fill": "blue",
				"fill-opacity": 0.5,
				"transform": "translate(-2,0)"
			},
			"values": { "person": null } //set in callback
		}, {
			"type": "text",
			"per": ["movie"],
			"summarizeY": "mean",
			"text": "$y",
			"tooltip": '[person] gave [movie] a [score]',
			"attributes": {
				"text-anchor": "middle",
				"dy": "-10",
				"alignment-baseline": "middle",
				"font-size": 8
			}
		}]
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

	function avgRankLayout() {
		//set the person filters
		this.config.marks[1].values.person = this.config.person1;
		this.config.marks[2].values.person = this.config.person2;
	}

	////////////////////////////////
	// movie details chart
	////////////////////////////////
	var smallMultipleSettings = {
		"person1": "Jeremy",
		"person2": "Sasha",
		"width": 150,
		"height": 150,
		"resizable": false,
		"x": {
			"label": "Rating",
			"type": "ordinal",
			"column": "score",
			"label": "",
			"format": "0.1f",
			"domain": [1, 2, 3, 4, 5]
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

	function smallMultipleResize() {
		//Highlight cells for selected reviewers
		var rects = this.svg.select("g.bar-supergroup").selectAll("g.bar-group").selectAll('rect');

		var name1 = this.config.person1;
		var person1 = rects.filter(function (d) {
			return d.key == name1;
		});
		person1.attr("fill", "blue");

		var name2 = this.config.person2;
		var person2 = rects.filter(function (d) {
			return d.key == name2;
		});
		person2.attr("fill", "yellow");
	}

	function initCharts(data, tabletop) {
		//Make long data set
		var longData = makeLongData(data);

		//Average ranking chart
		var avgRankChart = webCharts.createChart("#avgRankChart", avgRankSettings, null);
		avgRankChart.on("resize", avgRankResize);
		avgRankChart.on("layout", avgRankLayout);
		avgRankChart.init(longData);

		//Small Multiples
		smallMultipleSettings.y.domain = [0, data.length];
		var smallMultipleChart = webCharts.createChart("#detailChart", smallMultipleSettings, controls);
		smallMultipleChart.on("resize", smallMultipleResize);
		webCharts.multiply(smallMultipleChart, longData, "movie");

		//Make the controls
		var people = d3.set(longData.map(function (d) {
			return d.person;
		})).values();
		controlsSettings.inputs[0].values = people;
		controlsSettings.inputs[0].start = "Namps!";
		controlsSettings.inputs[1].values = people;
		controlsSettings.inputs[1].start = "Sasha";
		var controls = webCharts.createControls('.controls', controlsSettings);
		controls.targets = [avgRankChart, smallMultipleChart];
		controls.init(longData);
		console.log(controls);

		var selects = controls.wrap.selectAll("div.control-group").select("select");
		//Update the highlights on both charts when the controls change
		selects.on("change", function (d) {
			var name1 = selects[0][0].value;
			var name2 = selects[0][1].value;

			avgRankChart.config.person1 = name1;
			avgRankChart.config.person2 = name2;
			avgRankChart.config.marks[1].values.person = name1;
			avgRankChart.config.marks[2].values.person = name2;
			avgRankChart.draw();

			//Highlight cells for selected reviewers
			var mults = d3.select("div#detailChart").select("div.wc-small-multiples").selectAll("div.wc-chart");
			console.log(mults);
			var rects = mults.select("svg").select("g").select("g.bar-supergroup").selectAll("g.bar-group").selectAll('rect');

			console.log(rects);
			rects.attr("fill", "white");

			var person1 = rects.filter(function (d) {
				return d.key == name1;
			});
			person1.attr("fill", "blue");

			var person2 = rects.filter(function (d) {
				return d.key == name2;
			});
			person2.attr("fill", "yellow");
		});
	}

	return initCharts;
})();

