var UNSDG = {};

var goalNames = [
  "No poverty", "Zero hunger", "Good health and well-being",
  "Quality education", "Gender equality", "Clean water and sanitation",
  "Affordable and clean energy", "Decent work and economic growth", "Industry, innovation, infrastructure",
  "Reduced inequalities", "Sustainable cities and communities", "Responsible consumption, production", 
  "Climate action", "Life below water", "Life on land",
  "Peace, justice and strong institutions", "Partnerships for the goals",
];

function UNSDG_init (errors, rows) {
  console.log('UNSDG')
  myFullpage.moveTo(4);
  
  // why do they label SDG goals as being indicators?!
  
  // by indicator (SeriesCode) name
  UNSDG.nDataByInd = d3.nest().key(k=>parseInt(k["Indicator"])).key(k=>k["SeriesCode"]).key(k=>k["GeoAreaName"]).key(k=>k["TimePeriod"]).object(rows);
  // by country name
  UNSDG.nDataByGeo = d3.nest().key(k=>parseInt(k["Indicator"])).key(k=>k["GeoAreaName"]).key(k=>k["SeriesCode"]).key(k=>k["TimePeriod"]).object(rows);
  
  
  // mean median mode
  // min max
  // mini-graph
  // standard dev
  // range
  // quantiles
  // https://ncss-wpengine.netdna-ssl.com/wp-content/themes/ncss/pdf/Procedures/NCSS/Descriptive_Statistics-Summary_Tables.pdf
  
  var nDataByG = d3.nest().key(k=>k["GeoAreaName"]).object(rows);
  var nDataByS = d3.nest().key(k=>k["SeriesCode"]).object(rows);
  var nDataByIS = d3.nest().key(k=>parseInt(k["Indicator"])).key(k=>k["SeriesCode"]).object(rows);
  var nDataByIG = d3.nest().key(k=>parseInt(k["Indicator"])).key(k=>k["GeoAreaName"]).object(rows);
  
  var dataBegYr = 2000;
  var dataEndYr = 2019;
  var maxDatapoints = (dataEndYr - dataBegYr + 1);
  var maxDatapointsForInds = maxDatapoints * Object.keys(nDataByG).length;
  var maxDatapointsForGeos = maxDatapoints * Object.keys(nDataByS).length;
  
  // some indicators don't have a unique name(!?) and need disambiguation from other cols. Seriously.
  //~ var dataTestDict = {};  // filled w offending series codes
  //~ var nDataTest = d3.nest().key(k=>k["SeriesCode"]).key(k=>k["GeoAreaName"]).key(k=>k["TimePeriod"]).object(rows);
  //~ Object.keys(nDataByS).forEach(s => {
    //~ Object.keys(nDataByG).forEach(g => {
      //~ range(dataBegYr, dataEndYr).forEach(y => {
        //~ if (nDataTest[s][g] != undefined && nDataTest[s][g][y] != undefined && nDataTest[s][g][y].length > 1) {
          //~ dataTestDict[s] = true;
          //~ console.log(s, g, y);
          //~ // debugger
        //~ }
        //~ });
      //~ });
    //~ });
  
  
  var indicatorColors = d3v3.scale.linear().domain([0, maxDatapointsForInds * .5 , maxDatapointsForInds]).range(['#A50C29', '#F3F8A9', '#066C3B']); //RYG
  var countryColors = d3v3.scale.linear().domain([0, maxDatapointsForGeos * .5 , maxDatapointsForGeos]).range(['#A50C29', '#F3F8A9', '#066C3B']); //RYG

  function gradeByIndicator (g, i) { // goal, indicator
    var watermarkGood = maxDatapointsForInds * .9;
    var watermarkAcc = maxDatapointsForInds * .6;
    
    var nDatapoints = nDataByIS[g][i].length;
    if (nDatapoints >= watermarkGood) return "good";
    if (nDatapoints >= watermarkAcc) return "acceptable";
    return ("poor");
  }
  
  function gradeByCountry (g, c) { // goal, country
    var watermarkGood = maxDatapointsForGeos * .9;
    var watermarkAcc = maxDatapointsForGeos * .6;
    
    var nDatapoints = nDataByIG[g][c].length;
    if (nDatapoints >= watermarkGood) return "good";
    if (nDatapoints >= watermarkAcc) return "acceptable";
    return ("poor");
  }
  
  function colorByIndicator (g, i) { // goal, indicator
    var nDatapoints = nDataByIS[g][i].length;
    return (indicatorColors(nDatapoints));
  }
    
  function colorByCountry (g, c) { // goal, country
    var nDatapoints = nDataByIG[g][c].length;
    return (countryColors(nDatapoints));
  }
  
  // concatenated slabs of color (c) injected into div element (e)
  function slabView (e, c){
    e.html("");
    c.forEach((d,i)=>{
      e.append(`<div class="statusLine" style="background-color:${c[i]};"><div>`);
      });
  }
  
  var goals = Object.keys(UNSDG.nDataByInd);
  

  var e = $("#grid-unsdg");  

  // ADD OVERVIEW INFO
  goals.forEach((g,i) => {
    var goalTemplate = `
      <div id="grid-unsdg-item-${i}" class="grid-unsdg-item">
        <div class="item-wrapper">
          <div id="gHeader">
            <div id="gNumber">${g}</div>
            <div id="gTitle">${goalNames[i]}</div>
          </div> 
          <div id="meta-by-indicator-t" class="meta">By Indicator:</div>
          <div id="meta-by-indicator" class="meta meta-by-indicator" data-goal="${g}"></div>
          <div id="meta-by-country-t" class="meta">By Country:</div>
          <div id="meta-by-country" class="meta meta-by-country"></div>
        </div>
      </div>
    `
    e.append(goalTemplate);
    
    // INDICATOR HEALTH BAR
    var inds = Object.keys(UNSDG.nDataByInd[g]);
    var indGrades = inds.map(d => gradeByIndicator(g, d));

    var indTooltip = `
      <span class="tooltiptext">
        <div style="margin:5px;">
          <div><b>Overview</b></div>
          <div>Indicators: ${indGrades.length}</div>
          <div>Low Sparsity: ${indGrades.filter(d => d=="good").length}</div>
          <div>Med Sparsity: ${indGrades.filter(d => d=="acceptable").length}</div>
          <div>High Sparsity: ${indGrades.filter(d => d=="poor").length}</div>
        </div>
        
      </span>
      `
        
    tippy(`#grid-unsdg-item-${i} #meta-by-indicator`, {
      content: indTooltip,
      animation: "shift-away",
      arrow: true,
      inertia: true
    })

    var colors = inds.map(d => colorByIndicator(g, d));
    slabView($(`#grid-unsdg-item-${i} #meta-by-indicator`), colors);
    
    // COUNTRY HEALTH BAR
    var geos = Object.keys(UNSDG.nDataByGeo[g]);
    var geoGrades = geos.map(d => gradeByCountry(g, d));
    
    var geoTooltip = `
      <span class="tooltiptext">
        <div style="margin:5px;">
          <div><b>Overview</b></div>
          <div>Countries: ${geoGrades.length}</div>
          <div>Low Sparsity: ${geoGrades.filter(d => d=="good").length}</div>
          <div>Med Sparsity: ${geoGrades.filter(d => d=="acceptable").length}</div>
          <div>High Sparsity: ${geoGrades.filter(d => d=="poor").length}</div>
        </div>
        
      </span>
      `
        
    tippy(`#grid-unsdg-item-${i} #meta-by-country`, {
      content: geoTooltip,
      animation: "shift-away",
      arrow: true,
      inertia: true
    })
    
    var colors = geos.map(d => colorByCountry(g, d));
    slabView($(`#grid-unsdg-item-${i} #meta-by-country`), colors);
    });
  
  
  var e = $("#grid-by-indicator");  

  // ADD BY INDICATOR INFO
  function setupByIndicator(goal) {
    $("#missing-by-indicator .missing-title").html(`&lt; Goal ${goal} By Indicator`);  
    
    Object.keys(nDataByIS[goal]).forEach((d,i) => {
      var mainTemplate = `
        <div id="grid-unsdg-item-${i}" class="grid-unsdg-item">
          <div class="item-wrapper">
            <div id="gHeader">
              <div id="gTitle">${d}</div>
            </div> 
            <div id="meta-by-indicator-t" class="meta">Avg Sparsity:</div>
            <div id="meta-by-indicator" class="meta meta-by-indicator"></div>
          </div>
        </div>
      `

      var nData = d3.nest().key(k=>k["SeriesCode"].split('-')[0]).key(k=>k["Target"]).object(rows);
      var targets = Object.keys(nData[d.split('-')[0]])
 
      e.append(mainTemplate);
      
      var tooltip = `
        <span class="tooltiptext">
          <div style="margin:5px;">
            <div><b>Description:</b></div>
            <div>${nDataByS[d][0].SeriesDescription}</div>
            <div><b>Used By Targets:</b></div>
            <div>${targets.toString()}</div>
          </div>
          
        </span>
        `
          
      tippy(`#grid-by-indicator #grid-unsdg-item-${i} #gTitle`, {
        content: tooltip,
        animation: "shift-away",
        arrow: true,
        inertia: true
      })
      
      var numCountries = Object.keys(nDataByG).length;
      var years = range(dataBegYr, dataEndYr)
      var geoColors = d3v3.scale.linear().domain([0, years.length * .5 , years.length]).range(['#A50C29', '#F3F8A9', '#066C3B']); //RYG
      var grades = years.map(y => {
        var total = 0;
        Object.keys(nDataByG).forEach(g => {
          if (dRef(UNSDG.nDataByInd, [goal, d, g, y]) != undefined) total++;
          });
        return total;
        });
        
     
      var watermarkGood = numCountries * .9;
      var watermarkAcc = numCountries * .6;
      var tooltip = `
        <span class="tooltiptext">
          <div style="margin:5px;">
            <div><b>Overview</b></div>
            <div>Year Range: ${grades.length}</div>
            <div>Low Sparsity: ${grades.filter(d => d>=watermarkGood).length}</div>
            <div>Med Sparsity: ${grades.filter(d => d<watermarkGood && d>=watermarkAcc).length}</div>
            <div>High Sparsity: ${grades.filter(d => d<watermarkAcc).length}</div>
          </div>
        </span>
        `
          
      tippy(`#grid-by-indicator #grid-unsdg-item-${i} #meta-by-indicator`, {
        content: tooltip,
        animation: "shift-away",
        arrow: true,
        inertia: true
      }) 
      
      
      
      var colors = grades.map(d => geoColors(d));
      slabView($(`#grid-by-indicator #grid-unsdg-item-${i} #meta-by-indicator`), colors);
    });
  }
  
  // TODO
  // ADD Description
  // subset years
  // add bar / popup for bar
  // < Goal 1.1.1 By indicator [2000 - 2019]
  // 1 1.1.1 1.1.3 etc 
  // add col wo subgoal
  // order slabs worse to best
  
  $(".meta-by-indicator").click(e => { 
    $(".missing-screen").hide();
    setupByIndicator($(e.currentTarget).data('goal'));
    $("#missing-by-indicator").show();
    });
  
  $("#missing-by-indicator .missing-title").click(e => { 
    $(".missing-screen").hide();
    $("#missing-overview").show();
    });
  //~ $("#tabs").tabs();
}
