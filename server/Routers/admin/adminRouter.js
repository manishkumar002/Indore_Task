const express = require("express");
const Router = express.Router();
const { 
  createCategory,
  putCategory,
  getCategory,
  deleteCategory,
  getSingleCategory,
  loginInstrucor,
  createInstructor,
  
} = require('../../controllers/admin/AdminController');
const img_upload = require('../../multer/admin/fileupload');
const { requireSignIn } = require('../../middlewares/authMiddleware');

const {
  validateLoginInstructor,
  validateCreateInstructor,
  validateCreateCategory,
  validateUpdateCategory
} = require('../../controllers/admin/AdminController');

Router.route('/content/:_id')
  .put(img_upload.single('img'), requireSignIn, validateUpdateCategory, putCategory)
  .delete(requireSignIn, deleteCategory)
  .get(requireSignIn, getSingleCategory);

Router.route('/content')
  .post(img_upload.single('img'), requireSignIn, validateCreateCategory, createCategory)
  .get(requireSignIn, getCategory);


Router.route('/instructorlogin')
  .post(validateLoginInstructor, loginInstrucor);

Router.route('/instructor')
  .post(validateCreateInstructor, createInstructor)


module.exports = Router;
