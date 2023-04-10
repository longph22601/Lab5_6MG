const jwt = require('jsonwebtoken');
const middlewareCotroller ={

    verifyToken : (req,res,next)=>{
        const token = req.cookies['auth-token'];
        if(token){
          const verified=  jwt.verify(token, 'mk',(err,user)=>{
                if(err){
                    res.status(403).json("token is not valid");
                }
                req.user = verified;
                next();
            })
            
        }else{
            res.status(401).json("you not authenticated ")
        }
    },
    verifyTokenres : (req,res,next)=>{
        const token = req.headers('auth-token');
        if(token){
        const verified  =  jwt.verify(token, 'mk',(err,user)=>{
                if(err){
                    res.status(403).json("token is not valid");
                }
                req.user =verified;
                next();
            })
            
        }else{
            res.status(401).json("you not authenticated ")
        }
    },

    verifyTokenAndAdminAuth :(req,res,next)=>{
        middlewareCotroller.verifyToken(req,res,()=>{
            if(req.user.id == req.pramas.id || req.user.amdin){
                next();
            }else{
                res.status(403).json("you is not admin")
            }
        })
    }

}

module.exports= middlewareCotroller;
