var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helper');

/* GET users listing. */
router.get('/', function (req, res, next) {

  productHelpers.getAllProducts().then((products) => {
    // console.log(products);
    res.render('admin/view-products', { products, admin: true })

  })

});

router.get('/add-products', function (req, res) {
  res.render('admin/add-products', { admin: true })
});

router.post('/add-products', function (req, res) {
  // console.log(req.body);
  // console.log(req.files.image);
  productHelpers.addProduct(req.body, (productid) => {
    // console.log(productid)

    let image = req.files.image
    image.mv('./public/images/product-images/' + productid + '.jpg', (err) => {
      if (!err) {
        res.render('admin/add-products', { admin: true })
      }
      else {
        console.log(err)
      }
    })


  }
  )
});

router.get('/delete-product/:id', (req, res) => {
  let prodId = req.params.id
  productHelpers.deleteProduct(prodId).then(() => {
    res.redirect('/admin/')
  })
})

router.get('/edit-product/:id',async (req, res) => {
   let product= await productHelpers.getProductDetails(req.params.id)
  //  console.log(product)
   res.render('admin/edit-product', { product, admin: true })
}
)

router.post('/edit-product/:id', (req, res)=>{
  productHelpers.updateProductDetails(req.params.id, req.body).then(()=>{
    res.redirect('/admin/')
    if(req.files.image){
      let productid = req.params.id
      let image = req.files.image
      image.mv('./public/images/product-images/' + productid + '.jpg')
    }
  })
})


module.exports = router;
