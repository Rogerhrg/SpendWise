import { Request, Response, NextFunction } from "express"
import { body, param, validationResult } from "express-validator"

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