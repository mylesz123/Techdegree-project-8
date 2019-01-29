const express = require('express');
const router = express.Router();

// GET home page, then get redirected to books route
router.get('/', (req, res, next) => {
   res.redirect('/books');
});

module.exports = router;
