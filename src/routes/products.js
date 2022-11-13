const express = require('express')
const router = express.Router()
const products = require('../../storage/products')

router.post('/', async (req, res) => {
  try {
    let data = await products.save(req.body)
    res.redirect('/api/products')
  } catch (error) {
    console.log(error)
    res.status(400).json({
      response: 'error'
    })
  }
})

router.get('/', async (_req, res) => {
  try {
    let data = await products.getAll()
    if (data) {
      res.render('pages/index', { data, page: 'table', title: 'Products view' })
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
        page: 'table',
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

router.put('/:id', async (req, res) => {
  let { id } = req.params
  try {
    let data = await products.putById(id, req.body)
    if (data) {
      res.status(200).json({
        response: data
      })
    } else {
      res.status(404).json({
        resposne: 'can not find'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      respones: 'error'
    })
  }
})

router.delete('/:id', async (req, res) => {
  let { id } = req.params
  try {
    let data = await products.deleteById(id)
    if (data) {
      res.status(200).json({
        response: 'product deleted'
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
