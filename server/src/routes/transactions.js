const router = require('express').Router();
const { requireAuth } = require('../middleware/auth')
const { list, create, remove } = require('../controllers/transactionsController')

router.use(requireAuth);
router.get('/', list);
router.post('/', create);
router.delete('/:id', remove);

module.exports = router;