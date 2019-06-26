var text = `
<text x="250" y="435" font-family="Open Sans" font-size="16px">Burkina Faso</text>
<text x="490" y="585" font-family="Open Sans" font-size="16px">Cameroon</text>
<text x="600" y="400" font-family="Open Sans" font-size="16px">Chad</text>
<text id="label-gambia" x="10"  y="435" font-family="Open Sans" font-size="16px">Gambia</text>
<text x="100" y="450" font-family="Open Sans" font-size="16px">Guinea</text>
<text x="250" y="370" font-family="Open Sans" font-size="16px">Mali</text>
<text x="100" y="300" font-family="Open Sans" font-size="16px">Mauritania</text>
<text x="450" y="350" font-family="Open Sans" font-size="16px">Niger</text>
<text x="420" y="480" font-family="Open Sans" font-size="16px">Nigeria</text>
<text x="40"  y="380" font-family="Open Sans" font-size="16px">Senegal</text>

<text id="yr-disp" x="370" y="160" font-family="Open Sans" font-size="24px">2000</text>
<text id="yr-back" x="350" y="160" font-family="Open Sans" font-size="24px">&lt;</text>
<text id="yr-frwd" x="430" y="160" font-family="Open Sans" font-size="24px">&gt;</text>
`
var minYear = 2000;
var maxYear = 2016;
var curYear = 2000;

// set up colors
//~ var colours = ["#6363FF", "#6373FF", "#63A3FF", "#63E3FF", "#63FFFB", "#63FFCB",
               //~ "#63FF9B", "#63FF6B", "#7BFF63", "#BBFF63", "#DBFF63", "#FBFF63", 
               //~ "#FFD363", "#FFB363", "#FF8363", "#FF7363", "#FF6364"];

var colours = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"];

var heatmapColour = d3.scaleLinear()
  .domain(d3.range(0, 1, 1.0 / (colours.length - 1)))
  .range(colours);

// dynamic bit...
// var c = d3.scaleLinear().domain(d3.extent(dataset)).range([0,1]);
var c = d3.scaleLinear().domain([0,100]).range([0,1]);

var random = d3.randomUniform(0, 100);

d3.xml("img/sahel.svg", function(xml) {
var importedNode = document.importNode(xml.documentElement, true);
d3.select("#map")
	.each(function() {
		this.appendChild(importedNode);
	})
	
	
	// inside of our d3.xml callback, call another function
	// that styles individual paths inside of our imported svg
	//styleImportedSVG()
	// mapSetup();
	
	d3.select("#map svg").append('g').html(text);
	
	d3.select("#yr-back").on("click", d => {
		if (--curYear < minYear) curYear = minYear;
		d3.select("#yr-disp").html(curYear);
				
		d3.selectAll("#map svg path")
			.transition().style("fill", d => {
				return (heatmapColour(c(random())));
				});
		});
		
	d3.select("#yr-frwd").on("click", d => {
		if (++curYear > maxYear) curYear = maxYear;
		d3.select("#yr-disp").html(curYear);
		d3.selectAll("#map svg path")
			.transition().style("fill", d => {
				return (heatmapColour(c(random())));
				});
		});
	
});

