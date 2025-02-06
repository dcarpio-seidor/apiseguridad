const express = require("express");
const router = express.Router();

module.exports = function () {
  // Gets the userinfo
  router.get('/userinfo', function (req, res) {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        "message": "User not found"
      });
    }
    res.status(200).json(user);
  });
  // Gets the userinfo and redirects to external url
  router.get('/userinfo/redirect', function (req, res) {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        "message": "User not found"
      });
    }
    res.redirect(`https://www.seidor.com/es-pe/search-results?search=${user.id}`);
  });
  // returns
  return router;
};
