const mongoose=require("mongoose");

const vegmenuSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    price:{
       type: Number
    }
})
const vegMenu= mongoose.model('vegMenu', vegmenuSchema);

module.exports = vegMenu;