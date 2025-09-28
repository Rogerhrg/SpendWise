import type { Request, Response } from "express"
import Budget from "../models/Budget"

export class BudgetController {
    static getAll = async (req:Request, res:Response) => {
        console.log('Desde Budgets get all')
    }

    static create = async (req:Request, res:Response) => {
        try {
            const budget = new Budget(req.body)
            budget.save()
            res.status(201).json('Creado correctamente')
        } catch (error) {
            res.status(500).json({error:'Hubo un error'})
        }
    }
    
    static getById = async (req:Request, res:Response) => {
        console.log('Desde Budgets get by id')
    }
    
    static updateById = async (req:Request, res:Response) => {
        console.log('Desde Budgets update by id')
    }
    
    static deleteById = async (req:Request, res:Response) => {
        console.log('Desde Budgets delete by id')
    }
}