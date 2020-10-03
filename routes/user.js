var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helper');

/* GET home page. */
router.get('/', function (req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products);
    res.render('user/view-product', {products, admin:false})
  
  })
 
  // res.render('index', { title: 'Shibuzzz Shopping Cart', products, admin:false });
});


module.exports = router;
