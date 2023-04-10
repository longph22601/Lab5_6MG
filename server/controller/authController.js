const bcrypt = require('bcrypt');
const Userdb = require('../model/model');
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



const authController = {
    registerUser: async (req, res) => {

        try {
            // const salt = await bcrypt.genSalt(10);
            // const hashed = await bcrypt.hash(req.body.password, salt);
            ////creatuser
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
            res.redirect('/signin');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });
        
        }
    });
        

        } catch (err) {
            res.status(500).json(err + "loi");
        }



    },
gennerateAccessToken:(users)=>{
    return  jwt.sign({
        id: users.id,
        admin: users.admin
       },'mk',{expiresIn: "2h"});
},
gennerateRefreshToken:(users)=>{
    return  jwt.sign({
        id: users.id,
        admin: users.admin
       },'rfmk',{expiresIn: "365d"});
},



    loginUser: async(req,res)=>{
        try {
            const users = await Userdb.findOne({username : req.body.username});
            if(!users){
                return   res.status(404).json("Wrong username");
            }
            const validPassword = await Userdb.findOne({password : req.body.password});
            if(!validPassword){
              return  res.status(404).json("Wrong pass");
            }
            if(users &&  validPassword){
              const token =  jwt.sign({
                    id: users.id,
                    admin: users.admin
                   },'mk');
                   //{expiresIn: "2h"}
                   res.cookie('auth-token',token,{maxAge: 36000, httpOnly:true});
                   res.redirect('/add-user')
                // const accessToken=  authController.gennerateAccessToken(users);
                // const refreshToken=  authController.gennerateRefeshToken(users);
                res.status(200).json({users,token});

                // res.cookie("refreshToken",refreshToken,{
                //     httpOnly:true,
                //     secure:false,
                //     sameSite:"strict",
                // })

               
            }
        } catch (err) {
            //  return  res.status(403).json("loi"+err);
        }
    },

    loginresUser: async(req,res)=>{
        try {
            const users = await Userdb.findOne({username : req.body.username});
            if(!users){
                return   res.status(404).json("Wrong username");
            }
            const validPassword = await Userdb.findOne({password : req.body.password});
            if(!validPassword){
              return  res.status(404).json("Wrong pass");
            }
            if(users &&  validPassword){
              const token = jwt.sign({
                    id: users.id,
                    admin: users.admin
                   },'mk',{expiresIn: "3d"});
                   //
                res.header('auth-token',token).send(token);
             
                // const accessToken=  authController.gennerateAccessToken(users);
                // const refreshToken=  authController.gennerateRefeshToken(users);
                res.status(200).json({users,token});

                // res.cookie("refreshToken",refreshToken,{
                //     httpOnly:true,
                //     secure:false,
                //     sameSite:"strict",
                // })

               
            }
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // requestRefreshToken: async(req,res)=>{
    //     const refreshToken =req.cookies.refreshToken;
    //     if(!refreshToken){
    //         return(res.status(401).json("you not authenticated"))
    //     }

    //     jwt.verify(refreshToken,'rfmk',(err,users)=>{
    //         if(err){
    //             console.log(err);
    //         }
    //         const newAccessToken = authController.gennerateAccessToken(users);
    //         const newRefreshToken = authController.gennerateRefreshToken(users);
    //         res.cookie("refreshToken",newRefreshToken,{
    //             httpOnly:true,
    //             secure:false,
    //             sameSite:"strict",
    //         });
    //         res.status(200).json({accessToken: newAccessToken});
    //     })
    // },
    
    
    userLogout: async(req,res)=>{
        res.clearCookie("refreshToken");
        res.status(200).json("log out")
    }

}





module.exports= authController;