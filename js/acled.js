var ACLED = {
	nData: null,
	map: null,
	month: 0,
	year: 2011,
	action:'play',
	yearMin: 2011,
	yearMax: 2018
}


function ACLED_init(errors, rows, reinit = false) {
	console.log("ACLED")
  
  if (rows==null) rows=ACLED.rows;
  else ACLED.rows=rows;
	
	ACLED.deadMin = d3.min(rows, d => d.FATALITIES);
	ACLED.deadMax = d3.max(rows, d => d.FATALITIES);
	// ACLED.yearMin = d3.min(rows, d => new Date(d.EVENT_DATE).getFullYear());
	// ACLED.yearMax = d3.max(rows, d => new Date(d.EVENT_DATE).getFullYear());
	
	var byActor = d3.nest().key(k => k.ACTOR1).entries(rows); // calc kills
	ACLED.minActorSeverity = Math.sqrt(d3.min(byActor, d=>d3.sum(d.values, s=>s.FATALITIES)));
	ACLED.maxActorSeverity = Math.sqrt(d3.max(byActor, d=>d3.sum(d.values, s=>s.FATALITIES)));
	
	// severity scale
	var colorScale = d3.scaleLinear()
    .domain([ACLED.minActorSeverity, ACLED.maxActorSeverity])
    .range([0, 1]);
  
  var colorInterp = d3.interpolateLab("#FFF4EF", "#6D0012"); // ACTOR Color scale
    
  // compile actor colors by severity
  // var typoSevScale = {};
  var colorBySeverity = {defaultFill: '#dddddd'};
  byActor.forEach(d=>{
		var val = Math.sqrt(d3.sum(d.values, e=>e.FATALITIES));
		// typoSevScale[d.key] = val;
		var rootSumScale = colorScale(val);
		colorBySeverity[d.key] = colorInterp(rootSumScale);
		});
	
	ACLED.nData = d3.nest()
		.key(k=>new Date(k.EVENT_DATE).getFullYear())
		.key(k=>new Date(k.EVENT_DATE).getMonth())
		.object(rows);
	
	function typography() {
		var month = ACLED.nData[2014][5];
		
		var canvas = document.getElementById("typography");
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "#555"
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		var minLat = d3.min(month, d => d.LATITUDE);
		var maxLat = d3.max(month, d => d.LATITUDE);
		var minLon = d3.min(month, d => d.LONGITUDE);
		var maxLon = d3.max(month, d => d.LONGITUDE);
		var minFat = d3.min(month, d => d.FATALITIES);
		var maxFat = d3.max(month, d => d.FATALITIES);
		
		var colorInterp = d3.interpolateLab("#FFF4EF", "#6D0012");
		
		var latScale = d3.scaleLinear().domain([minLat,maxLat]).range([-2000,7000]); // width 2448
		var lonScale = d3.scaleLinear().domain([minLon,maxLon]).range([-12000,1584]); // height 1584
		
		var latScale = d3.scaleLinear().domain([minLat,maxLat]).range([0,2448]); // width 2448
		var lonScale = d3.scaleLinear().domain([minLon,maxLon]).range([0,1584]); // height 1584

		var colScale = d3.scaleLinear().domain([minFat,maxFat]).range([.9,0]);// font color
		var sizScale = d3.scaleLinear().domain([ACLED.minActorSeverity,ACLED.maxActorSeverity]).range([10,50]); // font size
		
		ctx.textAlign = "center";
		month.forEach(d => {
			ctx.fillStyle = d3.interpolateViridis(colScale(d.FATALITIES)) // colorInterp(colScale(d.FATALITIES))
			var a = d.ACTOR1
			ctx.font = sizScale(typoSevScale[a]) + "px Open Sans";
			if (a.startsWith("Boko")) a = "Boko Haram"
			if (a.includes("Military")) a = "Military"
			ctx.fillText(a, latScale(d.LATITUDE), lonScale(d.LONGITUDE));
		})
	}
	//typography()
	
	var countryActivityByMonth = d3.nest()
		.key(k=>new Date(k.EVENT_DATE).getFullYear())
		.key(k=>new Date(k.EVENT_DATE).getMonth())
		.key(k=>k.COUNTRY)
		.entries(rows);
		
	ACLED.maxActivity = d3.max(countryActivityByMonth, y=>{ // year
			return d3.max(y.values, m=>{ // month
				return d3.max(m.values, c=>{ // country
					return c.values.length;
				});
			});
		});
	ACLED.maxActivity = Math.sqrt(ACLED.maxActivity);
		
	ACLED.minActivity = d3.min(countryActivityByMonth, y=>{ // year
			return d3.min(y.values, m=>{ // month
				return d3.min(m.values, c=>{ // country
					return c.values.length;
				});
			});
		});
		
	// country activity by month scale
	var activityScale = d3.scaleLinear()
    .domain([ACLED.minActivity, ACLED.maxActivity])
    .range([0.3, 1]);
	
	ACLED.map = new Datamap({
		scope: 'world',
		element: document.getElementById('violence-map'),
		responsive: true,
		geographyConfig: {
			popupOnHover: false,
			highlightOnHover: false,
			borderColor: '#434',
			borderWidth: 2
		},
		bubblesConfig: {
			popupTemplate: function(geography, data) {
				return '<div class="hoverinfo">Country: ' + data.c + '<br>Event: ' + data.e + '<br>Actors: ' + data.a + '<br>Deaths: ' + data.d + '</div>'
			},
      borderWidth: 0,
      animationSpeed: 200,
			fillOpacity: 0.9
		},
		fills: colorBySeverity,
		setProjection: function(element) {
			var projection = d3v3.geo.equirectangular()
				.center([9, 14])
				.rotate([4.4, 0])
				.scale(850)
				.translate([element.offsetWidth / 2, element.offsetHeight / 2]);
			var path = d3v3.geo.path()
				.projection(projection);

			return {path: path, projection: projection};
		}
	});
	
	sahelMap = ["BFA", "CMR", "TCD", "GIN", "GMB", "MLI","NER", "NGA", "MRT", "SEN"];
	d3.selectAll(".datamaps-subunit").filter(function() {
		var result = true;
		this.classList.forEach(d=>{
			if (sahelMap.includes(d)) result = false;
			});
		return result;
	})	
	.style("opacity", ".2").style("stroke", "#333");
	
	function getData() {
		$("#violence-date").html((ACLED.month+1) + "/" + ACLED.year);
		return ACLED.nData[ACLED.year][ACLED.month].map(d => {
			actors = d.ACTOR1==""?"unclear":d.ACTOR1;
			event = d.EVENT_TYPE==""?"unclear":d.EVENT_TYPE;
			
			return {d:d.FATALITIES, a:actors, c:d.COUNTRY, e:event, radius:Math.sqrt(d.FATALITIES)+5, fillKey:actors, latitude:d.LATITUDE, longitude:d.LONGITUDE};
		});
	}

	function violenceUpdate() {
		ACLED.map.bubbles(getData());
		
		var cConvert = {"Burkina Faso":"BFA", "Cameroon":"CMR", "Chad":"TCD", "Guinea":"GIN", "Gambia":"GMB", "Mali":"MLI","Niger":"NER", "Nigeria":"NGA", "Mauritania":"MRT", "Senegal":"SEN"};
		var activity = {"BFA":0, "CMR":0, "TCD":0, "GIN":0, "GMB":0, "MLI":0,"NER":0, "NGA":0, "MRT":0, "SEN":0};
		ACLED.nData[ACLED.year][ACLED.month].forEach(d=>{
			activity[cConvert[d.COUNTRY]]++;
			});
			
		Object.keys(activity).forEach(d=>{  // convert to color

			activity[d] = d3.interpolateViridis(activityScale(Math.sqrt(activity[d]))); // Country Color Scale
			})
			
		ACLED.map.updateChoropleth(activity);
	}

	// Set up first bubbles
	violenceUpdate();
	
	  // hook up controls
  function acledForward() {
		ACLED.month++;
		
		if (ACLED.month>11) {
			ACLED.year++;
			ACLED.month = 0;
		}
		
		if (ACLED.year > ACLED.yearMax) ACLED.year = ACLED.yearMin;
		
		violenceUpdate();
	}
	
  console.log(reinit)
  if (reinit == true) return; // map redraw triggered
  
	$("#violence-back").click(d=>{
		ACLED.month--;
		
		if (ACLED.month<0) {
			ACLED.year--;
			ACLED.month = 11;
		}
		
		if (ACLED.year < ACLED.yearMin) ACLED.year = ACLED.yearMax;
		
		violenceUpdate();
		});

	
  $("#violence-ctrl").click(function(){
		if (ACLED.action == "play") {
			ACLED.intervalCookie = setInterval(acledForward, 300);
			ACLED.action = "pause";
			$(this).attr("src", "img/pause-circle-solid.svg");
			return;
		}
		
		if (ACLED.action == "pause") {
			clearInterval(ACLED.intervalCookie);
			ACLED.action = "play"
			$(this).attr("src", "img/play-circle-solid.svg");
			return;
		}
			
		});
		
  $("#violence-frwd").click(acledForward);
  
  //~ $( window ).resize(function() {
			//~ ACLED.map.resize();
	//~ });
  $(window).on('resize', function(e) {
    // DUMB!  DATAMAP Projector can't resize! 
    $("#violence-map > svg").remove()
    ACLED_init(null, null, true)
  }, 500);
}



