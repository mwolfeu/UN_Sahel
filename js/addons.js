//~ var initW  = 800; //ratio i want
//~ var initH  = 450;
//~ var initW  = 50; //ratio i want - orig size of d3test
//~ var initH  = 50;
// scale an element for a container keeping aspect ratio
var resizr_update_list = [];

// container: containing element - must have queriable w/h
// item: thing to resize (svg,iframe, etc.)
// iw: normal width of item
// ih: normal height of item
// update: change w window resizes
function resizr (container, item, iw, ih, update) {
	var c = $(`${container}:has(${item})`);
	var i = $(`${container} ${item}`);
	
	if (c.length != i.length) {
		console.error("Selector length is not matched! Exiting.");
		return;
	};
	
	i.css("width", "0px"); // get container size before stretching
	i.css("height", "0px");
	
	c.each((idx,element) => {
				
		var cw = $(element).width(); // get unstretched dimensions
		var ch = $(element).height();
		
		e = i.eq(idx);
		e.css('width', iw);
		e.css('height', ih);
		
		
		// e.wrap(`<div class='resizr_wrapper' style='width: ${iw}px; height: ${ih}px;'></div>`);
		if ($(element).find(".resizr_wrapper").length > 0)
			$(element).find(".resizr_wrapper").css("display", "none")
		else
			e.wrap(`<div class='resizr_wrapper' style='display: none;'></div>`);

		
		if ((cw/ch)-(iw/ih) > 0) // compare ratios: determine axis to scale on
			var sF = ch / ih // scale factor
		else
			var sF = cw / iw;
		e.css('transform', "scale(" + sF + ")");
		$(element).find(".resizr_wrapper")
			.css("width", `${iw*sF}px`)
			.css("height", `${ih*sF}px`)
			.css("display", "block");
		})
		
		if (update)
			resizr_update_list.push({container:container, item:item, iw:iw, ih:ih})
}

$(window).resize(function(){
	resizr_update_list.forEach(d => {
		resizr(d.container, d.item, d.iw, d.ih, false)
		});
	}).trigger('resize');

//~ var initW  = 715; //ratio i want - orig size of d3test
//~ var initH  = 470;
//~ var initW  = 150; //ratio i want - orig size of d3test
//~ var initH  = 150;


//~ var element = ".output-UI";

//~ $(element).css('width', initW);
//~ $(element).css('height', initH);

//~ $(window).resize(function(){
	
	//~ // Note: two iframes wide, filters on bottom
	//~ var w  = ($(".main-contentUI").width() * .98) / 2,  // containing object w/h
			//~ h = $(".main-contentUI").height() * .55;
	
	//~ if ((w/h)-(initW/initH) > 0) // compare ratios: determine axis to scale on
		//~ var sF = h / initH // scale factor
	//~ else
		//~ var sF = w / initW;
	//~ $(element).css('transform', "scale(" + sF + ")");
	
	//~ // push the second iframe
	//~ $(".output-UI:nth-child(1)").css("margin-right",  (initW * sF) - initW + "px")
	
//~ })
//~ .trigger('resize');
	
