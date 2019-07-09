var UNSDG = {};

var goalNames = [
  "No poverty", "Zero hunger", "Good health and well-being",
  "Quality education", "Gender equality", "Clean water and sanitation",
  "Affordable and clean energy", "Decent work and economic growth", "Industry, innovation, infrastructure",
  "Reduced inequalities", "Sustainable cities and communities", "Responsible consumption, production", 
  "Climate action", "Life below water", "Life on land",
  "Peace, justice and strong institutions", "Partnerships for the goals",
];

function inputSanitize(s) { 
  // rm illegal chars, escape others
  // | -> ' '
  // remove dupe pipe
  var illegalChars = "~^$?*()[]|\\".split('');
  var escChars = ".+-".split('');
  return s.trim().split('').map(d=>{ 
    if (illegalChars.includes(d)) return ""; 
    if (escChars.includes(d)) return "\\" + d; 
    if (d == ' ') return "|";
    return d; 
    }).join('').replace(/\|+/g,'\|');
}
  
function inputChange(e, init=false) {
  var keyObj = UNSDG.keysByKey[e][0];
  if (!init) keyObj.filter = $("input[data-key={}]".format(e)).val(); // TODO rm spaces beg,end, and   around |
  
  keyObj.keyVals = keyObj.allVals.filter(d => {
    if (keyObj.filter == "") return true;
    // var filters = keys[i].filter.split(',');
    //if (new RegExp(filters.join("|")).test(d)) {
    if (new RegExp(inputSanitize(keyObj.filter)).test(d)) // run filter
      return true;
    return false;
    }); // all filtered values in dataset for key 
    
  keyObj.qty = keyObj.keyVals.length;
  
  $("#nfi-" + e).html(keyObj.qty);
}

