define([
  'api',
  'debug',
  'frame',
  'facebook',
], function(api, debug, BaseFrame, FB) {
  var Frame = function() {
    return BaseFrame.prototype._init.apply(this, arguments);
  };

  Frame.prototype = Object.create(BaseFrame.prototype);
  Frame.prototype.constructor = BaseFrame;

  Frame.prototype.activate = function() {
    var $outro = this.$el.find('.outro');
    var $video = $outro.find('.outro__video');

    if($video.length) {
      $video.get(0).play();
    }

    return BaseFrame.prototype.activate.apply(this, arguments);
  };

  return Frame;
});
