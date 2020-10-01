var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products = [{
    name: "iPhone 11",
    category: "mobile",
    image: "https://images-na.ssl-images-amazon.com/images/I/51kGDXeFZKL._SX522_.jpg",
    description: "This is a good phone",
    price: 100

  },
  {
    name: "OPPO F11 Pro",
    category: "mobile",
    image: "data:image/jpeg;base64,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",
    description: "This is a good phone",
    price: 100

  },
  {
    name: "Samsung Galaxy S10",
    category: "mobile",
    image: "data:image/jpeg;base64,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",
    description: "This is a good phone",
    price: 100

  }, {
    name: "OnePlus 7",
    category: "mobile",
    image: "data:image/jpeg;base64,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",
    description: "This is a good phone",
    price: 100

  }]
  res.render('admin/view-products', {products, admin:true})
});

router.get('/add-products', function(req, res){
  res.render('admin/add-products')
});

router.post('/add-products', function(req, res){
  console.log(req.body);
  console.log(req.files.image);
});


module.exports = router;
