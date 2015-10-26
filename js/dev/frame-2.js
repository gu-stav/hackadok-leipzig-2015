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
      var timeout = 1000;

      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          require([
            'questions',
          ], function(questions) {
            Bluebird
              .each(questions, playQuestion)
              .then(function() {
                resolve();
              });
          });
        }, timeout);
      });
    };

    var playQuestion = function(question) {
      return new Promise(function(resolve, reject) {
        var id = question.id;
        var dataset = question.data;
        var before_delay = question.before_delay;
        var after_delay = question.after_delay;
        var after = question.after;
        var before = question.before;
        var content = question.content;

        var getAudioPlayer = function(id) {
          var markup = '<audio src="/assets/question-' + id + '.mp3"' +
                       'autoplay' +
                       '></audio>';

          return $(markup);
        };

        var addPlayer = function() {
          var $player = getAudioPlayer(id);

          $player
            .on('ended', function() {
              if(!after_delay) {
                return resolve();
              }

              if(after) {
                after(eyeLeft, eyeRight);
              }

              setTimeout(function() {
                resolve();
              }, after_delay);
            })
            .appendTo('body');
        };

        require([
          'data/' + dataset,
        ], function(dataset) {
          if(before_delay) {
            setTimeout(function() {
              addPlayer();
            }, before_delay);
          } else {
            addPlayer();
          }

          if(before) {
            before(eyeLeft, eyeRight);
          }

          if(content) {
            content(eyeLeft, eyeRight, dataset);
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
      .then(questionsFlow);

    return BaseFrame.prototype.activate.apply(this, arguments);
  };

  return Frame;
});
