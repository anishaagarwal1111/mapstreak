const mongoose=require("mongoose");

const nonvegmenuSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    price:{
       type: Number
    }
})
const NonvegMenu= mongoose.model('NonvegMenu', nonvegmenuSchema);

module.exports = NonvegMenu;