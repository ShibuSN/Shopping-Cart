var db = require('../config/connection')
var collection = require('../config/collections')
const objectID = require('mongodb').ObjectID

module.exports = {
    addProduct: (product, callback) => {
        // console.log(product)

        db.get().collection('product').insertOne(product).then((data) => {
            callback(data.ops[0]._id)
        })
    },

    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {

            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()

            resolve(products)
        })

    },
    deleteProduct: (prodId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({ _id: objectID(prodId) }).then((response) => {
                resolve(response)
            })
        })
    },
    getProductDetails: (prodId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({ _id: objectID(prodId) }).then((product) => {
                resolve(product)
            })

        })
    },
    updateProductDetails: (prodId, prodData) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({ _id: objectID(prodId) },
                {
                    $set: {
                        name: prodData.name,
                        category: prodData.category,
                        price: prodData.price,
                        description: prodData.description
                    }
                }).then((response) => {
                    resolve()
                })
        })

    }
}