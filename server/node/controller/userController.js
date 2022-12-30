const { intarystrtohex } = require("jsrsasign");
const User = require("../schema/userSchema");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res, next) => {
    console.log("New account request")
    var mobile = req.body.mobile.trim();
    var pin = req.body.pin;
    pin = await bcrypt.hash(pin, 10);
    var user = await User.findOne({mobile: mobile})
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    var response = { "msg":"Account created successfully","type":"success"}
    if(user == null) {
        user = new User({
            mobile: mobile,
            pin: pin,
            isLinked: false,
        });
        
        user.save((error) => {
            if (error) {
                response["msg"]="Couldnt create account";
                response["type"]="error";
                console.log(error);
            }
        });
        
    }else{
        response["msg"]="Account exists already";
        response["type"]="error";
    }
    res.end(JSON.stringify(response));
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

