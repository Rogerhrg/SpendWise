import { createRequest, createResponse } from 'node-mocks-http'
import { budgets } from "../mocks/budgets"
import { BudgetController } from '../../controllers/BudgetControllers'
import Budget from '../../models/Budget'

jest.mock('../../models/Budget', () => ({
    findAll: jest.fn(),
    create: jest.fn()
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
    it('should return error', async () => {
        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            user: { id: 10 }
        })
        const res = createResponse();
        (Budget.findAll as jest.Mock).mockRejectedValue(new Error)
        await BudgetController.getAll(req, res)

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ error: 'Hubo un error' });
    })
})

describe('BudgetController.create', () => {

    it('should create a new budget', async () => {
        const mockBudget = {
            save: jest.fn().mockResolvedValue(true)
        };
        (Budget.create as jest.Mock).mockResolvedValue(mockBudget);
        const req = createRequest({
            method: 'POST',
            url: '/api/budgets',
            user: { id: 1 },
            body: {
                name: 'Presupuesto de prueba',
                amount: 100
            }
        })
        const res = createResponse();
        await BudgetController.create(req, res)

        const data = res._getJSONData()

        expect(data).toBe('Creado correctamente');
        expect(res.statusCode).toBe(201);
        expect(mockBudget.save).toHaveBeenCalled();
        expect(mockBudget.save).toHaveBeenCalledTimes(1);
        expect(Budget.create).toHaveBeenCalledWith(req.body);
    })

    it('should return error creating a new budget', async () => {
        const mockBudget = {
            save: jest.fn()
        };
        (Budget.create as jest.Mock).mockRejectedValue(new Error);
        const req = createRequest({
            method: 'POST',
            url: '/api/budgets',
            user: { id: 1 },
            body: {
                name: 'Presupuesto de prueba',
                amount: 100
            }
        })
        const res = createResponse();
        await BudgetController.create(req, res)

        const data = res._getJSONData()
        expect(data).toEqual({ error: 'Hubo un error' });
        expect(res.statusCode).toBe(500);
        expect(mockBudget.save).not.toHaveBeenCalled();
    })
})
