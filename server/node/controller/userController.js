const { intarystrtohex } = require("jsrsasign");
const User = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const redis = require('redis');
const { RateLimiterRedis } = require('rate-limiter-flexible');
// You may also use Mongo, Memory or any other limiter type

const redisClient = redis.createClient({
  enable_offline_queue: false,
});

const maxConsecutiveFailsByMobile = 5;

const limiterConsecutiveFailsByMobile = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: 'login_fail_consecutive_mobile',
  points: maxConsecutiveFailsByMobile,
  duration: 60 * 60 * 3, // Store number for three hours since first fail
  blockDuration: 60 * 120, // Block for 15 minutes
});

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
    console.log("Login request")
    var mobile = req.body.mobile.trim();
    var pin = req.body.pin;
    const rlResMobile = await limiterConsecutiveFailsByMobile.get(mobile);
    if (rlResMobile !== null && rlResMobile.consumedPoints > maxConsecutiveFailsByMobile) {
        const retrySecs = Math.round(rlResMobile.msBeforeNext / 1000) || 1;
        response["msg"]="Too many Requests";
        response["type"]="error";
        response["auth"]=false;
        res.end(JSON.stringify(response));
    }
    var user = await User.findOne({mobile: mobile})
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    var response = { "msg":"Logged in successfull","type":"success","auth":true}
    if(user == null) {
        response["msg"]="Account doesnt exist";
        response["type"]="error";
        response["auth"]=false;
    }else{
        var result = await bcrypt.compare(pin, user.pin);
        if(result === true) {
            console.log("Credentials matched")
        }
        else{
            response["msg"]="Invalid Credentials";
            response["type"]="error";
            response["auth"]=false;
        }
    }
    res.end(JSON.stringify(response));
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

