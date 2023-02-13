export function facebookPluginMessenger() {
  var chatbox = document.getElementById('fb-customer-chat');

  chatbox.setAttribute('page_id', '110145950848846');
  chatbox.setAttribute('attribution', 'biz_inbox');

  //@ts-ignore
  window.fbAsyncInit = function () {
    //@ts-ignore
    FB.init({
      xfbml: true,
      version: 'v15.0',
    });
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/es_LA/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
}
