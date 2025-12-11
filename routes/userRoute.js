const express = require('express')
const userControl = require('../controller/userController')

const router = express.Router()

router.get('/', userControl.getAllBooks)
router.get('/:code', userControl.getBookByCode)
router.post('/', userControl.addBook)
router.delete('/:code', userControl.delBook)
router.put('/:id', userControl.updateBook)
module.exports = router