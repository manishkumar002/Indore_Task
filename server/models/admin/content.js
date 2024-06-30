const mongoose = require("mongoose");
const ContentSchema = new mongoose.Schema({
  title: {
        type: String,
        required: true,
      },
      
      pname: {
        type: String,
        required: true,
      },
      pslug: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      disprice: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      }
     
    
}); 
module.exports = mongoose.model('Content_tbl',ContentSchema);
 