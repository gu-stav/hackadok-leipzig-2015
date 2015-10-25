define([
    'lodash',
  ],
  function(_) {
  var Timeline = function(frame) {
    return this._init(frame);
  };

  Timeline.prototype = {
    _init: function(frame) {
      this.frames = [];
    },

    add: function(frame) {
      this.frames.push(frame);
    },

    where: function(condition) {
      return _.findWhere(this.frames, condition);
    },
  };

  /* make it available globally */
  return Timeline;

});