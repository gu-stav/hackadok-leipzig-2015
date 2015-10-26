require.config({
  baseUrl: 'js/dist/',
  paths: {
    'bluebird': '../../node_modules/bluebird/js/browser/bluebird',
    'data': '../../data',
    'facebook': 'https://connect.facebook.net/en_US/sdk',
    'jquery': '../../node_modules/jquery/dist/jquery',
    'lodash': '../../node_modules/lodash/index',
  },

  shim: {
    'facebook': {
      exports: 'FB'
    },
    'jquery': {
      exports: '$',
    },
  },
  waitSeconds: 15,
});

require([
  'lodash',
  'jquery',
  'timeline',
], function(_, $, Timeline) {
  window.timeline = new Timeline();

  $(function() {
    var $frames = $('.frame');
    var initFrame = function(el, index) {
      var $frame = $(el);
      var initData = $frame.data('init');
      var init = initData ? ('-' + initData) : '';
      var id = _.uniqueId();

      require([
        'frame' + init,
      ], function(Frame) {
        var frame = new Frame($frame);

        frame.ID = parseInt(id, 10);
        timeline.add(frame);

        if(index === 0) {
          frame.activate();
        }

        frame.$el.on('end.frame', function(e) {
          var next = timeline.where({ID: frame.ID + 1});

          next.activate();
          setTimeout(function() {
            frame.deactivate();
          }, 500);
        });
      });
    };

    _.forEach($frames, initFrame);
  });
});
