const router = require('express').Router()
const Shop = require('../models/schemas/shop')
// const mongoose = require('mongoose')

router.get('/', (req, res) => {
    Shop.findAll()
        .then(list => {
            console.log(list)
            list.map(e => console.log(e.name))
        })
        .catch(err => console.log(err))
})

router.get('/:name', (req, res) => {
    Shop.findOneByName(req.params.name)
        .then(shop => console.log(shop))
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    Shop.add(req.body)
        .then(result => {
            console.log(result)
            res.json(result)
        })
        .catch(err => console.log(err))
})

router.put('/', (req, res) => {
    Shop.updateByName(req.body.name, req.body)
        .then(result => console.log(result))
        .catch(err => console.log(err))
})

router.delete('/:name', (req, res) => {
    Shop.deleteByName(req.params.name)
        .then(result => console.log(result))
        .catch(err => console.log(err))
})


module.exports = router