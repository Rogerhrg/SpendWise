import { createRequest, createResponse } from 'node-mocks-http'
import { budgets } from "../mocks/budgets"
import { BudgetController } from '../../controllers/BudgetControllers'
import Budget from '../../models/Budget'

jest.mock('../../models/Budget', () => ({
    findAll: jest.fn()
}))

describe('BudgetController.getAll', () => {
    beforeEach(() => {
        (Budget.findAll as jest.Mock).mockClear();
        (Budget.findAll as jest.Mock).mockImplementation((options) => {
        const updatedBudgets = budgets.filter(budget => budget.userId === options.where.userId);
        return Promise.resolve(updatedBudgets);
        });
    });

    it('should return 2 budgets from the user 1', async () => {
        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            user: { id: 1 }
        })
        const res = createResponse();

        
        await BudgetController.getAll(req, res)

        const data = res._getJSONData()

        expect(data).toHaveLength(2);
        expect(res.statusCode).toBe(200);
        expect(res.statusCode).not.toBe(404);
    })
    it('should return 1 budgets from the user 2', async () => {
        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            user: { id: 2 }
        })
        const res = createResponse();

        const updatedBudgets = budgets.filter(budget => budget.userId === req.user.id);
        (Budget.findAll as jest.Mock).mockResolvedValue(updatedBudgets)
        await BudgetController.getAll(req, res)

        const data = res._getJSONData()

        expect(data).toHaveLength(1);
        expect(res.statusCode).toBe(200);
        expect(res.statusCode).not.toBe(404);
    })
    it('should return no budgets for the user 10', async () => {
        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            user: { id: 10 }
        })
        const res = createResponse();

        const updatedBudgets = budgets.filter(budget => budget.userId === req.user.id);
        (Budget.findAll as jest.Mock).mockResolvedValue(updatedBudgets)
        await BudgetController.getAll(req, res)

        const data = res._getJSONData()

        expect(data).toHaveLength(0);
        expect(res.statusCode).toBe(200);
        expect(res.statusCode).not.toBe(404);
    })
})