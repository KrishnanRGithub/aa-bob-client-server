const User = require("../schema/userSchema");
// const bcrypt = require("bcrypt");

exports.createUser = async (req, res, next) => {
    var email = req.body.email.trim();
    var password = req.body.password;
    // var image = "/images/dp.jpg";
    // if (!req.body.source)  //When creating with google source will be directly set
    // {
    //     req.body.source = "WeAuth";
    //     req.body.image = process.env.DEPLOYMENT_URL+"/images/dp.jpg";
    //     req.body.firstName = "";
    //     req.body.lastName = "";
    // }
    // if (email && password) {
    //     var user = await User.findOne({email: email})
    //     .catch((error) => {
    //         console.log(error);
    //         res.status(400).json({status: "Something Went Wrong with DB"});
    //     })

    //     if(user == null) {
    //         var data = req.body;
    //         data.password = await bcrypt.hash(password, 10);
    //         User.create(data)
    //           .then(() => {
    //             return res.redirect("/");
    //         })
    //     }
    //     else {
    //         // TODO proper error codes User Found
    //         return res.redirect("/");
    //     }
    // }
    // else {
    //     return res.redirect("/");
    // }
};

exports.loginUser = async (req, res, next) => {   
    var email = req.body.email.trim();
    var password = req.body.password;
    // if(email && password) {
    //     var user = await User.findOne({ email: email })
    //     .catch((error) => {
    //         console.log(error);
    //         return res.redirect("/");
    //     })

    //     if (user != null) {
    //         // console.log(user);
    //         var result = await bcrypt.compare(password, user.password);
    //         if(result === true) {
    //             req.session.user = user;
    //             return res.redirect("/profile");
    //         }
    //     }
    //     return res.redirect("/");
    // //   res.status(200).json({status: "User : Invalid Credentials"});
      
    // }
    return res.redirect("/");

    // res.status(200).render("user/profile");
}



exports.updateUserDetails = async (req, res, next) => {
    if (!req.session.user) return res.redirect("/");
    var email = req.session.user.email.trim();
    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var image = req.body.image;
    if (email) {
        var user = await User.updateOne(  {email : email}, { $set: { firstName:firstName,lastName:lastName,image:image } }, {
            new: true,
            runValidators: true,
            }).catch((error) => {
                console.log(error);
                res.status(400).json({status: "Something Went Wrong with DB"});
            }).catch(() => {
                res.status(400).json({status: "Image Size too Large"});

            })
        req.session.user.firstName = firstName;
        req.session.user.lastName = lastName;
        req.session.user.image = image;

    }
    return res.redirect("/profile");
}

