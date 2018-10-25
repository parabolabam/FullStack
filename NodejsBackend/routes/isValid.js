const password = function(password) {
  if(password === "") return false;
  if(password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g) === null) return false;
  return true;
}

const login = function(login) {
  return login !== "";
}


module.exports = {
  login : login,
  password : password
}