function UNSDG_init (errors, rows) {
  console.log('UNSDG')
  myFullpage.moveTo(4);
  
  var keys = [
    // {key:"Target", label:"Goal", accessor:d=>parseInt(d), initState:"", qty:0},
    {key:"GeoAreaName", label:"Country", accessor:d=>d, initState:"", qty:0, filter:""},
    {key:"TimePeriod", label:"Year", accessor:d=>d, initState:"dim", qty:0, filter:""},
    {key:"SeriesCode", label:"Indicator", accessor:d=>d, initState:"dim", qty:0, filter:"-2."} // d.split('-')[0]
  ];
  keysByKey = d3.nest().key(k=>k.key).object(keys); // org by key
  UNSDG.keysByKey = keysByKey;
  
  //~ function kkeyFilter(e) {  // was used with popup event | now just for 
    //~ if (typeof(e) == "number") {
      //~ var keyObj = keys[e];
    //~ } else {
      //~ var key = $(e.popper).find("input").data("key");
      //~ var keyObj = keysByKey[key][0];
      //~ keyObj.filter = $(e.popper).find("input").val(); // TODO rm spaces beg,end, and   around |
    //~ }
    
    //~ keyObj.keyVals = keyObj.allVals.filter(d => {
    //~ if (keyObj.filter == "") return true;
    //~ // var filters = keys[i].filter.split(',');
    //~ //if (new RegExp(filters.join("|")).test(d)) {
    //~ if (new RegExp(keyObj.filter).test(d)) // make em use |  
      //~ return true;
    //~ return false;
    //~ }); // all filtered values in dataset for key 
    //~ keyObj.qty = keyObj.keyVals.length;
    //~ $("#nfi-" + keyObj.key).html(keyObj.qty);
  //~ }
  
  function onKeyTipShow (e) {
    UNSDG.startKeyTip = $(e.popper).find("input").val();
  }
  
  function onKeyTipHide (e) {
    curKeyTip = $(e.popper).find("input").val();
    if (curKeyTip != UNSDG.startKeyTip) mkItems();
  }
  
  function initFilter() {
    keys.forEach((d,i) => {    
      d.allVals = Object.keys(d3.nest().key(k=>d.accessor(k[d.key])).object(rows))
      // keyFilter(i);
      inputChange(d.key, true);
      
      $("#dnd-outer").append('<div class="draggable {}" data-key="{}">{}</div>'.format(d.initState, d.key, d.label));
      
      tTip = `<div style="margin:5px; text-align: left;">
              Total Items: <span id='nfi-{key}' class'num-fltr-items'>{}</span><br>
              Search: <input type="text" onchange="inputChange('{key}')" onpaste="inputChange('{key}')" onkeyup="inputChange('{key}')" value="{}" data-key="{key}">
              </div>`.format(d.qty, d.filter, {"key":d.key});
              
      tippy("#dnd-outer *[data-key={}]".format(d.key), {
            content: tTip,
            interactive: true,
            animation: "shift-away",
            arrow: true,
            inertia: true,
            onShow:onKeyTipShow,
            onHide:onKeyTipHide
          }); 

    });
  }
  
  // for indicator description in path metadata
  var descData = d3.nest().key(k=>k.SeriesCode).object(rows);
    
  initFilter();
  
  // D-n-D
  $(".droppable").sortable({
    update: function(event, ui) {
      mkItems();
      }
    }); 
    
  var offKeys;
  $(".droppable > *").click(e => {
    if (offKeys.length == 1 && $(e.currentTarget).hasClass('dim')) return;
    $(e.currentTarget).toggleClass("dim");
    mkItems();
    })
  
  // make grid items
  function mkItems() {
    var onKeys = $.map($(".draggable:not(.dim)"),(d) => $(d).data('key'))
    offKeys = $.map($(".draggable.dim"),(d) => $(d).data('key'))
    
    $('#missing-viewer .grid-container *').remove();
        
    // Make Heirarchy
    var nData = d3.nest();
    onKeys.concat(offKeys).forEach(d => {
      nData = nData.key(k=>keysByKey[d][0].accessor(k[d]));
      });
    nData = nData.object(rows);
    
    // arr.len slabs of color (relative to min/max) injected into div element (e)
    function slabView(e, min, max, arr) {
      c = d3v3.scale.linear().domain([min, max * .5 , max]).range(['#A50C29', '#F3F8A9', '#066C3B']); //RYG
      arr.forEach((d,i)=>{
        $(e).append(`<div class="statusLine" style="background-color:${c(d)};"><div>`);
        });
        
      var buckets = arr.map(d => {
        var r = (d-min)/(max-min);
        if (r>.9) return "low";
        if (r>.4) return "med";
        return "high";
        });
        
      var tTip = `<div style="margin:5px; text-align: left;">
              <div><b>Aggregated Data Overview</b></div>
              <div>Items: {}</div>
              <div>High Sparsity: {}</div>
              <div>Medium Sparsity: {}</div>
              <div>low Sparsity: {}</div>
              </div>`.format(arr.length, buckets.filter(d => d=="high").length, buckets.filter(d => d=="med").length, buckets.filter(d => d=="low").length);
      // make popup
      tippy(e, {
          content: tTip,
          animation: "shift-away",
          arrow: true,
          inertia: true
        });  
    }
    
    var itemHTML = ''; // appending causes O(n^2) reflows (even if display:none;)
    var sectionStrs = new Array(onKeys.length);
    function recursiveList(data, idx) {
      if (idx < onKeys.length) { // Create key sections
        var keys = keysByKey[onKeys[idx]][0].keyVals // Object.keys(data); // SORT!
        keys.forEach(d => {
          sectionStrs[idx] = d;
          recursiveList(data[d], idx+1);
          });
      } else { // Do Vis
        var secLabel = sectionStrs.map((d,i) => {
          return (i?" <b>></b> ":"") + sectionStrs[i]; 
          }).join(" ");
          
        //keys = Object.keys(d3.nest().key(k=>k[offKeys[0]]).object(data)); // SORT!
        //len = keys.length;
        keys = keysByKey[offKeys[0]][0].keyVals;
        len = keysByKey[offKeys[0]][0].qty;
        
        var visTemplate = `
            <div id="grid-unsdg-item-{}">
              <div class="item-wrapper">
                <div id="gHeader">
                  <div id="gTitle" class="gTitle"><b>Path:</b> {}</div>
                </div> 
                <div id="meta-by-indicator-t" class="meta"><b>Aggregated By:</b> {}</div>
                <div id="meta-by-indicator" class="meta meta-by-indicator"></div>
              </div>
            </div>
          `
        var hash = secLabel.hashCode();
        $('#grid-wrapper .grid-container').append(visTemplate.format(hash, secLabel==""?"None (Whole Dataset View)":secLabel, keysByKey[offKeys[0]][0].label));
        // itemHTML += visTemplate.format(hash, secLabel, keysByKey[offKeys[0]][0].label);
        
        //var aggStrs = new Array(offKeys.length);
        var sLen = keysByKey[offKeys[0]][0].qty
        var sums = new Array(sLen).fill(0); // sums of the aggregate
        var sIdx = 0;
        function recursiveSum(data, idx) {
          if (idx < offKeys.length) {
            var keys = keysByKey[offKeys[idx]][0].keyVals; // SORT!
            var qty = keysByKey[offKeys[0]][0].qty;
            keys.forEach(d => {
              //sectionStrs[idx] = d;
              var dr = dRef(data,[d]);
              if (dr != undefined) recursiveSum(dr, idx+1);
              // INDICATORS IS WRONG FOR THIS! 
              if (idx == 0) sIdx++; // done with one aggregation
              if (sIdx == qty) {
                // console.log('sums = ', sums);
                var max = offKeys.map(d=>keysByKey[d][0].qty).reduce((p,v) => p*v)/keysByKey[offKeys[idx]][0].qty;
                slabView("#grid-unsdg-item-{} #meta-by-indicator".format(hash), 0, max, sums);
                sums = new Array(sLen).fill(0);
                sIdx = 0;
              }
              });
          } else {
            if (dRef(data,[0, "Value"]) != undefined) sums[sIdx]++;
          }
          
        }
        
        recursiveSum(data, 0); // get aggregated sums
        
        var secTip = sectionStrs.map((d,i) => {
          var onKey = onKeys[i];
          var s = "<div><b>{}:</b> {}</div>".format(keysByKey[onKey][0].label, d); 
          if (onKey == 'SeriesCode')
            s += "<div><b>Description:</b> {}</div>".format(descData[d][0].SeriesDescription);
          return s;
          }).join(" "); 
           
        var tTip = `
          <span class="tooltiptext">
            <div style="margin:5px; text-align: left;">
              <div style="font-size:1.2em;"><b>Path Overview</b></div>
              {}
            </div>
          </span>
          `
        // tippy('#grid-wrapper .grid-container', {
        tippy('#grid-unsdg-item-{} #gTitle'.format(hash), {
          content: tTip.format(secTip),
          animation: "shift-away",
          arrow: true,
          inertia: true
        });  
      } 
      
    }
    
    // filter year range 
    // put goal numbers after ALL indicator names
    // optimize drawing
    // fix help
    // responsive css grid params
    // X scroll off
    
    // NOPE: take avg of all indicators you expanded (i.e. do avg and separated - use display hide/show)
    recursiveList(nData, 0);
    $('#grid-wrapper .grid-container').append(itemHTML);
    
  }
  
  mkItems();
  
  helpTip = `<div style="text-align:left; white-space:pre-line;">
  <div style="font-size:1.2rem; font-weight:bold;">Dataset Explorer</div>
  <div style="font-weight:bold;display:inline;">Dataset:</div>
  <div style="width:100%;display:inline;">  This dataset is a Sahel subset of the UN curated indicators tracking SDG progress and can be found here: https://unstats.un.org/sdgs/indicators/database/. </div>
  <div>  In this dataset a unique datapoint can be referenced using three keys: Country, Indicator Name, and Year. </div>
  <div style="font-weight:bold;display:inline;">Usage:</div>
  <div>  Drag the keys in any order. Click on a key to toggle its state.  At most, two keys can be selected simaltaneously. Hover over item paths and bars for metadata.</div>
  <div style="font-weight:bold;display:inline;">  Selected Keys </div>
  <div style="display:inline;">  When selected, a key will be determine the quantity of items shown and their sort order.  </div>
  <div>  Ex: If both "country" and "year" are selected 300 items would be displayed (10 countries * 30 years) sorted first by country name and then by year. </div>
  <div style="font-weight:bold;display:inline;">  Deselected keys </div>
  <div style="display:inline;">  The first deselected key will be represented as a color bar ranging through red, yellow, and green. For each line in the bar the aggregate sparsity of the deselected keys will be ranked.  Where red is high (>40) sparsity, yellow is medium (<40%) sparsity, and green is low (<10%) sparsity. </div>
  <div>  Ex: Deselecting "country" and "year" (in order) yields a bar containing one line per country whose color represents the sparsity of data for all years for that country. </div>
  <div style="font-weight:bold;display:inline;">  Filtering </div>
  <div style="display:inline;">  To filter the set of all keys, hover over the key name and type one or more filters into the search box separated by spaces.  The sum of values passing any of the filters will dynamically update. </div>
  <div style="display:inline;">  Ex: An indicator name might look like "SH_STA_MMR_E_MP-3.1.1" where the unique indicator name is before the dash and the SDG target is after.  To show all indicators containing the text "MMR" or from SDG target 3.1.2, you would enter "MMR 3.1.2". </div>
  </div>`;
  
  tippy('#sdgHelp', {
    content: helpTip,
    placement: "left-start",
    maxWidth: "50vw",
    animation: "shift-away",
    arrow: true,
    inertia: true
  }); 
}

