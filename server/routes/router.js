const express = require('express');
const route = express.Router()
const services = require('../services/render');
const controller = require('../controller/controller');
const controllerPro = require('../controller/controllerPro');
const middleware = require('../controller/midlewareController');
const verifyres= require('../controller/verifyRest');
const verify= require('../controller/verify');
const middlewareCotroller = require('../controller/midlewareController');
/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/',services.homeRoutes);
route.get('/pri',verify);
route.get('/respri',verifyres);

/**o9llll       
 *  @description add users
 *  @method GET /add-users
 */
route.get('/add-user',verify, services.add_user)
route.get('/resadd-user',verifyres, services.add_user)



/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user',verify, services.update_user)
route.get('/resupdate-user',verifyres, services.update_user)


/**
 * @description for add-product
 * @method Get /add-product
 */

route.get('/add-product',verify, services.add_product);
route.get('/resadd-product',verifyres, services.add_product);
route.get('/all-product',verify, services.homePro);
route.get('/resall-product',verifyres, services.homePro);
route.get('/update-product',verify, services.update_product);
route.get('/resupdate-product',verifyres, services.update_product);

/////////////////////////////////////////////////////////////////////////////
route.get('/Signup',services.Signup)
route.get('/Signin',services.Signin)
// route.post('/api/signup', controller.signup);
// route.post('/api/signin', controller.signin);
// route.get('/secret',controller.secret);
// API///////////////////////////////////////////////////////////////////////////////
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', verify, controller.delete);
route.delete('/resapi/users/:id',verifyres, controller.delete);
//API///////////////////////////////////////////////////////////////////////////////
route.post('/api/product', controllerPro.create);
route.get('/api/product', controllerPro.find);
route.put('/api/product/:id', controllerPro.update);
route.delete('/api/product/:id', controllerPro.delete);
////////////////////////////////////////////////////////////////////////
// route.post('/api/signin',controller.signin);


module.exports = route