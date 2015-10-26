define([
  'api',
  'frame',
  'facebook',
], function(api, BaseFrame, FB) {
  var Frame = function() {
    return BaseFrame.prototype._init.apply(this, arguments);
  };

  Frame.prototype = Object.create(BaseFrame.prototype);
  Frame.prototype.constructor = BaseFrame;

  Frame.prototype.activate = function() {
    var self = this;
    var $loginButton = this.$el.find('.login__button');
    var $video = this.$el.find('.login__video');

    var saveEndOfVideo = function(e) {
      self.videoEnd = true;

      if(self.facebookLogin) {
        self.$el.trigger('end.frame');
      }
    };

    $loginButton.on('click.frame', function(event) {
      event.preventDefault();

      api.login()
        .then(function(data) {
          if($video.length) {
            $video.get(0).play();
          }

          if(data.status === true) {
            self.facebookLogin = true;
          }

          if(self.videoEnd) {
            self.$el.trigger('end.frame');
          }
        });
    });

    $video.on('ended', saveEndOfVideo);

    return BaseFrame.prototype.activate.apply(this, arguments);
  };

  return Frame;
});
