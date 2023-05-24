const { date } = require('joi');
var Prodb = require('../model/product');
const multer = require('multer');
var Storage = multer.diskStorage({
    destination: "uploads",
    filename : (req, file, cb)=>{
      cb(null, file.originalname);
    },
    
  });
  
  var upload = multer({
    storage: Storage,
   
  }).single("image");

exports.create = (req,res)=>{
 
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    upload(req,res,(err)=>{
        if(err){
            console.log(err);
        }else{
            const pro = new Prodb({
                masp : req.body.masp,
                tensp : req.body.tensp,
                dongia: req.body.dongia,
                image: req.file.filename,
                mausac: req.body.mausac,
                soluong: req.body.soluong,
                trangthai: req.body.trangthai,
                mota: req.body.mota,
            })
            
            pro
        .save(pro)
        .then(data => {
            res.redirect('/add-product');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });
        }
    });
   
    

}

exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Prodb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Prodb.find()
            .then(date => {
                res.send(date)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Prodb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

exports.delete = (req, res)=>{
    const id = req.params.id;

    Prodb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}