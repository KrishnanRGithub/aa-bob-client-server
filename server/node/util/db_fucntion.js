const User = require("../schema/userSchema");
updateAAID = async(mobile,tID,rID)=>{
    User.updateOne({ mobile: mobile }, { $set: { trackingId: tID, referenceId:rID } }, (error) => {
        if (error) {
          console.log(error);
          return false;
        } else {
          console.log('User updated successfully!');
        }
      });
      return true;

}
module.exports = {updateAAID};