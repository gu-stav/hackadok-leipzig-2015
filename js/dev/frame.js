define([
  'jquery',
], function($) {

  var Frame = function($el) {
    this._init($el);
  };

  Frame.prototype = {
    _init: function($el) {
      this.$el = $el;
      this.active = false;
      this.$el.frame = this;
    },

    activate: function() {
      this.active = true;
      this.$el.addClass('frame--active');
    },

    deactivate: function() {
      this.active = false;
      this.$el.removeClass('frame--active');
    },
  };

  return Frame;
});
