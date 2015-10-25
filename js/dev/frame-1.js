define([
  'frame',
  'facebook',
], function(BaseFrame, FB) {
  var Frame = function() {
    return BaseFrame.prototype._init.apply(this, arguments);
  };

  Frame.prototype = Object.create(BaseFrame.prototype);
  Frame.prototype.constructor = BaseFrame;

  Frame.prototype.activate = function() {
    var self = this;

    FB.init({
      appId: '879156412199142',
      xfbml: false,
      version: 'v2.5'
    });

    var $loginButton = this.$el.find('.login__button');
    var $video = this.$el.find('.login__video');

    var loginUser = function(event) {
      event.preventDefault();

      FB.login(function(res) {
        var loginStatus = res.status === 'connected' ? true : false;

        if(loginStatus === true) {
          self.facebookLogin = true;

          if(self.videoEnd) {
            self.$el.trigger('end.frame');
          }
        }
      }, {
          scope: 'publish_actions',
          return_scopes: true
      });
    };

    var saveEndOfVideo = function(e) {
      self.videoEnd = true;

      if(self.facebookLogin) {
        self.$el.trigger('end.frame');
      }
    };

    if($video.length) {
      $video.get(0).play();
    }

    $loginButton.on('click.frame', loginUser);
    $video.on('ended', saveEndOfVideo);

    return BaseFrame.prototype.activate.apply(this, arguments);
  };

  return Frame;
});
