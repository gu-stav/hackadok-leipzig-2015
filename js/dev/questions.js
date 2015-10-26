define([
  'lodash',
], function(_) {
  return [
    {
      "id": "1",
      "data": "places",
      "before_delay": 100,
      "after_delay": 3000,
      "before": function(eyeLeft, eyeRight) {
        _.forEach([eyeLeft, eyeRight], function(eye) {
          var fragments = eye.fragments;
          var modifyFragmentSyle = function(fragment) {
            var $el = fragment.$el;

            $el.addClass('eye-fragment--question-1');
          };

          _.forEach(fragments, modifyFragmentSyle);
        });
      },
      "content": function(eyeLeft, eyeRight, dataset) {
        console.log('run content callback')
        _.forEach([eyeLeft, eyeRight], function(eye) {
          var fragments = eye.fragments;
          var modifyFragmentSyle = function(fragment) {
            var $el = fragment.$el;
            var data = _.sample(dataset);
            var markup = '';

            if(_.isArray(data)) {

            }

            if(_.isObject(data)) {
              markup += '<div class="eye-fragment__question-content">'
                markup += '<strong>' + data.name + '</strong>';
                markup += '<small>' + data.coords + '</small>';
              markup += '</div>';
            }

            $el.append(markup);
          };

          _.forEach(fragments, modifyFragmentSyle);
        });
      },
      "after": function(eyeLeft, eyeRight) {
        _.forEach([eyeLeft, eyeRight], function(eye) {
          var fragments = eye.fragments;
          var modifyFragmentSyle = function(fragment) {
            var $el = fragment.$el;

            $el.removeClass('eye-fragment--question-1');
            $el.children('.eye-fragment__question-content').remove();
          };

          _.forEach(fragments, modifyFragmentSyle);
        });
      },
    },
    {
      "id": "2",
      "data": "places",
      "before_delay": 2000,
      "after_delay": 3000,
    },
  ];
});
