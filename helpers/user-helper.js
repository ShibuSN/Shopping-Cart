var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
const collections = require('../config/collections')
const objectID  = require('mongodb').ObjectID


module.exports = {
    dosignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10);
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(data.ops[0])
            }
            )
        })

    },

    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email })

            if (user) {
                bcrypt.compare(userData.password, user.password).then((status) => {

                    if (status) {
                        console.log('Login Success')
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log('Wrong Password')
                        resolve({ status: false })
                    }
                })
            }
            else {
                console.log('Email not correct')
                resolve({ status: false })
            }
        })

    },
    addToCart:(userId, prodId)=>{
        return new Promise(async(resolve, reject)=>{
            console.log(userId);
            console.log(prodId);
           
            let userCart = await db.get().collection(collection.CART_COLLECTION).findOne({user:objectID(userId)})
            console.log(userCart)
            if(userCart){
                db.get().collection(collection.CART_COLLECTION).updateOne({user:objectID(userId)},
                {
                    $push:{
                        products:objectID(prodId)
                    }
                }
                ).then((response)=>{
                    resolve()
                })

            } else{
                console.log('Else Executed');
                let cartObj= {
                    user:objectID(userId),
                    products:[objectID(prodId)]
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response)=>{
                    resolve()
                })
            }

        })

    }
}