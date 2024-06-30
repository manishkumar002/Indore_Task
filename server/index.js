const express = require('express'); 
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors'); 
const env = require('dotenv');

const PORT = process.env.PORT || 8000;
const adminRouter = require('./Routers/admin/adminRouter');

env.config();
require('./config/db');

app.use(bodyParser.json());
app.use(express.json());

app.use(cors());

// Routes
app.use("/api", adminRouter);
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api/img", express.static("./public/upload")); 

// Start server
app.listen(PORT, () => {
  console.log("Hi Manish, your server is running at this port: " + PORT);
});
