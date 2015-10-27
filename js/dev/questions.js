define([
  'lodash',
], function(_) {
  var renderer = {
    textnode: function(item, $el) {
      var markup = '';

      markup += '<div class="eye-fragment__question-content">';
        markup += '<p class="eye-fragment__question-content-item">' + item + '</p>';
      markup += '</div>';

      return markup;
    },
    arraylist: function(item, $el) {
      var markup = '';

      markup += '<div class="eye-fragment__question-content">';

      _.forEach(item, function(content) {
        markup += '<p class="eye-fragment__question-content-item">' + content + '</p>';
      });

      markup += '</div>';

      return markup;
    },
    objectitem: function(item, $el) {
      var markup = '';

      markup += '<div class="eye-fragment__question-content">';

        if(item.headline) {
          markup += '<strong class="eye-fragment__question-content-headline">' + item.headline + '</strong>';
        }

        if(item.subheadline) {
          markup += '<small class="eye-fragment__question-content-subheadline">' + item.subheadline + '</small>';
        }

        if(item.image) {
          var $image = $el.children('.eye-fragment__content').children('img');
          var srcAttr = $image.attr('src');

          $image
            .attr({
              src: '/assets/fragment/' + item.image + '.png',
            })
            .data('origimage', srcAttr);
        }

      markup += '</div>';

      return markup;
    },
  };

  var contentRenderer = function(eyeLeft, eyeRight, dataset, id) {
    _.forEach([eyeLeft, eyeRight], function(eye) {
      var modifyFragmentSyle = function(fragment) {
        var $el = fragment.$el;
        var data = _.sample(dataset);
        var markup;

        if(_.isArray(data)) {
          if(data.length === 1) {
            markup = renderer.textnode(data[0], $el);
          } else {
            markup = renderer.arraylist(data, $el);
          }
        } else if(_.isObject(data)) {
          markup = renderer.objectitem(data, $el);
        } else if(typeof data === 'string') {
          markup = renderer.textnode(data, $el);
        }

        $el.append(markup);
      };

      _.forEach(eye.fragments, modifyFragmentSyle);
    });
  };

  var modifyContentRenderer = function(eyeLeft, eyeRight, dataset, id) {
    _.forEach([eyeLeft, eyeRight], function(eye) {
      var modifyFragmentSyle = function(fragment) {
        var $el = fragment.$el;
        var data = _.sample(dataset);
        var markup;

        if(_.isArray(data)) {
          markup = renderer.arraylist(data);
        } else if(_.isObject(data)) {
          markup = renderer.objectitem(data, $el);
        } else if(typeof data === 'string') {
          markup = renderer.textnode(data);
        }

        $el
          .find('.eye-fragment__question-content')
            .remove()
            .end()
          .append(markup);
      };

      _.forEach(eye.fragments, modifyFragmentSyle);
    });
  };

  var cleanupStage = function(eyeLeft, eyeRight) {
    _.forEach([eyeLeft, eyeRight], function(eye) {
      var modifyFragmentSyle = function(fragment) {
        var $el = fragment.$el;
        var $image = $el.children('.eye-fragment__content').children('img');

        /* Reset profile image */
        if($image.data('origimage')) {
          $image.attr({
            src: $image.data('origimage'),
          });

          $image.data('origimage', undefined);
        }

        $el
          .attr({
            'class': 'eye-fragment',
          });
      };

      _.forEach(eye.fragments, modifyFragmentSyle);
    });
  };

  var prepareStage = function(eyeLeft, eyeRight, id) {
    _.forEach([eyeLeft, eyeRight], function(eye) {
      var modifyFragmentSyle = function(fragment) {
        fragment.$el.addClass('eye-fragment--question-' + id);
      };

      _.forEach(eye.fragments, modifyFragmentSyle);
    });
  };

  return [
    {
      "id": "1",
      "data": "place",
      "before_delay": 500,
      "after_delay": 0,
    },
    {
      "id": "2",
      "data": "birthday",
      "before_delay": 500,
      "after_delay": 0,
      "before_offset": 2200,
      "before": prepareStage,
      "content": contentRenderer
    },
    {
      "id": "3",
      "data": "book",
      "before_delay": 0,
      "after_delay": 0,
      "before": prepareStage,
      "content": modifyContentRenderer,
    },
    {
      "id": "4",
      "data": "movie",
      "before_delay": 0,
      "after_delay": 0,
      "before": prepareStage,
      "content": modifyContentRenderer,
    },
    {
      "id": "5",
      "data": "music",
      "before_delay": 0,
      "after_delay": 0,
      "before": prepareStage,
      "content": modifyContentRenderer,
    },
    {
      "id": "6",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
      "before_offset": 2200,
      "before": prepareStage,
      "after": cleanupStage,
      "content": modifyContentRenderer,
    },
    {
      "id": "7",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
      "before": prepareStage,
      "content": contentRenderer,
    },
    {
      "id": "8",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
      "content": modifyContentRenderer,
    },
    {
      "id": "9",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
      "content": modifyContentRenderer,
    },
    {
      "id": "10",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
      "content": modifyContentRenderer,
    },
    {
      "id": "11",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
      "content": modifyContentRenderer,
    },
    {
      "id": "12",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
      "content": modifyContentRenderer,
    },
    {
      "id": "13",
      "data": "place-location-image",
      "before_delay": 0,
      "after_delay": 0,
      "before_offset": 1100,
      "before": prepareStage,
      "after": cleanupStage,
      "content": modifyContentRenderer,
    },
    {
      "id": "14",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
      "content": contentRenderer,
      "after": cleanupStage,
    },
    {
      "id": "15",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
    },
    {
      "id": "16",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
    },
    {
      "id": "17",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
      /* Add some buzz by removing the profile images */
      "before": function(eyeLeft, eyeRight, id) {
        _.forEach([eyeLeft, eyeRight], function(eye) {
          var modifyFragmentSyle = function(fragment) {
            var $target = fragment.$el;
            var timeout = Math.random() * 1000;

            setTimeout(function() {
              $target.css({
                'opacity': 0,
              });
            }, timeout);
          };

          _.forEach(eye.fragments, modifyFragmentSyle);
        });

        prepareStage(eyeLeft, eyeRight, id);
      },
    },
  ];
});
