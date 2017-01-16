const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController")
const showGameController = require("../controllers/showGameController")


router.get("/", registrationController.showRegistration);
<<<<<<< HEAD
router.get("/login");
=======
router.get("/play", showGameController.showGameBoard); 
>>>>>>> master


module.exports = router;