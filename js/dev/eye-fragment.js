define([
  'jquery',
], function($) {
  var Fragment = function() {
    this.markup = '<div class="eye-fragment">' +
                    '<div class="eye-fragment__content"></div>' +
                  '</div>';

    this._data = {};
    this.$el = $(this.markup)
  };

  Fragment.prototype = {
    _setContent: function(markup) {
      this.$el.children().html(markup);
    },

    content: function(key) {
      var self = this;

      switch(key) {
        case 'picture':
          var data = self._data;
          var url;

          if(data.picture && data.picture.data && data.picture.data.url) {
            url = data.picture.data.url;
          }

          if(url) {
            var cssAddon = 'class="status--flicker"';

            if(Math.random() < 0.5) {
              cssAddon = 'class="status--flicker-7"';
            }

            if(Math.random() < 0.2) {
              cssAddon = 'class="status--flicker-3"';
            }

            if(Math.random() < 0.1) {
              cssAddon = 'class="status--flicker-2"';
            }

            var markup = '<img src="' + url + '" ' + cssAddon + ' />';
            self._setContent(markup);
          }
        break;
      }
    },

    render: function() {
      return this.$el;
    },
  };

  return Fragment;
});
