var githubUsernames = {
    "0218982": "isiguenza",
    // Agrega más usuarios aquí
  };
  
  // Obtiene el ID del usuario de la URL
  var userId = window.location.pathname.split("/").pop();
  
  // Obtiene el nombre de usuario de GitHub correspondiente
  var githubUsername = githubUsernames[userId];
  
  // Si el nombre de usuario existe, redirige al usuario a su página de GitHub
  if (githubUsername) {
    window.location.href = "https://github.com/" + githubUsername;
  } else {
    // Si no existe, redirige a la página 404
    window.location.href = "/404.html";
  }
  