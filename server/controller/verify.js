const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const token = req.cookies['auth-token'];
    if(!token) return res.json("ko co token").redirect('/Signin');
    console.log(token+"token nè");
    try{
        const verified = jwt.verify(token,'mk');
        req.user = verified;
        next();
    }catch(err){
        res.redirect('/?error=' + encodeURIComponent('Invalid Token'));
    }
}