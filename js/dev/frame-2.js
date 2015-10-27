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
            .then(function() {
              console.log('end soundloop');
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

        var getAudioPlayer = function(id) {
          var markup = '<audio src="/assets/question-' + id + '.mp3"' +
                       'autoplay' +
                       '></audio>';

          return $(markup);
        };

        var initializePlayer = function(data) {
          var $player = getAudioPlayer(id);

          if(before) {
            setTimeout(function() {
              before(eyeLeft, eyeRight);
            }, before_offset);
          }

          if(content) {
            content(eyeLeft, eyeRight, data);
          }

          $player
            .on('ended', function() {
              setTimeout(function() {
                if(after) {
                  after(eyeLeft, eyeRight);
                }

                resolve();
              }, after_delay);
            })
            .appendTo('body');
        };

        console.log('sound id', id);
        console.log('require dataset', dataset);

        require([
          'data/' + dataset,
        ], function(data) {
          if(before_delay) {
            setTimeout(function() {
              initializePlayer(data);
            }, before_delay);
          } else {
            initializePlayer(data);
          }
        });
      });
    };

    api.fetch('/me/taggable_friends')
      .then(multiplyFriends)
      .then(storeFriends)

      /* Load initial profile pictures */
      .then(feedEyesWithPictures)

      /* Questions - Flow */
      .then(questionsFlow)
      .then(function() {
        self.$el.trigger('end.frame');
      });

    return BaseFrame.prototype.activate.apply(this, arguments);
  };

  return Frame;
});
