import { Router } from "express"
import { BudgetController } from "../controllers/BudgetControllers"
import { body } from "express-validator"
import { handleInputErrors } from "../middleware/validation"

const router = Router()

router.get('/', BudgetController.getAll)

router.post('/',
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('amount')
        .notEmpty().withMessage('El monto es obligatorio')
        .isNumeric().withMessage('El monto no es válido')
        .custom(value => value > 0).withMessage('El monto tiene que ser positivo'),
    handleInputErrors,
    BudgetController.create)

router.get('/:id', BudgetController.getById)

router.put('/:id', BudgetController.updateById)

router.delete('/:id', BudgetController.deleteById)

export default router