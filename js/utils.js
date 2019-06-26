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
