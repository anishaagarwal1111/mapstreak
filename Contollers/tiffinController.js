const asyncHandler = require('express-async-handler');
const Tiffin = require('../models/tiffinServiceModel');
const TiffinVeg = require('../models/VegMenuModel');
const TiffinNonVeg = require('../models/NonVegMenuModel');
const Tiffinveg = require('../data/vegMenu');
const Tiffinnonveg = require('../data/NonvegMenu');

module.exports.get_tiffin  = asyncHandler(async (req, res) => {
    const tiffins = await Tiffin.find({});
    res.render('tiffinservices');
  });
  
  module.exports.getTiffinById = asyncHandler(async (req, res) => {
    const tiffin = await Tiffin.findById(req.params.id);
    if (tiffin) {
      res.json(tiffin);
    } else {
      res.status(404);
      throw new Error('No such Service found');
    }
  });

  module.exports.getTiffinveg = async(req,res) => {
    const tiffin1 = await Tiffin.findById(req.params.id);
    if(tiffin1){
      res.json(Tiffinveg);
    }
    else{
      res.status(404);
      throw new Error("No such service");
    }
  }
  
  module.exports.getTiffinnonveg = async(req,res) => {
    const tiffin1 = await Tiffin.findById(req.params.id);
    if(tiffin1){
      res.json(Tiffinnonveg);
    }
    else{
      res.status(404);
      throw new Error("No such service");
    }
  }

