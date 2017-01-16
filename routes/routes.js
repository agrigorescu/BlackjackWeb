const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController")
const showGameController = require("../controllers/showGameController")
const homepageController = require("../controllers/homepageController")


router.get("/", homepageController.showHomepage);
router.get("/login");
router.get("/registration", registrationController.showRegistration);
router.get("/play", showGameController.showGameBoard); 


module.exports = router;