const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController")
const showGameController = require("../controllers/showGameController")
const loginController = require("../controllers/loginController")
const homepageController = require("../controllers/homepageController")
// const registerController = require()

router.get("/", homepageController.showHomepage);
router.get("/login", loginController.showLogin);
router.get("/registration", registrationController.showRegistration);
router.get("/play", showGameController.showGameBoard); 


router.post("/registration", (req,res) => {
    res.status(201).send({success: "Done"});
});

module.exports = router;