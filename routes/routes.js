const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController")
const showGameController = require("../controllers/showGameController")
const loginController = require("../controllers/loginController")

router.get("/", registrationController.showRegistration);
router.get("/login", loginController.showLogin);
router.get("/play", showGameController.showGameBoard); 

module.exports = router;