/**
 * flashBox Plugin
 * flashes the background color, and / or border color, and / or text color of an element
 *
 * @events: "flashbox-effect-complete"
 * @requirements: jQuery 1.7+
 * @author: Chris Markle
 *
 */
(function($) {

  var FlashBox = function(options, element) {

    var $element = $(element);

      var originalBackgroundColor = $element.css('backgroundColor');
      var originalBorderColor = $element.css('borderColor');
      var originalColor = $element.css('color');

      var to = {
        backgroundColor: options.backgroundColor,
        borderColor: options.borderColor,
        color: options.color,
      };

      var from = {
        backgroundColor: originalBackgroundColor,
        borderColor: originalBorderColor,
        color: originalColor,
      };

      var times = options.flashes;
      var interval = (options.totalDuration / times);
      var duration = interval / 2;

      for (var i = 0; i < times; i++) {
        setTimeout(function() {
          $element.animate(to, duration, function() {
            $element.animate(from, duration, function() {
              if (i === 1 + times) $element.trigger("flashbox-effect-complete");
            });
          });
        }, interval * i);
    };

  };

  $.fn.flashBox = function(options) {

    options = $.extend({
      backgroundColor: "#FFFFFF",
      borderColor: "#FFFFFF",
      color: "#FFFFFF",
      flashes: 3,
      totalDuration: 1500
    }, options || {});

    return this.each(function() {
      var flashBox = new FlashBox(options, this);
    });

  };

})(jQuery);
