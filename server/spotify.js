const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    console.log('hello');
  } catch (error) {}
});
module.exports = router;
