import { Router } from "express"
import { BudgetController } from "../controllers/BudgetControllers"
import { handleInputErrors } from "../middleware/validation"
import { validateBudgetExists, validateBudgetId, validateBudgetInput } from "../middleware/budget"
import { validatExpenseExists, validateExpenseId, validateExpenseInput } from "../middleware/expense"
import { ExpensesController } from "../controllers/ExpenseControllers"
import { checkAuth } from "../middleware/auth"

const router = Router()

router.use(checkAuth)

router.param('budgetId',validateBudgetId)
router.param('budgetId',validateBudgetExists)

router.param('expenseId',validateExpenseId)
router.param('expenseId',validatExpenseExists)

router.get('/', BudgetController.getAll)

router.post('/',
    validateBudgetInput,
    handleInputErrors,
    BudgetController.create)

router.get('/:budgetId', BudgetController.getById)

router.put('/:budgetId',
    validateBudgetInput,
    handleInputErrors,
    BudgetController.updateById)

router.delete('/:budgetId', BudgetController.deleteById)

router.get('/:budgetId/expenses', ExpensesController.getAll)

router.post('/:budgetId/expenses',
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.create)

router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)

router.put('/:budgetId/expenses/:expenseId',
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.updateById)

router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)

export default router