const mongoose=require("mongoose");

const userFbSchema = new mongoose.Schema
({
    uid: String,
    email: String,
    name: String,
    pic: String
    
});

const UserFb= mongoose.model('UserFb', userFbSchema);

module.exports = UserFb;