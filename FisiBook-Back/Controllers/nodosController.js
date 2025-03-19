import { validateNode, validatePartialNode } from "../schemas/nodes.js"

export class nodeController {
    constructor ({nodeModel}){
        this.nodeModel = nodeModel
    }
    
    getAll = async (req, res) => {
        //const {Nombre} = req.body
        const nodes = await this.nodeModel.getAll()
        res.json(nodes)
    }

    getByHobby = async (req, res) => {
        const {hobby} = req.params
        const nodes = await this.nodeModel.getByHobby({hobby})
        if(nodes) return res.json(nodes)
        res.status(404).send('No se encontraron resultados para ese hobby')
    }

    create = async (req, res) => {
        const result = validateNode(req.body)
 
        if(!result.success){
            console.log(req.body)
            console.log("Error!!!")
            return res.status(400).json({error:JSON.parse(result.error.message)})
        }

        const newNode = await this.nodeModel.create({node: result.data})
        res.status(201).json(newNode)
    }

    agregarAmigo = async (req, res) => {
        const result = req.body
        const nodes = await this.nodeModel.agregarAmigo({node: result})
        res.status(201).json(nodes)
    }
}