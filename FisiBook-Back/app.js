import express , {json} from 'express'
import { corsMiddlewares } from './middlewares/corsMiddlewares.js'
import {createNodeRouter} from './routes/nodosRoutes.js'

export const createApp = ({nodeModel}) => {
    const app = express()
    app.use(express.json())
    app.use(corsMiddlewares())
    app.disable('x-powered-by')

    app.use('/nodes', createNodeRouter({nodeModel}))

    const PORT = process.env.PORT ?? 3000

    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`)
    })
}