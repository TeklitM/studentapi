const Express = require('express');
const router = Express.Router();
const multer  = require('multer');
const studentController = require("../Countroller/StudentController");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split(".").reverse()[0])
  }

})

const upload = multer({ storage:storage });

router.post('/addStudent', upload.single('avatar'), async  (req, res)=> {
     try {
      await studentController.studentRegister(req,res);
} catch (error) {
    console.log(error);
  }
});

router.post("/updateStudent", upload.single('avatar'),  async (req, res) => {
 await studentController.studentUpdate(req,res);
});

router.post("/deleteStudent", upload.single('avatar'),  async (req, res) => {
     try {
await studentController.studentDelete(req,res);
} catch (error) {
    console.log(error);
  }
});

router.get("/allStudents", async (req, res) => {
     try {
await studentController.listAllStudents(req,res);
} catch (error) {
    console.log(error);
  }
});
module.exports = router;