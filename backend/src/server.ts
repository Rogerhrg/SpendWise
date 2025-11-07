import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import authRouter from './routes/authRouter'
import budgetrouter from './routes/budgetRouter'

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Conexión a BD exitosa'))
    } catch (error) {
        console.log(colors.blue.bold('Conexión a BD fallida'))
    }
}
connectDB()

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/budgets', budgetrouter)

app.use('/api/auth', authRouter)

export default app