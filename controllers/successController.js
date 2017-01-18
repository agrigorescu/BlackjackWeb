// pages saying successful validation of account
// page which gets the username and token from URL 

class Success {
    static showSuccess(req, res) {
        res.render("success");
    }
}

module.exports = Success;