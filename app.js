var config = {
  apiKey: "AIzaSyC_ALjoUddvJVfVbKsWlD-FFK-jtyrg4PQ",
  authDomain: "wrapped-21a29.firebaseapp.com",
  databaseURL: "https://wrapped-21a29.firebaseio.com",
  projectId: "wrapped-21a29",
  storageBucket: "wrapped-21a29.appspot.com",
  messagingSenderId: "606608835269"
};
firebase.initializeApp(config);

document.addEventListener("DOMContentLoaded", () => {
  console.log("App loaded!");

  var authButton = document.getElementById("auth-button");

  const clientID = "05d4f56f89ba1a91c3bd";
  const clientSecret = "a9e53f438683513f1fd92d561cce3252af0504e9";

  var provider = new firebase.auth.GithubAuthProvider();
  provider.addScope("repo");
  provider.addScope("user");
  provider.setCustomParameters({
    allow_signup: true
  });
  let userInfo;

  function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }

  authButton.onclick = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        var promise = $.getJSON(
          `https://api.github.com/user?access_token=${token}`
        );
        promise.done(data => {
          userInfo = data;
        });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(email, errorMessage);
      });
  };
});
