var githubUsernames = {
    "0218982": "isiguenza",
    "0350009": "luisced"
  };
  
  
  var userId = window.location.pathname.split("/").pop();
  var githubUsername = githubUsernames[userId];
  if (githubUsername) {
    window.location.href = "https://github.com/" + githubUsername;
  } else {  
    if (window.location.pathname !== "/404.html") {
      window.location.href = "/404.html";
    }
  }
  