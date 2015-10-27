define([
  'api',
  'bluebird',
  'facebook',
  'frame',
  'eye',
], function(api, Bluebird, FB, BaseFrame, Eye) {
  var Frame = function() {
    return BaseFrame.prototype._init.apply(this, arguments);
  };

  Frame.prototype = Object.create(BaseFrame.prototype);
  Frame.prototype.constructor = BaseFrame;

  Frame.prototype.activate = function() {
    var self = this;
    var eyeLeft = new Eye({position: 'left'});
    var eyeRight = new Eye({position: 'right'});

    var $face = this.$el.children('.fly-face');

    var multiplyFriends = function(response) {
      var friends = response.data;
      var moreFriends = [];

      for(var i = 0; i <= 10; i++) {
        _.forEach(_.clone(friends), function(friend) {
          moreFriends.push(friend);
        });
      }

      return _.shuffle(moreFriends);
    };

    var storeFriends = function(friends) {
      if(!window.FBDATA) {
        window.FBDATA = {
          friends: {},
        };
      }

      return window.FBDATA.friends = friends;
    };

    var feedEyesWithPictures = function(friends) {
      eyeLeft.data(window.FBDATA.friends);
      eyeRight.data(_.shuffle(window.FBDATA.friends));

      $face.append(eyeLeft.render());
      $face.append(eyeRight.render());

      eyeLeft.fillWithPictures();
      eyeRight.fillWithPictures();
    };

    var questionsFlow = function() {
      return new Promise(function(resolve, reject) {
        require([
          'questions',
        ], function(questions) {
          Bluebird
            .each(questions, playQuestion)
            /* This is the end of the soundloop */
            .then(function() {
              resolve();
            });
        });
      });
    };

    var playQuestion = function(question) {
      return new Promise(function(resolve, reject) {
        var id = question.id;
        var dataset = question.data;
        var before_delay = question.before_delay;
        var after_delay = question.after_delay || 0;
        var after = question.after;
        var before = question.before;
        var content = question.content;
        var before_offset = question.before_offset || 0;

        var initializePlayer = function(data, id) {
          var playerMarkup = '<audio src="/assets/question-' + id + '.mp3"' +
                             'autoplay' +
                             '></audio>';
          var $player = $(playerMarkup);

          if(before) {
            setTimeout(function() {
              before(eyeLeft, eyeRight, id);
            }, before_offset);
          }

          if(content) {
            content(eyeLeft, eyeRight, data, id);
          }

          $player
            .on('ended', function() {
              setTimeout(function() {
                if(after) {
                  after(eyeLeft, eyeRight, id);
                }

                resolve();
              }, after_delay);
            });

          $player
            .appendTo('body');
        };

        console.log('Sound ID', id);
        console.log('Require Dataset', dataset);

        require([
          'data/' + dataset,
        ], function(data) {
          if(before_delay) {
            setTimeout(function() {
              initializePlayer(data, id);
            }, before_delay);
          } else {
            initializePlayer(data, id);
          }
        });
      });
    };

    $('.background-music').get(0).play();

    api.fetch('/me/taggable_friends')
      .then(multiplyFriends)
      .then(storeFriends)

      /* Load initial profile pictures */
      .then(feedEyesWithPictures)

      /* Questions - Flow */
      .then(questionsFlow)
      .then(function() {

        self.$el.css({
          transition: 'opacity 400ms ease-in-out',
          opacity: 0,
        });

        setTimeout(function() {
          self.$el.trigger('end.frame');
        }, 200);
      });

    return BaseFrame.prototype.activate.apply(this, arguments);
  };

  return Frame;
});
