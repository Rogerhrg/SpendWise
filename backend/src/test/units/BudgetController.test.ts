import { createRequest, createResponse } from 'node-mocks-http'
import { budgets } from "../mocks/budgets"

describe('BudgetController.getAll', () => {
    it('should return all budgets for the user', () => {
        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            user: { id: '500' }
        })
        const res = createResponse()
    })
})