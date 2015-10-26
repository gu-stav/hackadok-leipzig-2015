define([
  'eye-fragment',
  'jquery',
  'lodash',
], function(Fragment, $, _) {
  var Eye = function(options) {
    this.fragmentCount = 240;
    this.rows = 13;
    this.fragments = [];
    this.$el = $('<div class="eye" />');
    this.options = options;
    this._init();
  };

  Eye.prototype = {
    _init: function() {
      var self = this;
      var fragmentsPerRow = this.fragmentCount / this.rows;
      var $row = $('<div class="eye__row">');

      for(var i = 1; i <= this.rows; i++) {
        var $currentRow = $row.clone();

        for(var j = 1; j <= fragmentsPerRow; j++) {
          var fragment = new Fragment();
          var $rendered = fragment.render();

          self.fragments.push(fragment);
          $currentRow.append($rendered);
        }

        this.$el.append($currentRow);
      }
    },

    data: function(data) {
      var self = this;
      var counter = 0;

      this._data = data;

      /* Store a dataset to a fragment, so we don't have to re-apply it again */
      _.forEach(this._data, function(currentData, name) {
        var currentFragment = self.fragments[counter] ? self.fragments[counter] : undefined;

        if(currentFragment && currentData) {
          self.fragments[counter]._data = currentData;
        }

        ++counter;
      });
    },

    fillWithPictures: function() {
      _.forEach(this.fragments, function(fragment, index) {
        fragment.content('picture');
      });
    },

    render: function() {
      this.$el
        .addClass('eye--' + this.options.position);

      return this.$el;
    },
  };

  return Eye;
});
