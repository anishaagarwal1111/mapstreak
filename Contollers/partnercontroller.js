const mongoose = require('mongoose');
const Partner = require('../models/partnerModel');
const multer = require('multer');


module.exports.partner_get = async(req,res) => {
 res.render('joinus');
}

module.exports.partner_post = async(req,res) => {
    const {outletName, state, city, primary_location, pincode, outlet_type, contact_person, name, phone_no, type_of_cusines, time} = req.body;
    const image = req.file
    try{
        const partner = await Partner.create({outletName, state, city, primary_location, pincode, outlet_type, contact_person, name, phone_no, type_of_cusines, time, image});
        if(partner){
            res.status(201);
            res.json({
                _id: partner._id,
                outletName: partner.outletName,
                state: partner.state,
                city: partner.city,
                primary_location: partner.primary_location,
                pincode: partner.pincode,
                outlet_type: partner.outlet_type,
                contact_person: partner.contact_person,
                name: partner.name,
                phone_no: partner.phone_no,
                type_of_cusines: partner.type_of_cusines,
                time: partner.time,
                image: partner.filename
            });
        }
        
        else{
            res.status(400);
            throw new Error("Invalid details");
        }
    }
    catch(err){
        console.log(err);
    }
}