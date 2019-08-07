var UNSDG = {
  tipData: {},
  filterRangeMin:1990,
  filterRangeMax:2019,
  filterRangeChanged:false,
  bodyScroll:true
};

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
  if (!init) keyObj.filter = $("input[data-key={}]".format(e)).val(); 
  
  var r = '';
  if (e == "TimePeriod" && (UNSDG.filterRangeMin != 1990 || UNSDG.filterRangeMax != 2019)) // if both aren't at default
    r = ' ' + range(UNSDG.filterRangeMin, UNSDG.filterRangeMax).join(' ');
  
  keyObj.keyVals = keyObj.allVals.filter(d => {
    if (keyObj.filter == "" && r == "") return true;
    // var filters = keys[i].filter.split(',');
    //if (new RegExp(filters.join("|")).test(d)) {
    if (new RegExp(inputSanitize(keyObj.filter + r)).test(d)) // run filter
      return true;
    return false;
    }); // all filtered values in dataset for key 
    
  keyObj.qty = keyObj.keyVals.length;
  
  $("#nfi-" + e).html(keyObj.qty);
  
  var tot = UNSDG.keys.reduce((p,v) => 
  (typeof(p)=="number"?p:p.qty)*v.qty
  );
  //console.log (tot);
  $("#missing-total").html(tot);
}

function yearChange(val) {
  UNSDG["filterRange" + val] = parseInt($('select#s' + val).val());
  inputChange('TimePeriod');
}

function genPrecomputed (rows) {
  // pre-computed for unsdg simple
  var g = Object.keys(d3.nest().key(k=>k.GeoAreaName).object(rows));
  var iData = d3.nest().key(k=>k.SeriesCode).object(rows);
  var i = Object.keys(iData);
  
  var gN = d3.nest().key(k=>parseInt(k.Target)).rollup(d => { // by goal
    return Object.keys(d3.nest().key(k=>k.Target + k.SeriesCode).object(d)).length; // # of non-unique inds per goal
    }).object(rows);  
    
  //var giN = d3.nest().key(k=>parseInt(k.Target)).key(k=>parseInt(k.SeriesName.split('?')[0])).rollup(d => { // by goal, indicator
  //  return Object.keys(d3.nest().key(k=>k.Target + k.SeriesCode).object(d)).length; // # of non-unique inds per goal
  //  }).object(rows);  
    
  var gN = d3.nest().key(k=>parseInt(k.Target)).rollup(d => { // # inds by goal
    // dictionary of all permutations in goal 
    var goal = parseInt(d[0].Target);
    return i.filter(e => e.includes('-' + goal + ".")); // unique inds per goal
    }).object(rows);  
    
  var allPossible = {
    geos: g, 
    inds: i,
    geo_ind_max: g.length * i.length, // max # non-unique inds
    //goal_inds: gN,
    //goal_ind_max: giN,               // max # non-unique inds by goal
    indsByGoal: gN // unique inds for each unique goal/country
  }
  
  return (JSON.stringify(allPossible));
}

