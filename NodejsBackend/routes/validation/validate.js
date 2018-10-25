module.exports = {
  password: function password(password) {
    console.log("Validating password method")

    if (password.match(/^[a-zA-Z]+$/g) === null) {
      console.log("Invalid password")
      return true
    } else {
      return false
    }
  },
  email: function(email) {
    console.log("Validating email method")
    if (email.match() === null) {

    }

  }
}