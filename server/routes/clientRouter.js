const Router = require('express')
const router = new Router()
const clientController = require('../controllers/clientController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), clientController.create)
router.put('/:id/status', checkRole('ADMIN'), clientController.updateStatus) // Изменили путь
router.get('/', checkRole('ADMIN'), clientController.getAll)
module.exports = router
