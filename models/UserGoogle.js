const mongoose=require("mongoose");
const findOrCreate=require("mongoose-findorcreate");
const userGoogleSchema = new mongoose.Schema
({
    email:String,
    name: String,
    googleId:String,
    // name: String,
    // pic: String
});
userGoogleSchema.plugin(findOrCreate);
const UserGoogle= mongoose.model('UserGoogle', userGoogleSchema);

module.exports = UserGoogle;