var sdgLabels = [
  "NO POVERTY",
  "ZERO HUNGER",
  "GOOD HEALTH",
  "EDUCATION",
  "GENDER EQUALITY",
  "CLEAN WATER",
  "ENERGY",
  "ECONOMIC GROWTH",
  "INFRASTRUCTURE",
  "LESS INEQUALITY",
  "SUSTAINABILITY",
  "CONSUMER CYCLE",
  "CLIMATE",
  "LIFE BELOW WATER",
  "LIFE ON LAND",
  "JUSTICE",
  "PARTNERSHIPS",
];

var rangeLabels = {
  0: "poor" ,
  40:"reliable",
  60:"good",
  80:"excellent"
};

// simpler version
function  initSimple() {
  
  // GOAL FILTER
  range(0,16).forEach(d => {  
    $(".section#section4 #left-side #goal .control").append(`<div id="lvl${d}" class="item lvl" data-sdg-num="${d}"></div>`); // sdg sparsity level
    $(".section#section4 #left-side #goal .control").append(`<div id="sdg${d}" class="item sdg-img" data-sdg-num="${d}"></div>`);
    $(".section#section4 #left-side #goal .control " +  `#sdg${d}`).css("background-image",`url(img/SDG/sdg-icon-goal-${d<9?'0'+(d+1):(d+1)}.png)`);
    $(".section#section4 #left-side #goal .control " +  `#sdg${d}` + ", .section#section4 #left-side #goal .control " +  `#lvl${d}`)
      .css("grid-area",`${parseInt((d/5))+1}/${(d%5)+1}`);
    $(".section#section4 #left-side #goal .control " +  `#lvl${d}`).css("height", `calc(65px * ${Math.random()})`);
    });
  
  $(".sdg-img").click(d => {
    var num = $(d.currentTarget).data('sdg-num');
    $(d.target).siblings().css("border-color", "").css("background-color", "");
    $(d.target).parent().children(`*[data-sdg-num="${num}"]`).css("border-color", "black");
    $(d.target).parent().children(`.lvl[data-sdg-num="${num}"]`).css("background-color", "black");
    
    $(".section#section4 #left-side #goal .value").html((num + 1) + "&middot;" + sdgLabels[num])
    $(".section#section4 #left-side #goal .default").addClass('modified');
    
    $(".section#section4 #left-side #goal .default.modified").click(d => {
      $(".section#section4 #left-side #goal .default").removeClass('modified');
      $(".section#section4 #left-side #goal .value").html("ALL");
      $(".section#section4 #left-side #goal .control").children().css("border-color", "").css("background-color", "");
      })
      
    })
    
  $(".section#section4 #left-side #goal .control .item").css("opacity",".6");
  
  // UTIL FCN FOR BELOW
  function findRangeLabel(num) {
    var label = "";
    
    Object.keys(rangeLabels).forEach(d => { if (num >= d) label = rangeLabels[d] });
    return label;
  }
  
  // SPARSITY FILTER
  $( ".section#section4 #left-side #sparsity .control" ).slider({
    range: false,
    min: 0,
    max: 100,
    value: 10,
    change: function(event, ui) {
      console.log('sparsity changed')
    },
    slide: function( event, ui ) {
      $(".section#section4 #left-side #sparsity .value").html(ui.value + "% - " + findRangeLabel(ui.value))
    }
  });
  
  var value = $(".section#section4 #left-side #sparsity .control").slider('value');
  $(".section#section4 #left-side #sparsity .value").html(value + "% - " + findRangeLabel(value));
  
  // YEAR FILTER
  var yMin = 1990, yMax = 2019;
  $( ".section#section4 #left-side #year .control" ).slider({
      range: true,
      min: yMin,
      max: yMax,
      values: [yMin,yMax],
      change: function(event, ui) {
        console.log('year changed');
      },
      slide: function( event, ui ) {
        $(".section#section4 #left-side #year .value").html(ui.values[0] + "-" + ui.values[1]);
        // inputChange('TimePeriod');
      }
    });
    $(".section#section4 #left-side #year .value").html(yMin + "-" + yMax);
}
