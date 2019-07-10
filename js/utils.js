// Python style "format" tests
//~ $('#tests')
  //~ .append(
    //~ "hello {} and {}<br />".format("you", "bob")
  //~ )
  //~ .append(
    //~ "hello {0} and {1}<br />".format("you", "bob")
  //~ )
  //~ .append(
    //~ "hello {0} and {1} and {a}<br />".format("you", "bob", {a:"mary"})
  //~ )
  //~ .append(
    //~ "hello {0} and {1} and {a} and {2}<br />".format("you", "bob", "jill", {a:"mary"})
  //~ );
  
String.prototype.format = function() {
  var args = arguments;
  this.unkeyed_index = 0;
  return this.replace(/\{(\w*)\}/g, function(match, key) { 
    if (key === '') {
      key = this.unkeyed_index;
      this.unkeyed_index++
    }
    if (key == +key) {
      return args[key] !== 'undefined'
      ? args[key]
      : match;
    } else {
      for (var i = 0; i < args.length; i++) {
        if (typeof args[i] === 'object' && typeof args[i][key] !== 'undefined') {
          return args[i][key];
        }
      }
      return match;
    }
  }.bind(this));
};





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

// for dereferencing d3 nested objects when any property < n could == undefined
// returns value or undefined when property does not exist
function dRef(o, p) {
  var obj = o;
  p.forEach(d => {
    if (obj == undefined) 
      return;
    obj = obj[d];
    });
  return obj;
}

// get hashcode for string
String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

// check if element is in viewport
// $(elem).is(':visible')
// return true for an element with visibility:hidden
jQuery.expr.filters.visible = function( elem ) {
    return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};
