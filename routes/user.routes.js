const router = require("express").Router()
const User = require("../app/controllers/user.contoller")




// Login
router.post("/login", loginRateLimiter, User.login)

// Logout
router.post("/logout", authentication, User.logOut)






module.exports = router