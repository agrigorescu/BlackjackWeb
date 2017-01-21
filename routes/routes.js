const express = require("express");
const router = express.Router();
const path = require("path");
// const inviteController = require("../controllers/inviteController")

const successController = require("../controllers/successController");

//any route will be handled by Vue
router.get('*', (req, res) => {
    res.sendFile(`index.html`,{root:path.resolve('./public')});
});

module.exports = router;