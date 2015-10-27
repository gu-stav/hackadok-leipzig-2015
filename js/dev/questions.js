define([
  'lodash',
], function(_) {
  var renderer = {
    textnode: function(item) {
      var markup = '';

      markup += '<div class="eye-fragment__question-content">';
      markup += '<p class="eye-fragment__question-content-item">' + item + '</p>';
      markup += '</div>';

      return markup;
    },
    araylist: function(item) {
      var markup = '';

      markup += '<div class="eye-fragment__question-content">';

      _.forEach(item, function(content) {
        markup += '<p class="eye-fragment__question-content-item">' + content + '</p>';
      });

      markup += '</div>';

      return markup;
    },
    objectitem: function(item) {
      var markup = '';

      markup += '<div class="eye-fragment__question-content">'
        markup += '<strong class="eye-fragment__question-content-headline">' + item.headline + '</strong>';
        markup += '<small class="eye-fragment__question-content-subheadline">' + item.subheadline + '</small>';
      markup += '</div>';

      return markup;
    },
  };

  var contentRenderer = function(eyeLeft, eyeRight, dataset) {
    _.forEach([eyeLeft, eyeRight], function(eye) {
      var fragments = eye.fragments;
      var modifyFragmentSyle = function(fragment) {
        var $el = fragment.$el;
        var data = _.sample(dataset);
        var markup;

        if(_.isArray(data)) {
          markup = renderer.arraylist(data);
        } else if(_.isObject(data)) {
          markup = renderer.objectitem(data);
        } else if(typeof data === 'string') {
          markup = renderer.textnode(data);
        }

        $el.append(markup);
      };

      _.forEach(fragments, modifyFragmentSyle);
    });
  };

  var modifyContentRenderer = function(eyeLeft, eyeRight, dataset) {
    _.forEach([eyeLeft, eyeRight], function(eye) {
      var fragments = eye.fragments;
      var modifyFragmentSyle = function(fragment) {
        var $el = fragment.$el;
        var data = _.sample(dataset);
        var markup;

        if(_.isArray(data)) {
          markup = renderer.arraylist(data);
        } else if(_.isObject(data)) {
          markup = renderer.objectitem(data);
        } else if(typeof data === 'string') {
          markup = renderer.textnode(data);
        }

        $el
          .find('.eye-fragment__question-content')
            .remove()
            .end()
          .append(markup);
      };

      _.forEach(fragments, modifyFragmentSyle);
    });
  };

  var cleanupStage = function(eyeLeft, eyeRight) {
    _.forEach([eyeLeft, eyeRight], function(eye) {
      var fragments = eye.fragments;
      var modifyFragmentSyle = function(fragment) {
        var $el = fragment.$el;

        $el.removeClass('eye-fragment--question-1');
      };

      _.forEach(fragments, modifyFragmentSyle);
    });
  };

  var prepareStage = function(eyeLeft, eyeRight) {
    _.forEach([eyeLeft, eyeRight], function(eye) {
      var fragments = eye.fragments;
      var modifyFragmentSyle = function(fragment) {
        var $el = fragment.$el;

        $el.addClass('eye-fragment--question-1');
      };

      _.forEach(fragments, modifyFragmentSyle);
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
      "data": "place",
      "before_delay": 500,
      "after_delay": 0,
      "before_offset": 500,
      "before": prepareStage,
      "content": contentRenderer
    },
    {
      "id": "3",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
      "content": contentRenderer,
    },
    {
      "id": "4",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
      "content": modifyContentRenderer,
    },
    {
      "id": "5",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
      "content": modifyContentRenderer,
    },
    {
      "id": "6",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
      "content": modifyContentRenderer,
    },
    {
      "id": "7",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
      "content": modifyContentRenderer,
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
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
      "content": modifyContentRenderer,
    },
    {
      "id": "14",
      "data": "place",
      "before_delay": 0,
      "after_delay": 0,
      "content": modifyContentRenderer,
      "after": cleanupStage,
    },
  ];
});
