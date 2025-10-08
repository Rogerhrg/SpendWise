import type { Request, Response } from "express"
import Budget from '../models/Budget'
import Expense from "../models/Expense"

export class BudgetController {
    static getAll = async (req:Request, res:Response) => {
        try {
            const budgets = await Budget.findAll({
                order:[
                    ['createdAt','DESC']
                ]
                // TODO: filtrar por usuario
            })
            res.json(budgets)
        } catch (error) {
            res.status(500).json({error:'Hubo un error'})
        }
    }

    static create = async (req:Request, res:Response) => {
        try {
            const budget = new Budget(req.body)
            budget.userId = req.user.id
            await budget.save()
            res.status(201).json('Creado correctamente')
        } catch (error) {
            res.status(500).json({error:'Hubo un error'})
        }
    }
    
    static getById = async (req:Request, res:Response) => {
        res.json(req.budget)
    }
    
    static updateById = async (req:Request, res:Response) => {
        await req.budget.update(req.body)
        res.json('Presupuesto actualizado correctamente')

    }
    
    static deleteById = async (req:Request, res:Response) => {
        await req.budget.destroy()
        res.json('Presupuesto borrado correctamente')
    }
}