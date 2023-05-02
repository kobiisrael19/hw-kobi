const express = require("express");
const { BikeModel, validateBike } = require("../models/bikeModel")
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const perPage = 5;
    const page = req.query.page - 1 || 0;
    const data = await BikeModel.find({}).limit(perPage).skip(page * perPage)
    res.json(data)
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})


router.get("/single/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await BikeModel.findOne({ _id: id });
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})


router.post('/', async (req, res) => {
  const validBody = validateBike(req.body)
  if (validBody.error) {
    return res.status(400).json(validBody.error.details)
  }
  try {
    const bike = new BikeModel(req.body)
    await bike.save()
    res.status(201).json(bike)
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

router.put("/:id", async (req, res) => {
  const validBody = validateBike(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const id = req.params.id;
    const data = await BikeModel.updateOne({ _id: id }, req.body);
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await BikeModel.deleteOne({ _id: id });
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})


module.exports = router;