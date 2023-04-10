const axios = require('axios');
 
exports.homeRoutes = (req, res) => {
    axios.get('http://localhost:8030/api/users')
        .then(function(response){
            res.render('index', { users : response.data});
        })
        .catch(err =>{
            res.send(err);
        })

}

exports.add_user = (req, res) =>{
    res.render('add_user');
}
exports.Signup = (req, res) =>{
    res.render('SignUp');
}
exports.Signin = (req, res) =>{
    res.render('Signin');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:8030/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}
//////////////////pro////////////////////////////////////////
exports.homePro = (req, res) => {
    axios.get('http://localhost:8030/api/product')
        .then(function(response){
            res.render('product', { pros : response.data});
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_product = (req, res) =>{
    res.render('add_product');
}

exports.update_product = (req, res) =>{
    axios.get('http://localhost:8030/api/product', { params : { id : req.query.id }})
        .then(function(prodata){
            res.render("update_product", { pro :prodata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}