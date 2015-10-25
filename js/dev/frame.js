define([
  'jquery',
], function($) {

  var Frame = function($el) {
    this.$el = $el;
  };

  Frame.prototype = {
    activate: function() {
      this.$el.addClass('frame--active');
    },

    deactivate: function() {
      this.$el.removeClass('frame--active');
    },
  };

  return Frame;

});
