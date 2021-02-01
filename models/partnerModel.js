const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema
({
    outletName : {
        type: String,
        required: true
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    primary_location: {
        type: String
    },
    pincode : {
        type: Number
    },
    // outlet_type: {
    //     value1: { type: Boolean, required: true, default:true  },
    //     value2: { type: Boolean, required: true, default:true  },
    //     value2: { type: Boolean, required: true, default:true  }
    // },
    contact_person: {
        type: String
    },
    name :{
        type: String
    },
    phone_no : {
        type: Number
    },
    // type_of_cusines :{
    //     value1: { type: Boolean, required: true, default:true  },
    //     value2: { type: Boolean, required: true, default:true   },
    //     value2: { type: Boolean, required: true, default:true  }
    // },
    // time : {
    //     type : Number
    // },
    image: {    
        type: String
    }
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;