import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { Pool, QueryResult } from 'pg'

const app: Express = express()
app.use(cors())
app.use(express.json())

const port = 5000

app.get('/', (req: Request, res: Response) => {
    const pool = openDb()
    
    pool.query('select * from task', (error,result) => {
        if (error) {
            res.status(500).json({error: error.message})
        }
        res.status(200).json({"result":result.rows})
    })
    
})

const openDb = (): Pool => {
    const pool: Pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: 'dinit5730',
        port: 5432
    })
    return pool
}
app.post('/new', (req: Request, res: Response) => {
    const pool = openDb()
        
        pool.query('insert into task (description) values ($1) returning * ',
            [req.body.description],
            (error: Error, result: QueryResult) => {
                if (error) {
                    res.status(500).json({ error: error.message })
                }
                res.status(200).json({ id: result.rows[0].id })
            })
    })
app.listen(port)

