import { Request, Response, NextFunction } from "express"
import { body, param, validationResult } from "express-validator"
import Expense from "../models/Expense"

declare global {
    namespace Express {
        interface Request{
            expense?: Expense
        }
    }
}

export const validateExpenseId = async (req:Request, res:Response, next:NextFunction) => {
    await param('expenseId')
    .isInt().withMessage('Id no válido')
    .custom(value => value > 0).withMessage('Id no válido')
    .run(req)
        
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

export const validatExpenseExists = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {expenseId} = req.params
            const expense = await Expense.findByPk(expenseId)
            if(!expense) {
                const error = new Error('Gasto no encontrado')
                res.status(404).json({error:error.message})
            }
            req.expense = expense
            next()
        } catch (error) {
            res.status(500).json({error:'Hubo un error'})
        }
}

export const validateExpenseInput = async (req:Request, res:Response, next:NextFunction) => {
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