const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController")
const showGameController = require("../controllers/showGameController")


router.get("/", registrationController.showRegistration);
router.get("/play", showGameController.showGameBoard); 


module.exports = router;