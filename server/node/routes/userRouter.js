const express = require('express')
const userController = require('../controller/userController')
const router = express.Router()



router
  .route("/login")
  .post(userController.loginUser);


router
  .route("/signup")
  .post(userController.createUser);

router.
  route("/logout")
  .get((req, res, next) => {
    if (req.session) {
      req.session.destroy(() => {
        return res.redirect("/");
      })
    }
  });

// router.
//   route("/profile")
//   .get((req, res, next) => {
//     if (!req.session.user) return res.redirect("/");
//     res.render("user/profile",{user:req.session.user});
//   });

// router.
//   route("/update")
//   .post(userController.updateUserDetails);


module.exports = router;