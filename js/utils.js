// Prevent events from creating avalanche of requests
// USAGE: 
// $(window).on('resize', function(e) {
//   console.log(e.type + '-event was 200ms not triggered');
// }, 200);
;(function ($) {
    var methods = { on: $.fn.on, bind: $.fn.bind };
    $.each(methods, function(k){
        $.fn[k] = function () {
            var args = [].slice.call(arguments),
                delay = args.pop(),
                fn = args.pop(),
                timer;

            args.push(function () {
                var self = this,
                    arg = arguments;
                clearTimeout(timer);
                timer = setTimeout(function(){
                    fn.apply(self, [].slice.call(arg));
                }, delay);
            });

            return methods[k].apply(this, isNaN(delay) ? arguments : args);
        };
    });
}(jQuery));

// js version is crap 
// significance formatter - does not enforce unneeded float zeros after float
function maxSign(num, s) {
	if (s == undefined) s = 2;
	return (parseInt([num][0]*(1*(10**s)))/(10**s));
}

// returns a range in array form
function range(start, end) {
	var offset = 0;
	if (start != 0) offset = start;
	return Array.from({length: end-start+1}, (v, k) => k+offset);
}

