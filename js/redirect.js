var githubUsernames = {
    "0218982": "isiguenza",
   
  };
  

  var userId = window.location.pathname.split("/").pop();
  var githubUsername = githubUsernames[userId];
  if (githubUsername) {
    window.location.href = "https://github.com/" + githubUsername;
  } else {
    window.location.href = "/404.html";
  }
  