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

    api.login()
      .then(function() {
        FB.ui(
          {
            method: 'share',
            href: 'https://immersion.media.mit.edu',
          },
          function(response) {
            if (response && !response.error_message) {
              alert('Posting completed.');
            } else {
              alert('Error while posting.');
            }
          }
        );
      });

    return BaseFrame.prototype.activate.apply(this, arguments);
  };

  return Frame;
});
