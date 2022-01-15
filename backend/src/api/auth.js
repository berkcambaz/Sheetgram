function auth(token) {
  return { token }
}

function login(usertag, password) {
  return { usertag, password }
}

function signup(usertag, email, password) {
  return { usertag, email, password }
}

module.exports = { auth, login, signup };