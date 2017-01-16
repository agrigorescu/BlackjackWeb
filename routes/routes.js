const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController")
const showGameController = require("../controllers/showGameController")

const loginController = require("../controllers/loginController")

router.get("/", registrationController.showRegistration);
router.get("/login", loginController.showLogin);

const homepageController = require("../controllers/homepageController")


router.get("/", homepageController.showHomepage);
router.get("/login");
router.get("/registration", registrationController.showRegistration);

router.get("/play", showGameController.showGameBoard); 

module.exports = router;