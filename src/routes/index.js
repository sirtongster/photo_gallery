const { Router } = require('express');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');

const router = Router();
const Photo = require('../models/Photo');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

router.get('/', async (req, res) => {
  const photos = await Photo.find();
  res.render('images', {photos});
});

router.get('/images/add', async (req, res) => {
  const photos = await Photo.find();
  res.render('image_form', {photos});
});

router.post('/images/add', async (req, res) => {
  const {title, description} = req.body;

  const result = await cloudinary.v2.uploader.upload(req.file.path);
  const { url, public_id } = result;

  const newPhoto = new Photo({title, description, imageURL: url, public_id});
  await newPhoto.save();

  await fs.unlink(req.file.path);

  res.send('Received');
});

router.get('/images/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await Photo.findByIdAndDelete(id);
    const result = await cloudinary.v2.uploader.destroy(photo.public_id);
    console.log(result);
    res.redirect('/images/add');
  } catch (err) {
    return new Error('Image cannot be delete');
  }
});

module.exports = router;