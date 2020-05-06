const express = require('express');
const router = express.Router();
const productController = require('./src/controller/product.controller')

router.get('/product', async (req, res) =>{
  const products = await productController.getProducts(req, res)
  if(products.errors){
    res.status(500).json({
      errors: products.errors
    })
  }else{
    res.status(200).json({
      data: products
    })
  }
})

router.get('/product/:id', async (req, res) =>{
  const result = await productController.getProductById(req, res)
  if(result.errors){
    res.status(500).json({
      errors: result.errors
    })
  }else{
    res.status(200).json({
      data: result
    })
  }
})

router.post('/product', async(req, res) =>{
  const product = await productController.addProduct(req, res)
  if(product.errors){
    res.status(500).json({
      errors: product.errors
    })
  }
  else{
    res.status(200).json({
      data: product.data
    })
  }
})

router.delete('/product', async(req, res) =>{
  const result = await productController.deleteProduct(req, res)
  if(result.errors){
    res.status(500).json({
      errors: result.errors
    })
  }else{
    res.status(200).json({
      data: result.data
    })
  }
})

router.put('/product', async(req, res) =>{
  const result = await productController.updateProduct(req, res)
  if(result.errors){
    res.status(500).json({
      errors: result.errors
    })
  }else{
    res.status(200).json({
      data: result.data
    })
  }
})

module.exports = router;