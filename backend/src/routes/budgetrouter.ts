import { Router } from "express"
import { BudgetController } from "../controllers/BudgetControllers"
import { handleInputErrors } from "../middleware/validation"
import { validateBudgetExists, validateBudgetId, validateBudgetInput } from "../middleware/budget"
import {validateExpenseInput } from "../middleware/expense"
import { ExpensesController } from "../controllers/ExpenseControllers"

const router = Router()

router.param('budgetId',validateBudgetId)
router.param('budgetId',validateBudgetExists)

router.get('/', BudgetController.getAll)

router.post('/', validateBudgetInput, handleInputErrors, BudgetController.create)

router.get('/:budgetId', BudgetController.getById)

router.put('/:budgetId', validateBudgetInput, handleInputErrors, BudgetController.updateById)

router.delete('/:budgetId', BudgetController.deleteById)

router.get('/:budgetId/expenses', ExpensesController.getAll)
router.post('/:budgetId/expenses', validateExpenseInput, ExpensesController.create)
router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)
router.put('/:budgetId/expenses/:expenseId', ExpensesController.updateById)
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)

export default router