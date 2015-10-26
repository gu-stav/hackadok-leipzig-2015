define([
  'facebook',
], function(FB) {
  var login = function() {
    return new Promise(function(resolve, reject) {
      FB.init({
        appId: '879156412199142',
        xfbml: false,
        version: 'v2.5',
      });

      var permissions = [
        'user_friends',
      ];

      var settings = {
          scope: permissions.join(',')
      };

      var callback = function(response) {
        console.log(response);
        if(!response || response.error) {
          throw new Error(response.error || 'Request Failed');
        }

        resolve({status: response.status === 'connected' ? true : false});
      };

      FB.getLoginStatus(function(response) {
        if (response.status !== 'connected') {
          FB.login(callback, settings);
        } else {
          resolve({status: true});
        }
      });
    });
  };

  var fetch = function(endpoint) {
    return login()
      .then(function() {
        return new Promise(function(resolve, reject) {
          FB.api(
              endpoint,
              function (response) {
                if(!response || response.error) {
                  throw new Error(response.error || 'Request Failed');
                }

                resolve(response);
              }
          );
        });
      })
      .then(function(response) {
        return {
          data: response.data,
          response: response,
        };
      });
  };

  var api = {
    fetch: fetch,
    login: login,
  };

  return api;
});
