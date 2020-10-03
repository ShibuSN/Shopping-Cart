var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helper');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  productHelpers.getAllProducts().then((products)=>{
    console.log(products);
    res.render('admin/view-products', {products, admin:true})
  
  })
  
});

router.get('/add-products', function(req, res){
  res.render('admin/add-products', {admin:true})
});

router.post('/add-products', function(req, res){
  // console.log(req.body);
  // console.log(req.files.image);
  productHelpers.addProduct(req.body, (productid)=>{
    // console.log(productid)

    let image = req.files.image
    image.mv('./public/images/product-images/'+productid+'.jpg', (err)=>{
      if(!err){
        res.render('admin/add-products')
      }
      else{
        console.log(err)
      }
    })

    
  }
)});


module.exports = router;
