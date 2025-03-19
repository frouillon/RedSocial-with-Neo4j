import z from 'zod'

const nodeSchema = z.object({
    Nombre: z.string(),
    Descripcion: z.string(),
    Telefono: z.string(),
    Carrera: z.string(),
    Hobbies: z.string()
})

export function validateNode(input){
    return nodeSchema.safeParse(input)
}

export function validatePartialNode(input){
    return nodeSchema.partial().safeParse(input)
}