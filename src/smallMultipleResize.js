export default function smallMultipleResize(){
	//Highlight cells for selected reviewers
	var rects = this.svg
	.select("g.bar-supergroup")
	.selectAll("g.bar-group")
	.selectAll('rect')

	var name1 = this.config.person1
	var person1 = rects.filter(function(d){return d.key == name1})
	person1.attr("fill","blue")

	var name2 = this.config.person2
	var person2 = rects.filter(function(d){return d.key == name2})
	person2.attr("fill","yellow")

}

