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
  // RE Pauline request to kill this
  //~ var colorBySeverity = {defaultFill: '#dddddd'};
  //~ byActor.forEach(d=>{
		//~ var val = Math.sqrt(d3.sum(d.values, e=>e.FATALITIES));
		//~ // typoSevScale[d.key] = val;
		//~ var rootSumScale = colorScale(val);
		//~ colorBySeverity[d.key] = colorInterp(rootSumScale); // FATALITIES COLORS
		//~ });
	
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
	
  $("#violence-map").on("mousemove", e => { // for country click
    ACLED.mouseX = e.clientX;
    ACLED.mouseY = e.clientY;
    // console.log(e.clientX, e.clientY)
    });
    
  $('#violence-map-click').on("mouseleave", e => { // for country click
    $('#violence-map-click').css('transform', '');
    });
      
	ACLED.map = new Datamap({
		scope: 'world',
		element: document.getElementById('violence-map'),
		responsive: true,
		geographyConfig: {
			popupOnHover: true,
      popupTemplate: function(geo, data) {
        //if (!mouseDown) return;
        //return '<div class="hoverinfo"><b>' + geo.properties.name + '</b></div>'
        },
			highlightOnHover: false,
			borderColor: '#434',
			borderWidth: 2  
		},
    done: function(datamap) {
      datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
          var c = geography.properties.name
          if (!sahelNames.includes(c)) return;
          $('#violence-map-click').css('transform', 'translate(calc(' + ACLED.mouseX + 'px - 50%), calc(' + ACLED.mouseY + 'px - 50%))') // move center
          $('#violence-map-click #title').html('<b>' + c + '</b>');
          popupGraph(c);
      });
    },
		bubblesConfig: {
			popupTemplate: function(geography, data) {
				// return '<div class="hoverinfo">Country: ' + data.c + '<br>Event: ' + data.e + '<br>Actors: ' + data.a + '<br>Deaths: ' + data.d + '</div>'
        return '<div class="hoverinfo"><b>' + data.a + '<br>Deaths:</b> ' + data.d + '</div>'
			},
			borderColor: '#000',
      borderWidth: 0.5,
      animationSpeed: 200,
			fillOpacity: 0.9
		},
		fills: {"T":"#FFFFFF", "F":"#83a3c7"}, //"#bfd2e0" colorBySeverity,
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
	.style("opacity", ".1").style("stroke", "#333");
	
  d3.selectAll(".datamaps-subunit").filter(function() {
		var result = false;
		this.classList.forEach(d=>{
			if (sahelMap.includes(d)) result = true;
			});
		return result;
	})	
	.style("opacity", ".7");
  
	function getData() {
		$("#violence-date").html((ACLED.month+1) + "/" + ACLED.year);
		return ACLED.nData[ACLED.year][ACLED.month].map(d => {
			actors = d.ACTOR1==""?"unclear":d.ACTOR1;
			event = d.EVENT_TYPE==""?"unclear":d.EVENT_TYPE;
			
			//return {d:d.FATALITIES, a:actors, c:d.COUNTRY, e:event, radius:Math.sqrt(d.FATALITIES)+5, fillKey:actors, latitude:d.LATITUDE, longitude:d.LONGITUDE};
			return {d:d.FATALITIES, a:actors, c:d.COUNTRY, e:event, radius:(d.FATALITIES/10)+5, fillKey:d.FATALITIES==0?"T":"F", latitude:d.LATITUDE, longitude:d.LONGITUDE};
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
      
      // events per month by country
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
    ACLED_init(null, null, true);
    initSB();
    myFullpage.moveSectionUp(); // section 3 bug
    myFullpage.moveSectionDown();
  }, 500);
  
  
  $("#sec-violent-entrepreneurs #sb-icon").on("mouseenter", function(){
    $("#sec-violent-entrepreneurs #violence-sidebar").css("transform", "translateX(0px)");
    $("#sec-violent-entrepreneurs #sb-icon").css("opacity", "0");
    });
    
  $("#sec-violent-entrepreneurs #violence-sidebar").on("mouseleave", function(){
    $("#sec-violent-entrepreneurs #violence-sidebar").css("transform", "");
    $("#sec-violent-entrepreneurs #sb-icon").css("opacity", "1");
    });
  
  
  var maxI = 0;
  var maxF = 0;
  // incidents & fatalities by year, country
  let acledIF = d3.nest().key(k => k.EVENT_DATE.split('-')[2]).key(k => k.COUNTRY).rollup(d => {
    var i = d.length;
    if (i > maxI) maxI = i;
    
    var f = d3.sum(d, g => g.FATALITIES);
    if (f > maxF) maxF = f;
    
    return ({i:i, f:f});
    }).object(rows); 
  
  function popupGraph(country) {
    
    var flatData = range(2011, 2019).map(year => {  // flatten it
        var dRef = acledIF[year][country];
        return {x:new Date(year, 0, 1), f:(dRef==undefined?0:dRef.f), i:(dRef==undefined?0:dRef.i)};
        });
  
    var cfg = {
      data: flatData,
      x_accessor: "x",
      y_accessor: "i",
      area: true,
      color: ['#316D8D'],
      width: 200,
      height: 150,
      buffer: 0,
      bottom: 25,
      xax_count: 3,
    }
    
    // MG STORES STATE IN CFG! Mk copy...
    var cfg1 = Object.assign({}, cfg);
    
    cfg.title = "Incidents";
    cfg.target = "#g0"
    MG.data_graphic(cfg);
    
    cfg1.title = "Fatalities";
    cfg1.target = "#g1"
    cfg1.y_accessor = "f",
    MG.data_graphic(cfg1);
  }
  
  function sbAddGraph(sel, data, max, w, h, isFatal) {
    MG.data_graphic({
      // title: "Linked Graphic",
      // description: "The two graphics in this section are linked together. A rollover in one causes a rollover in the other.",
      data: data,
      x_accessor: "x",
      y_accessor: isFatal?"f":"iScaled",
      area: true,
      color: ['#316D8D'],
      max_y: max,
      // linked_format: '%Y-%m-%d',
      linked: true,
      width: w,
      height: h,
      x_axis: false,
      y_axis: false,
      buffer: 0,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      //right: 40,
      //xax_count: 4,
      target: sel,
      mouseover: function(d, i) {
        // custom format the rollover text, show days
        var pf = d3.format('.0s');
        $('#sb-year').html("<b>" + range(2009, 2019)[i] + "</b>");
        
        d3.select(sel + ' svg .mg-active-datapoint')
        d3.select(sel + ' svg .mg-active-datapoint')
          .text(pf(isFatal?d.f:d.i));
        
      },
      mouseout: function(d, i) {
        $('#sb-year').html("");
        d3.selectAll('svg .mg-active-datapoint').remove();
      }
    });
  }
  
  // SIDEBAR
  function initSB() {
    $("#sb-grid .sb-element-title, #sb-grid .sb-element-graph").remove();
    sahelNames.forEach(d => {
      $("#sb-grid").append('<div class="sb-element-title">{}</div> <div data-country="{}" class="sb-element-graph sb-fatalities"></div> <div data-country="{}" class="sb-element-graph sb-activity"></div>'
        .format(d, d, d));
        var w = $(`.sb-fatalities[data-country="${d}"]`).width();
        var h = $(`.sb-fatalities[data-country="${d}"]`).height();
        var flatData = range(2009, 2019).map(year => {  // flatten it
          var dRef = acledIF[year][d];
          var scale = 7.5; // nigeria again
          return {x:year, f:(dRef==undefined?0:dRef.f), iScaled:(dRef==undefined?0:dRef.i*scale), i:(dRef==undefined?0:dRef.i)};
          });
        
        var maxY = maxF + 1000; // nigeria fatalities busts the curve
        sbAddGraph(`.sb-fatalities[data-country="${d}"]`, flatData, maxY, w, h, true); 
        sbAddGraph(`.sb-activity[data-country="${d}"]`, flatData, maxY, w, h, false); 
      });
  }
  
  $("#sec-violent-entrepreneurs #violence-sidebar").css("display", "block");
  initSB()
}