//~ function _UNSDG_init (errors, rows) {
  //~ console.log('UNSDG')
  //~ myFullpage.moveTo(4);
  
  //~ // why do they label SDG goals as being indicators?!
  
  //~ // by indicator (SeriesCode) name
  //~ UNSDG.nDataByInd = d3.nest().key(k=>parseInt(k["Indicator"])).key(k=>k["SeriesCode"]).key(k=>k["GeoAreaName"]).key(k=>k["TimePeriod"]).object(rows);
  //~ // by country name
  //~ UNSDG.nDataByGeo = d3.nest().key(k=>parseInt(k["Indicator"])).key(k=>k["GeoAreaName"]).key(k=>k["SeriesCode"]).key(k=>k["TimePeriod"]).object(rows);
  
  
  //~ // mean median mode
  //~ // min max
  //~ // mini-graph
  //~ // standard dev
  //~ // range
  //~ // quantiles
  //~ // https://ncss-wpengine.netdna-ssl.com/wp-content/themes/ncss/pdf/Procedures/NCSS/Descriptive_Statistics-Summary_Tables.pdf
  
  //~ var nDataByG = d3.nest().key(k=>k["GeoAreaName"]).object(rows);
  //~ var nDataByS = d3.nest().key(k=>k["SeriesCode"]).object(rows);
  //~ var nDataByIS = d3.nest().key(k=>parseInt(k["Indicator"])).key(k=>k["SeriesCode"]).object(rows);
  //~ var nDataByIG = d3.nest().key(k=>parseInt(k["Indicator"])).key(k=>k["GeoAreaName"]).object(rows);
  
  //~ var dataBegYr = 2000;
  //~ var dataEndYr = 2019;
  //~ var maxDatapoints = (dataEndYr - dataBegYr + 1);
  //~ var maxDatapointsForInds = maxDatapoints * Object.keys(nDataByG).length;
  //~ var maxDatapointsForGeos = maxDatapoints * Object.keys(nDataByS).length;
  
  //~ // some indicators don't have a unique name(!?) and need disambiguation from other cols. Seriously.
  
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
  
  
  //~ var indicatorColors = d3v3.scale.linear().domain([0, maxDatapointsForInds * .5 , maxDatapointsForInds]).range(['#A50C29', '#F3F8A9', '#066C3B']); //RYG
  //~ var countryColors = d3v3.scale.linear().domain([0, maxDatapointsForGeos * .5 , maxDatapointsForGeos]).range(['#A50C29', '#F3F8A9', '#066C3B']); //RYG

  //~ function gradeByIndicator (g, i) { // goal, indicator
    //~ var watermarkGood = maxDatapointsForInds * .9;
    //~ var watermarkAcc = maxDatapointsForInds * .6;
    
    //~ var nDatapoints = nDataByIS[g][i].length;
    //~ if (nDatapoints >= watermarkGood) return "good";
    //~ if (nDatapoints >= watermarkAcc) return "acceptable";
    //~ return ("poor");
  //~ }
  
  //~ function gradeByCountry (g, c) { // goal, country
    //~ var watermarkGood = maxDatapointsForGeos * .9;
    //~ var watermarkAcc = maxDatapointsForGeos * .6;
    
    //~ var nDatapoints = nDataByIG[g][c].length;
    //~ if (nDatapoints >= watermarkGood) return "good";
    //~ if (nDatapoints >= watermarkAcc) return "acceptable";
    //~ return ("poor");
  //~ }
  
  //~ function colorByIndicator (g, i) { // goal, indicator
    //~ var nDatapoints = nDataByIS[g][i].length;
    //~ return (indicatorColors(nDatapoints));
  //~ }
    
  //~ function colorByCountry (g, c) { // goal, country
    //~ var nDatapoints = nDataByIG[g][c].length;
    //~ return (countryColors(nDatapoints));
  //~ }
  
  //~ // concatenated slabs of color (c) injected into div element (e)
  //~ function slabView (e, c){
    //~ e.html("");
    //~ c.forEach((d,i)=>{
      //~ e.append(`<div class="statusLine" style="background-color:${c[i]};"><div>`);
      //~ });
  //~ }
  
  //~ var goals = Object.keys(UNSDG.nDataByInd);
  

  //~ var e = $("#grid-unsdg");  

  //~ // ADD OVERVIEW INFO
  //~ goals.forEach((g,i) => {
    //~ var goalTemplate = `
      //~ <div id="grid-unsdg-item-${i}" class="grid-unsdg-item">
        //~ <div class="item-wrapper">
          //~ <div id="gHeader">
            //~ <div id="gNumber">${g}</div>
            //~ <div id="gTitle">${goalNames[i]}</div>
          //~ </div> 
          //~ <div id="meta-by-indicator-t" class="meta">By Indicator:</div>
          //~ <div id="meta-by-indicator" class="meta meta-by-indicator" data-goal="${g}"></div>
          //~ <div id="meta-by-country-t" class="meta">By Country:</div>
          //~ <div id="meta-by-country" class="meta meta-by-country"></div>
        //~ </div>
      //~ </div>
    //~ `
    //~ e.append(goalTemplate);
    
    //~ // INDICATOR HEALTH BAR
    //~ var inds = Object.keys(UNSDG.nDataByInd[g]);
    //~ var indGrades = inds.map(d => gradeByIndicator(g, d));

    //~ var indTooltip = `
      //~ <span class="tooltiptext">
        //~ <div style="margin:5px;">
          //~ <div><b>Overview</b></div>
          //~ <div>Indicators: ${indGrades.length}</div>
          //~ <div>Low Sparsity: ${indGrades.filter(d => d=="good").length}</div>
          //~ <div>Med Sparsity: ${indGrades.filter(d => d=="acceptable").length}</div>
          //~ <div>High Sparsity: ${indGrades.filter(d => d=="poor").length}</div>
        //~ </div>
        
      //~ </span>
      //~ `
        
    //~ tippy(`#grid-unsdg-item-${i} #meta-by-indicator`, {
      //~ content: indTooltip,
      //~ animation: "shift-away",
      //~ arrow: true,
      //~ inertia: true
    //~ })

    //~ var colors = inds.map(d => colorByIndicator(g, d));
    //~ slabView($(`#grid-unsdg-item-${i} #meta-by-indicator`), colors);
    
    //~ // COUNTRY HEALTH BAR
    //~ var geos = Object.keys(UNSDG.nDataByGeo[g]);
    //~ var geoGrades = geos.map(d => gradeByCountry(g, d));
    
    //~ var geoTooltip = `
      //~ <span class="tooltiptext">
        //~ <div style="margin:5px;">
          //~ <div><b>Overview</b></div>
          //~ <div>Countries: ${geoGrades.length}</div>
          //~ <div>Low Sparsity: ${geoGrades.filter(d => d=="good").length}</div>
          //~ <div>Med Sparsity: ${geoGrades.filter(d => d=="acceptable").length}</div>
          //~ <div>High Sparsity: ${geoGrades.filter(d => d=="poor").length}</div>
        //~ </div>
        
      //~ </span>
      //~ `
        
    //~ tippy(`#grid-unsdg-item-${i} #meta-by-country`, {
      //~ content: geoTooltip,
      //~ animation: "shift-away",
      //~ arrow: true,
      //~ inertia: true
    //~ })
    
    //~ var colors = geos.map(d => colorByCountry(g, d));
    //~ slabView($(`#grid-unsdg-item-${i} #meta-by-country`), colors);
    //~ });
  
  
  //~ var e = $("#grid-by-indicator");  

  //~ // ADD BY INDICATOR INFO
  //~ function setupByIndicator(goal) {
    //~ $("#missing-by-indicator .missing-title").html(`&lt; Goal ${goal} By Indicator`);  
    
    //~ Object.keys(nDataByIS[goal]).forEach((d,i) => {
      //~ var mainTemplate = `
        //~ <div id="grid-unsdg-item-${i}" class="grid-unsdg-item">
          //~ <div class="item-wrapper">
            //~ <div id="gHeader">
              //~ <div id="gTitle">${d}</div>
            //~ </div> 
            //~ <div id="meta-by-indicator-t" class="meta">Avg Sparsity:</div>
            //~ <div id="meta-by-indicator" class="meta meta-by-indicator"></div>
          //~ </div>
        //~ </div>
      //~ `

      //~ var nData = d3.nest().key(k=>k["SeriesCode"].split('-')[0]).key(k=>k["Target"]).object(rows);
      //~ var targets = Object.keys(nData[d.split('-')[0]])
 
      //~ e.append(mainTemplate);
      
      //~ var tooltip = `
        //~ <span class="tooltiptext">
          //~ <div style="margin:5px;">
            //~ <div><b>Description:</b></div>
            //~ <div>${nDataByS[d][0].SeriesDescription}</div>
            //~ <div><b>Used By Targets:</b></div>
            //~ <div>${targets.toString()}</div>
          //~ </div>
          
        //~ </span>
        //~ `
          
      //~ tippy(`#grid-by-indicator #grid-unsdg-item-${i} #gTitle`, {
        //~ content: tooltip,
        //~ animation: "shift-away",
        //~ arrow: true,
        //~ inertia: true
      //~ })
      
      //~ var numCountries = Object.keys(nDataByG).length;
      //~ var years = range(dataBegYr, dataEndYr)
      //~ var geoColors = d3v3.scale.linear().domain([0, years.length * .5 , years.length]).range(['#A50C29', '#F3F8A9', '#066C3B']); //RYG
      //~ var grades = years.map(y => {
        //~ var total = 0;
        //~ Object.keys(nDataByG).forEach(g => {
          //~ if (dRef(UNSDG.nDataByInd, [goal, d, g, y]) != undefined) total++;
          //~ });
        //~ return total;
        //~ });
        
     
      //~ var watermarkGood = numCountries * .9;
      //~ var watermarkAcc = numCountries * .6;
      //~ var tooltip = `
        //~ <span class="tooltiptext">
          //~ <div style="margin:5px;">
            //~ <div><b>Overview</b></div>
            //~ <div>Year Range: ${grades.length}</div>
            //~ <div>Low Sparsity: ${grades.filter(d => d>=watermarkGood).length}</div>
            //~ <div>Med Sparsity: ${grades.filter(d => d<watermarkGood && d>=watermarkAcc).length}</div>
            //~ <div>High Sparsity: ${grades.filter(d => d<watermarkAcc).length}</div>
          //~ </div>
        //~ </span>
        //~ `
          
      //~ tippy(`#grid-by-indicator #grid-unsdg-item-${i} #meta-by-indicator`, {
        //~ content: tooltip,
        //~ animation: "shift-away",
        //~ arrow: true,
        //~ inertia: true
      //~ }) 
      
      
      
      //~ var colors = grades.map(d => geoColors(d));
      //~ slabView($(`#grid-by-indicator #grid-unsdg-item-${i} #meta-by-indicator`), colors);
    //~ });
  //~ }
  
  //~ // TODO
  //~ // ADD Description
  //~ // subset years
  //~ // add bar / popup for bar
  //~ // < Goal 1.1.1 By indicator [2000 - 2019]
  //~ // 1 1.1.1 1.1.3 etc 
  //~ // add col wo subgoal
  //~ // order slabs worse to best
  
  //~ $(".meta-by-indicator").click(e => { 
    //~ $(".missing-screen").hide();
    //~ setupByIndicator($(e.currentTarget).data('goal'));
    //~ $("#missing-by-indicator").show();
    //~ });
  
  //~ $("#missing-by-indicator .missing-title").click(e => { 
    //~ $(".missing-screen").hide();
    //~ $("#missing-overview").show();
    //~ });
  $("#tabs").tabs();
//~ }
