const { Router } = require('express');

const { mocks } = require('../controller/mocks.ctrl');

const router = Router()

router.get('/api/mockingproducts', mocks)

module.exports = router