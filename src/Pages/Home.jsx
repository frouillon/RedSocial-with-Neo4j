import { useForm } from "react-hook-form";
import  useLocalStorage  from "../Script/localStorage";

export default function Home(){
    const {register,formState:{errors}, handleSubmit} = useForm();

    const [formData, setFormData] = useLocalStorage('formData', {});

    const onSubmit = (data) => {
        setFormData(data);
        console.log(formData)
        try {
            fetch("http://localhost:3000/nodes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="bg-[url('../../public/images/facultad.jpg')] bg-cover h-screen ">
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg">
                    <h1 className="text-3xl font-bold text-center p">FISIBOOK</h1>
                    <div className="h-full flex flex-col items-center justify-center">
                        <form
                            className="flex flex-col justify-center w-80"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <label htmlFor="nombre" className={`mt-4 ${errors.Nombre ? "text-red-500": ""}`}>Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                placeholder="Nombres y Apellidos"
                                className={`w-full mr-3 px-4 py-2 border ${
                                    errors.Nombre ? "border-red-500" : "border-gray-400"
                                } rounded`}
                                {...register("Nombre", {
                                    required: true,
                                    minLength: 2,
                                    maxLength: 30
                                })}
                            />
                            {errors.Nombre?.type === "required" && (
                                <span className="text-red-500">Este campo es requerido</span>
                            )}

                            <label htmlFor="telefono" className={`mt-4 ${errors.Telefono ? "text-red-500" : ""}`}>Telefono</label>
                            <input
                                type="text"
                                id="telefono"
                                placeholder="+51 999999999"
                                className={`w-full mr-3 px-4 py-2 border ${
                                    errors.Telefono ? "border-red-500" : "border-gray-400"
                                } rounded`}
                                {...register("Telefono",{
                                    required: true,
                                    minLength: 9
                                })}
                            />
                            {errors.Telefono?.type === "required" && (
                                <span className="text-red-500">Este campo es requerido</span>
                            )}
                            {errors.Telefono?.type === "minLength" && (
                                <span className="text-red-500">El telefono debe tener al menos 9 digitos</span>
                                )}

                            <label htmlFor="descripcion" className={`mt-4 ${errors.Descripcion ? "text-red-500":""}`}>Descripcion</label>
                            <textarea
                                className={`h-full w-full mr-3 px-4 py-2 border ${
                                    errors.Descripcion ? "border-red-500" : "border-gray-400"
                                } rounded`}
                                id="descripcion"
                                placeholder="Descripcion"
                                {...register("Descripcion",{
                                    required: true
                                })}
                            ></textarea>
                            {errors.Descripcion?.type === "required" && (
                                <span className="text-red-500">Este campo es requerido</span>
                            )}

                            <label htmlFor="hobby" className={`mt-4 ${errors.Hobby ? "text-red-500" : ""}`}>Hobby</label>
                            <input
                                type="text"
                                id="hobby"
                                placeholder="Hobby"
                                className={`w-full mr-3 px-4 py-2 border ${
                                    errors.Hobby ? "border-red-500" : "border-gray-400"
                                } rounded`}
                                {...register("Hobbies",{
                                    required: true
                                })}
                            />
                            {errors.Hobby?.type === "required" && (
                                <span className="text-red-500">Este campo es requerido</span>
                            )}

                            <label htmlFor="carrera" className={`mt-4 ${errors.Carrera ? "text-red-500" : ""}`}>Carrera</label>
                            <select
                                className={`w-full mr-3 px-4 py-2 border ${
                                    errors.Carrera ? "border-red-500" : "border-gray-400"
                                } rounded`}
                                id="carrera"
                                {...register("Carrera",{required: true})}
                            >
                                <option value="" defaultChecked>
                                    Elija una opcion
                                </option>
                                <option value="Ingenieria de Software">Ingenieria de Software</option>
                                <option value="Ingenieria de Sistemas">Ingenieria de Sistemas</option>
                                <option value="Ciencias de la computacion">
                                    Ciencias de la computacion
                                </option>
                            </select>
                            {errors.Carrera?.type === "required" && (
                                <span className="text-red-500">Este campo es requerido</span>
                            )}
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mx-12 mt-4 rounded-full">
                            ENTRAR
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
