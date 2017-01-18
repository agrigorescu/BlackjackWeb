const express = require("express");
const router = express.Router();
const path = require("path");
const registrationController = require("../controllers/registrationController")
const showGameController = require("../controllers/showGameController")
const loginController = require("../controllers/loginController")
const inviteController = require("../controllers/inviteController")
const homepageController = require("../controllers/homepageController")
const accountController = require("../controllers/accountController")
const successController = require("../controllers/successController")


router.post("/login", (req,res) => {
    res.status(201).send({sucess: "done"});
});
router.post("/registration", (req,res) => {
    res.status(201).send({success: "Done"});
});
// router.get('/success', (req, res) => {
//     res.sendFile(`success.html`,{root:path.resolve('./public')});
// });

router.get('*', (req, res) => {
    res.sendFile(`index.html`,{root:path.resolve('./public')});
});
// router.post("/success/:username/:token", (req,res) => {
//     res.status(201).send({success: "Done"});
// });
router.get("/", homepageController.showHomepage);

module.exports = router;