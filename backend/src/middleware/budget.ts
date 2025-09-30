import { Request, Response, NextFunction } from "express"
import { body, param, validationResult } from "express-validator"
import Budget from "../models/Budget"

declare global {
    namespace Express {
        interface Request{
            budget?: Budget
        }
    }
}

export const validateBudgetId = async (req:Request, res:Response, next:NextFunction) => {
    await param('budgetId')
        .isInt().withMessage('Id no válido')
        .custom(value => value > 0).withMessage('Id no válido')
        .run(req)

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

export const validateBudgetExists = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {budgetId} = req.params
            const budget = await Budget.findByPk(budgetId)
            if(!budget) {
                const error = new Error('Presupuesto no encontrado')
                res.status(404).json({error:error.message})
            }
            req.budget = budget

            next()
        } catch (error) {
            res.status(500).json({error:'Hubo un error'})
        }
}

export const validateBudgetInput = async (req:Request, res:Response, next:NextFunction) => {
    await body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .run(req)
    await body('amount')
        .notEmpty().withMessage('El monto es obligatorio')
        .isNumeric().withMessage('El monto no es válido')
        .custom(value => value > 0).withMessage('El monto tiene que ser positivo')
        .run(req)
    next()
}