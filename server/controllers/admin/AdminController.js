const { body, validationResult } = require('express-validator');
const InstructorRegisterSchema = require('../../models/admin/InstructorModel');
const ContentSchema = require('../../models/admin/content');
const jwt = require('jsonwebtoken');

const loginInstrucor = async (req, resp, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(200).json({ errors: errors.array() });
  }

  try {
    const email = req.body.email;
    const password = req.body.password;
    const usermail = await InstructorRegisterSchema.findOne({ email, password });
    if (usermail) {
      let token = await jwt.sign({ username: usermail.email }, process.env.JWT_SECRET, { expiresIn: '11h' });
      resp.status(200).json({
        code: 200,
        message: "User login successfully",
        data: { _id: usermail._id, name: usermail.name, email: usermail.email, token },
        error: false,
        status: true,
      });
    } else {
      resp.status(404).json({
        code: 404,
        message: "Invalid user details, try again.",
        data: [],
        error: false,
        status: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const createInstructor = async (req, resp) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, contact, password } = req.body;
    const usermail = await InstructorRegisterSchema.findOne({ email });
    if (usermail) {
      resp.status(404).json({
        code: 404,
        message: "User already exists.",
        data: [],
        error: false,
        status: false,
      });
    } else {
      let data = new InstructorRegisterSchema({ name, email, contact, password });
      await data.save();
      resp.status(200).json({
        code: 200,
        message: "User registered successfully",
        error: false,
        status: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};




const createCategory = async (req, resp) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).json({ errors: errors.array() });
  }

  try {
    let { title, pname, pslug, price, disprice, description } = req.body;
    const img = req?.file?.filename;
    let data = new ContentSchema({ title, pname, pslug, price, disprice, description, img });
    await data.save();
    resp.status(200).json({
      code: 200,
      message: "Content added successfully",
      error: false,
      status: true,
    });
  } catch (err) {
    console.log(err);
  }
};

const putCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let { title, pname, pslug, price, disprice, description } = req.body;
    const img = req.file.filename;
    let data = await ContentSchema.updateOne({ _id: req.params._id }, { $set: { title, pname, pslug, price, disprice, description, img } });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

const getCategory = async (req, res) => {
  let data = await ContentSchema.find();
  res.send(data);
};

const getSingleCategory = async (req, res) => {
  let data = await ContentSchema.find({ _id: req.params._id });
  res.send(data);
};

const deleteCategory = async (req, resp) => {
  try {
    let data = await ContentSchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createCategory,
  putCategory,
  getCategory,
  deleteCategory,
  getSingleCategory,
  loginInstrucor,
  createInstructor,

}; 

// Validation middlewares
const validateLoginInstructor = [
  body('email')
    .isEmail().withMessage('Please enter a valid email address.'),
  body('password').notEmpty().withMessage('Password must be at least 6 characters long.')
];

const validateCreateInstructor = [
  body('name')
    .notEmpty().withMessage('Name is required.'),
  body('email')
    .isEmail().withMessage('Please enter a valid email address.'),
  body('contact')
    .isLength({ min: 10 }).withMessage('Contact number must be at least 10 digits long.'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
];

const validateCreateCategory = [
  body('title')
    .notEmpty().withMessage('Title is required.'),
  body('pname')
    .notEmpty().withMessage('Pname is required.'),
  body('pslug')
    .notEmpty().withMessage('Pslug is required.'),
  body('price')
    .isNumeric().withMessage('Price must be a number.'),
  body('disprice')
    .isNumeric().withMessage('Discounted price must be a number.'),
  body('description')
    .notEmpty().withMessage('Description is required.')
];

const validateUpdateCategory = [
  body('title')
    .notEmpty().withMessage('Title is required.'),
  body('pname')
    .notEmpty().withMessage('Pname is required.'),
  body('pslug')
    .notEmpty().withMessage('Pslug is required.'),
  body('price')
    .isNumeric().withMessage('Price must be a number.'),
  body('disprice')
    .isNumeric().withMessage('Discounted price must be a number.'),
  body('description')
    .notEmpty().withMessage('Description is required.')
];


module.exports.validateLoginInstructor = validateLoginInstructor;
module.exports.validateCreateInstructor = validateCreateInstructor; 
module.exports.validateCreateCategory = validateCreateCategory;
module.exports.validateUpdateCategory = validateUpdateCategory;
 