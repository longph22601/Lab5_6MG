var Userdb = require('../model/model');
const multer = require('multer');
const jwt = require('jsonwebtoken');


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
            const user = new Userdb({
                name : req.body.name,
                username : req.body.username,
                password: req.body.password,
                image: req.file.filename
               
            })
            
            user
        .save(user)
        .then(data => {
            res.redirect('/add-user');
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

        Userdb.findById(id)
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
        Userdb.find()
            .then(user => {
                res.send(user)
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
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
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

    Userdb.findByIdAndDelete(id)
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
// exports.signin=(req,res,next)=>{
//     var username = req.body.username;
//     var password = req.body.password;

//      Userdb.findOne({
//         username : req.body.username,
//         password : req.body.password
//      })
//      .then(data=>{
//         if(data){
//            var token = jwt.sign({_id: data._id},'mk')
//             return res.json({
//                 message:'thanh cong',
//                 token : token
//             })
//         }else{
//             return res.json("that bai")
//         }
//     })
//     .catch(err=>{
//         res.status(500).json("loi sv")
//     });

// }
// exports.signup= (req,res,next)=>{
//     console.log('Call to sign up')
//     const founduser = Userdb.findOne({username})
//     console.log(founduser)
//     if(founduser) return res.status(403).json({error:{message:'Username is already is use'}})

//     if(!req.body){
//       res.status(400).send({ message : "Content can not be emtpy!"});
//       return;
//   }
//   upload(req,res,(err)=>{
//       if(err){
//           console.log(err);
//       }else{
//           const user = new Userdb({
//               name : req.body.name,
//               username : req.body.username,
//               password: req.body.password,
//               image: req.file.filename
             
//           })    
//           user
//       .save(user)
//       .then(data => {
//           res.redirect('/add-user');
//           const token = endcodeToken(user._id);
//           return res.status(201).json({success:true, token})
          

//       })
//       .catch(err =>{
//           res.status(500).send({
//               message : err.message || "Some error occurred while creating a create operation"
//           });
//       });
      
//       }
//   });
 
// }

