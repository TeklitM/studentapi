const { Student } = require('../Models/Student');
const fs = require('fs');

var List = require("collections/list");


  const studentRegister = async (req,res) =>{
 try {
   const news = new Student({
     firstName:req.body.firstName,
     lastName : req.body.lastName,
     dateOfBirth:req.body.dateOfBirth,
     image:req.file.filename,
   });

 const userData = await news.save();
      res.status(200).json({student:userData , status:"SUCCESS",message:"Student registered successfully."});
} catch (error) {
    console.log(error);
  }
}

const studentUpdate = async (req,res) =>{
 try {
    const isUserExist = await Student.findOne({ id: req.body.id});
    if (isUserExist) {
       
     isUserExist.firstName=req.body.firstName;
     isUserExist.lastName = req.body.lastName;
     isUserExist.dateOfBirth=req.body.dateOfBirth;
     try{
          isUserExist.image =req.file.filename;
          deleteFile("uploads/",isUserExist.image);
     }catch(err){
      console.log(err);
     }
      const Data = await Student.findOneAndUpdate({id: req.body.id},isUserExist);
       res.status(200).json({student:isUserExist , status:"SUCCESS",message:"Student updated successfully."});
    }
    else {
      res.json({ satus: "ERROR", message: "User does not exist!" });
    }


  } catch (error) {
    console.log(error);
  }

}

const studentDelete = async (req,res)=>{
    try {
    const isUserExist = await Student.findOne({ id: req.body.id});
    if (isUserExist) {
     
      const Data = await Student.deleteOne({id:req.body.id}) ;
    deleteFile("uploads/",isUserExist.image);
       res.status(200).json({student:Data , status:"SUCCESS",message:"Student deleted successfully"});
    }
    else {
      res.json({ satus: "ERROR", message: "Student does not exist!" });
    }


  } catch (error) {
    console.log(error);
  }
}

const listAllStudents = async(req, res) =>{
    try {
       const studentData =await Student.find();

       if (!studentData) {
      return res.status(400).json({ status: "ERROR", message: "No student data found" });
    }

    const allStudents = new List();

    studentData.forEach(data => {
      allStudents.push(
  new Student({
      id:data.id,
      firstName: data.lastName,
      lastName: data.lastName,
      dateOfBirth:data.dateOfBirth,
      image:data.image
  })
);
    });

    return res.status(200).json({ students: allStudents, status: "SUCCESS" });
  } catch (error) {
    console.log(error);
  }
}

function deleteFile(path,fileName){
fs.unlink(path + fileName, (err) => {
    if (err) {
        throw err;
    }
});
}
module.exports ={
    studentRegister,studentUpdate,studentDelete,listAllStudents,deleteFile
}