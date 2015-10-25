require.config({
  paths: {
    'jquery': '../../node_modules/jquery/dist/jquery',
  },

  shim: {
    'jquery': {
      exports: '$',
    },
  },
  waitSeconds: 15,
});

require([
  'jquery',
  'frame',
], function($, Frame) {
  $(function() {
    var $frames = $('.frame');
    var initFrame = function(index) {
      var $frame = $(this);
      var frame = new Frame($frame);

      if(index === 0) {
        frame.activate();
      }
    };

    $.each($frames, initFrame);
  });
});
