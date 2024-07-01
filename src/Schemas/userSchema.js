import z from 'zod';

const carreras = ["Ingenieria de Software","Ingenieria de Sistemas","Ciencias de la computacion"];

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );
  

export const nodeSchema = z.object({
    Nombre: z.string({
        invalid_type_error: 'Nombre debe ser un string'
    }),
    Telefono: z.string()
    .regex(phoneRegex, {
        invalid_type_error: 'Ingrese un telefono valido'
    }),
    Descripcion: z.string({
        invalid_type_error: 'Descripcion debe ser un string'
    }),
    Hobbies: z.string({
        invalid_type_error: 'Hobbies debe ser un string'
    }),
    Carrera: z.enum(carreras, {
        errorMap: () => "Seleccione una carrera valida"
    })
})
