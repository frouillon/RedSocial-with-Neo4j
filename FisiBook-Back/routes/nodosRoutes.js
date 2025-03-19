import {Router} from 'express'
import { nodeController } from '../Controllers/nodosController.js'

export const createNodeRouter = ({nodeModel}) => {
    const nodeRouter = Router()

    const NodeController = new nodeController({nodeModel})

    nodeRouter.get('/', NodeController.getAll)
    nodeRouter.get('/:hobby', NodeController.getByHobby)
    nodeRouter.post('/', NodeController.create)
    nodeRouter.post('/agregarAmigo', NodeController.agregarAmigo)

    return nodeRouter
}