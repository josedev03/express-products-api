const productModel = require('../model/product.model')

async function getProducts(){
  const products = await productModel.find()
  listProducts = []
  if(Array.isArray(products)){
    products.map(product => {
      const producTemp = {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        imageURL: product.imageURL,
      }
      listProducts.push(producTemp)
    })
  }else{
    const producTemp = {
      id: products._id,
      name: products.name,
      description: products.description,
      price: products.price,
      imageURL: products.imageURL,
    }
    listProducts.push(producTemp)
  }
  return listProducts
}

async function getProductById(req, res){
  const products = await productModel.findById(req.params.id, (err, doc) => {
    if(err){
      res.status(500).json({
        errors: err.message
      })
    }
  })
  listProducts = []
  if(Array.isArray(products)){
    products.map(product => {
      const producTemp = {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        imageURL: product.imageURL,
      }
      listProducts.push(producTemp)
    })
  }else{
    const producTemp = {
      id: products._id,
      name: products.name,
      description: products.description,
      price: products.price,
      imageURL: products.imageURL,
    }

    listProducts.push(producTemp)
  }
  return listProducts
}

async function addProduct(req, res){
  if(!req.body.name ||
     !req.body.description ||
     !req.body.price ||
     !req.body.imageURL
  ){
    return {
      errors: ['invalid request, invalid structure']
    }
  }

  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageURL: req.body.imageURL
  })

  const result = await product.save()
  if(result.errors){
    return {
      errors: ['Error tratando de crear el producto']
    }
  }else{
    return {
      data: {
        id: result.id
      }
    }
  }
}

async function updateProduct(req, res, next){
  if(!req.body.id || req.body.id == ''){
    return {
      errors: 'invalid request, id is required'
    }
  }

  const tempProduct = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageURL: req.body.imageURL
  }

  const result = await productModel.findByIdAndUpdate(req.body.id, tempProduct, (err, post) => {
    if(err){
      res.status(500).json({
        errors: err.message
      })
    }
  })

  return {
    data: {
      id: result._id
    }
  }
}

async function deleteProduct(req, res, next){
  const result = await productModel.findByIdAndDelete(req.body.id, (err, doc) => {
    if(err){
      res.status(500).json({
        errors: err.message
      })
    }
  })

  return {
    data: 'deleted product'
  }
}

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById
}