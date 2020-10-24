var express = require('express');
const session = require('express-session');
var router = express.Router();
var productHelpers = require('../helpers/product-helper');
var userHelper = require('../helpers/user-helper')

const verifyLogin = (req, res, next)=>{
  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
} 

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.user
  productHelpers.getAllProducts().then((products) => {
    // console.log(products);
    res.render('user/view-product', { products, admin: false, user })
    

  })

  // res.render('index', { title: 'Shibuzzz Shopping Cart', products, admin:false });
});

router.get('/login', (req, res) => {
  console.log(req.session.loggedIn);
  if (req.session.loggedIn) {
    res.redirect('/')
  }
  else {
    res.render('user/login', {'loginErr':req.session.loginErr})
    req.session.loginErr=false
    
  }
});

router.get('/signup', (req, res) => {
  res.render('user/signup')
});

router.post('/signup', (req, res) => {
  userHelper.dosignup(req.body).then((response) => {
    req.session.loggedIn=true
    req.session.user = response
    res.redirect('/')
  })
})

router.post('/login', (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn=true
      req.session.user = response.user
      res.redirect('/')
    }
    else {
      req.session.loginErr=true
      res.redirect('/login')
    }
  })

})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')

})

router.get('/cart', verifyLogin, (req, res)=>{
  res.render('user/cart')
})

router.get('/add-to-cart/:id', verifyLogin, (req, res)=>{
  console.log(req.session);
  let userId = req.session.user._id
  let prodId= req.params.id
  userHelper.addToCart(userId, prodId).then(()=>{
    res.redirect('/')
  })
})



module.exports = router;
