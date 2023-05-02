const mongoose = require("mongoose");
const Joi = require("joi");


const bikeSchema = new mongoose.Schema(
  {
    company:String,
    model:String,
    year:Number,
    price:Number
  },
  {timestamps:true}
)

exports.BikeModel = mongoose.model("bikes",bikeSchema);

exports.validateBike = (_reqBody)=>{
  const joiSchema = Joi.object({
    company: Joi.string().min(2).max(200).required(),
    model: Joi.string().min(2).max(200).required(),
    year: Joi.number().min(4).max(2050).required(),
    price: Joi.number().min(1000).max(1000000).required(),
  })
  return joiSchema.validate(_reqBody)
}