function UNSDG_init (errors, rows) {
  console.log('UNSDG');
  
  $('#grid-missing').on("mouseenter", d=>UNSDG.bodyScroll=false);
  $('#grid-missing').on("mouseleave", d=>UNSDG.bodyScroll=true);
  
  $('body').bind('mousewheel', function() { // when hovering, don't propagate scroll to body
    return UNSDG.bodyScroll;  // generates errors but works regardless.
  });
  
  var keys = [
    // {key:"Target", label:"Goal", accessor:d=>parseInt(d), initState:"", qty:0},
    {key:"TimePeriod", label:"Year", accessor:d=>d, initState:"", qty:0, filter:""},
    {key:"GeoAreaName", label:"Country", accessor:d=>d, initState:"dim", qty:0, filter:""},
    {key:"SeriesCode", label:"Indicator", accessor:d=>d, initState:"dim", qty:0, filter:"-3."} // d.split('-')[0]
  ];
  keysByKey = d3.nest().key(k=>k.key).object(keys); // org by key
  UNSDG.keys = keys;
  UNSDG.keysByKey = keysByKey;
  
  function onKeyTipShown (e) {
    $( "#slider-range" ).slider({
      range: true,
      min: 1990,
      max: 2019,
      values: [UNSDG["filterRangeMin"],UNSDG["filterRangeMax"]],
      change: function(event, ui) {
        UNSDG["filterRangeChanged"] = true
      },
      slide: function( event, ui ) {
        console.log(ui.values[0] + " - " + ui.values[1])
        //$( "#amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        $( "#amount" ).html( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        UNSDG["filterRangeMin"] = ui.values[ 0 ];
        UNSDG["filterRangeMax"] = ui.values[ 1 ];
        inputChange('TimePeriod');
      }
    });
  }
  
  function onKeyTipShow (e) {
    UNSDG.startKeyTip = $(e.popper).find("input").val() 
      //~ + $(e.popper).find("select").eq(0).val()
      //~ + $(e.popper).find("select").eq(1).val();
  }
  
  function onKeyTipHide (e) {
    curKeyTip = $(e.popper).find("input").val() 
      //~ + $(e.popper).find("select").eq(0).val()
      //~ + $(e.popper).find("select").eq(1).val();
    if (curKeyTip != UNSDG.startKeyTip || UNSDG.filterRangeChanged == true) mkItems();
    UNSDG.filterRangeChanged = false;
  }
  
  function initFilter() {
    keys.forEach((d,i) => {    
      d.allVals = Object.keys(d3.nest().key(k=>d.accessor(k[d.key])).object(rows))
      // keyFilter(i);
      inputChange(d.key, true);
      
      $("#dnd-outer").append('<div class="draggable {}" data-key="{}">{}</div>'.format(d.initState, d.key, d.label));
      
      var yOpts = range(1989, 2019).map(d=>d==1989?'<option value="0" selected>Choose</option>':`<option value="${d}">${d}</option>`).join('');

      var tTipYears = `
      <br> <label for="amount">Year Range: </label> <span id="amount">1990 - 2019</span > <div id="slider-range" style="margin:5px"></div>
      `; 

      var tTip = `<div style="margin:5px; text-align: left;">
              Total Values: <span id='nfi-{key}' class'num-fltr-items'>{}</span><br>
              Search: <input type="text" onchange="inputChange('{key}')" onpaste="inputChange('{key}')" onkeyup="inputChange('{key}')" value="{}" data-key="{key}">
              {}
              </div>`.format(d.qty, d.filter, d.key=="TimePeriod"?tTipYears:"", {"key":d.key});
              
      tippy("#dnd-outer *[data-key={}]".format(d.key), {
            content: tTip,
            interactive: true,
            animation: "shift-away",
            arrow: true,
            inertia: true,
            duration: [500,0],
            onShow:onKeyTipShow,
            onShown:onKeyTipShown,
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
    function slabView(hash, min, max, arr, names) {
      var c = d3v3.scale.linear().domain([min, max * .5 , max]).range(['#A50C29', '#F3F8A9', '#066C3B']); //RYG
      var s = d3v3.scale.linear().domain([min, max]).range([100, 0]); //Sparsity
      
      //var lineWidth = (document.documentElement.clientWidth * .2) / arr.length;
      var htmlStr = '';
      arr.forEach((d,i)=>{
        htmlStr += `<div class="statusLine" style="background-color:${c(d)};width:calc((90vw*.2)/${arr.length});" data-str="${names[i]}: ${maxSign(s(d),2)}% Sparse"></div>`;
        });
        
      var buckets = arr.map(d => {
        var r = (d-min)/(max-min);
        if (r>.9) return "low";
        if (r>.4) return "med";
        return "high";
        });
        
      UNSDG.tipData["agg-" + hash] = `
              <div><b>Aggregated Data</b></div>
              <div>-<b>Items:</b> ${arr.length}</div>
              <div>-<b>High Sparsity:</b> ${buckets.filter(d => d=="high").length}</div>
              <div>-<b>Medium Sparsity:</b> ${buckets.filter(d => d=="med").length}</div>
              <div>-<b>Low Sparsity:</b> ${buckets.filter(d => d=="low").length}</div>
              `;   
        
      return htmlStr;
    }
    
    var htmlStr = ''; // appending causes O(n^2) reflows (even if display:none;)
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
          return (i?" <b>></b> ":"") + (sectionStrs[i].length > 15?"<br>"+sectionStrs[i]:sectionStrs[i])  ; 
          }).join(" ");
          
        //keys = Object.keys(d3.nest().key(k=>k[offKeys[0]]).object(data)); // SORT!
        //len = keys.length;
        keys = keysByKey[offKeys[0]][0].keyVals;
        len = keysByKey[offKeys[0]][0].qty;
        
        var hash = secLabel.hashCode();
        var visTemplate = `
            <div class='unsdg-item' data-hash="${hash}">
              <div class="item-wrapper">
                <div id="gHeader">
                  <div id="gTitle" class="gTitle"><b>Path:</b> ${secLabel==""?"None (Whole Dataset View)":secLabel}</div>
                </div> 
                <div id="meta-by-indicator-t" class="meta"><b>Aggregated By:</b> ${keysByKey[offKeys[0]][0].label}</div>
                <div id="meta-by-indicator" class="meta meta-by-indicator">
        `
        var visTemplateFoot = `       
                </div>
              </div>
            </div>
          `
        // $('#grid-wrapper .grid-container').append(visTemplate.format(hash, secLabel==""?"None (Whole Dataset View)":secLabel, keysByKey[offKeys[0]][0].label));
        htmlStr += visTemplate;
        
        //var aggStrs = new Array(offKeys.length);
        var sLen = keysByKey[offKeys[0]][0].qty
        var sums = new Array(sLen).fill(0); // sums of the aggregate
        var sIdx = 0;
        var slabStr = '';
        function recursiveSum(data, idx) {
          if (idx < offKeys.length) {
            var keys = keysByKey[offKeys[idx]][0].keyVals; // SORT!
            var qty = keysByKey[offKeys[0]][0].qty;
            keys.forEach(d => {
              //sectionStrs[idx] = d;
              var dr = dRef(data,[d]);
              if (dr != undefined) recursiveSum(dr, idx+1);
              if (idx == 0) sIdx++; // done with one aggregation
              if (sIdx == qty) {
                // console.log('sums = ', sums);
                var max = offKeys.map(d=>keysByKey[d][0].qty).reduce((p,v) => p*v)/keysByKey[offKeys[idx]][0].qty;
                var names = keysByKey[offKeys[0]][0].keyVals;
                slabStr += slabView(hash, 0, max, sums, names);
                sums.fill(0);
                sIdx = 0;
              }
              });
          } else {
            if (dRef(data,[0, "Value"]) != undefined) sums[sIdx]++;
          }
          
        }
        
        recursiveSum(data, 0); // get aggregated sums
        
        htmlStr += slabStr + visTemplateFoot; // add slabs
        
        var secTip = sectionStrs.map((d,i) => {
          var onKey = onKeys[i];
          var s = "<div><b>" + keysByKey[onKey][0].label + ":</b> " + d + "</div>"; 
          if (onKey == 'SeriesCode')
            s += "<div><b>Description:</b> " + descData[d][0].SeriesDescription + "</div>";
          return s;
          }).join(" "); 
           

        UNSDG.tipData["path-" + hash] = '<div style="font-size:1.2em;"><b>Overview</b></div>' + secTip;
      } 
      
    }
    
    // X optimize drawing
    // X responsive bar
    // X empty txt search bug - flipping through popups too fast
    // X resize bug
    // X responsive css grid params
    // X path tip / line tip
    // X filter year range 
    // NOPE: take avg of all indicators you expanded (i.e. do avg and separated - use display hide/show)
    // slider show bug
    
    
    // lowest to highest sorting
    // redo help
    
    recursiveList(nData, 0);
    $('#grid-wrapper .grid-container').append(htmlStr);
    
    $(".unsdg-item").on("mouseover", function(d,e){ // setup dynamic ttip creation
      $(d.currentTarget).off();
      var hash = $(d.currentTarget).data("hash");
      
      var tipHead = `
      <span class="tooltiptext">
        <div style="margin:5px; text-align: left;">
      `
      var tipFoot = `
        </div>
      </span>
      `
      tippy(d.currentTarget, {
          content: tipHead + UNSDG.tipData["path-" + hash] + UNSDG.tipData["agg-" + hash] + tipFoot,
          target: '#gTitle',
          animation: "shift-away",
          arrow: true,
          inertia: true
        }); 
        
       UNSDG.tipData['tInst' + hash] = tippy($(d.currentTarget).find('#meta-by-indicator')[0], {
          content: "",
          //target: '#meta-by-indicator',   // TIPPY CANT DO TWO DIFFERENT TARGETS !
          animation: "shift-away",
          arrow: true,
          inertia: true
        });   
        
        $(d.currentTarget).find(".statusLine").on("mouseover", hash, d => {
          
          var data = $(d.currentTarget).data('str');
          UNSDG.tipData['tInst' + d.data].setContent(data);
          
          });  
            
      });
    
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
