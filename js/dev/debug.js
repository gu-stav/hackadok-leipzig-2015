define([
  'jquery',
  'data/debug-messages',
], function($, messages) {
  var debug = function($target) {
    return new Promise(function(resolve, reject) {
      var currentIndex = 0;
      var timer;
      var renderMessage = function() {
        var message;

        /* No more messages - cleanup */
        if(!messages[currentIndex+1]) {
          clearInterval(timer);
          setTimeout(function() {
            resolve();
          }, 200);
          return;
        }

        message = messages[currentIndex+1];
        ++currentIndex;

        $('<p/>')
          .addClass('debug-message')
          .html(message)
          .appendTo($target);
      };

      timer = setInterval(renderMessage, 25);
    });

  };

  return debug;
});
