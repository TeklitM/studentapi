const Express = require('express');
const app = Express();
const mongoose = require("mongoose");
require("dotenv/config");
const studentRouter = require("./Routes/students");
const bodyParser = require('body-parser');
const multer  = require('multer');

const port = 3000;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/student",studentRouter);
app.use(Express.static('uploads'));

app.listen(port, (error) => {
  if (error) {
    console.error(`error : ${error}`);
  } else {
    console.log(`server is running on port ${port}`);
  }
});

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true } )
.then(() => console.log('DB Connected Successfully'))
.catch((err) => { console.error(err); });