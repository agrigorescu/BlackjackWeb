const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController")
const showGameController = require("../controllers/showGameController")
const loginController = require("../controllers/loginController")
const inviteController = require("../controllers/inviteController")
const homepageController = require("../controllers/homepageController")
const accountController = require("../controllers/accountController")


router.get("/", homepageController.showHomepage);
router.get("/login", loginController.showLogin);
router.get("/invite", inviteController.showInvite);
router.get("/registration", registrationController.showRegistration);
router.get("/play", showGameController.showGameBoard);

router.post("/login", (req,res) => {
    res.status(201).send({sucess: "done"});
});
router.get("/play", showGameController.showGameBoard); 
router.get("/account", accountController.showAccount); 


module.exports = router;