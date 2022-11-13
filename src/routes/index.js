const express = require('express')
const router = express.Router()
// const products = require('./products')
// router.use('/products', products)
const products = require('../../storage/products')
const messages = require('../../storage/messages')

router.post('/', async (req, res) => {
  try {
    let data = await products.save(req.body)
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(400).json({
      response: 'error'
    })
  }
})

router.get('/', async (_req, res) => {
  try {
    let productsData = await products.getAll()
    let messagesData = await messages.getAll()
    if (productsData) {
      res.render('pages/index', {
        productsData,
        messagesData
      })
    } else {
      res.status(404).json({
        response: 'can not find'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      response: 'error'
    })
  }
})

router.get('/random', async (_req, res) => {
  try {
    let data = []
    data.push(await products.getOne())

    if (data) {
      res.render('pages/index', {
        data,
        title: 'Random product'
      })
    } else {
      res.status(404).json({
        response: 'can not find'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      response: 'error'
    })
  }
})

module.exports = router
