import { useEffect, useState } from "react";
import useLocalStorage from "../Script/localStorage";
import UserCard from "./UserCard";

export default function AllUsers() {
const [formData] = useLocalStorage("formData", {});
  const [all, setAll] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/nodes`);
        const result = await response.json();
        console.log(result)
        setAll(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllData();
  }, []);
    return(
        <div>
            <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
                <div className="mx-auto">
                    <div className="flex justify-end">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{
                            window.location.href = "/";
                        }}>
                            Salir
                        </button>
                    </div>
                    <div className="font-mono text-5xl font-bold text-center p-4">¡Bienvenido {formData.Nombre}!</div>
                    <div className="font-mono text-xl bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 m-4 mb-8 rounded shadow-lg text-center">
                        ¡Estos compañeros de la facultad están esperando conocerte! ¿Quieres conocerlos?
                    </div>
                    <div className="grid grid-cols-3 gap-4 items-center justify-center">
                        {all.map((recomendation) => (
                            (formData.Nombre === recomendation.Nombre) 
                            ?
                            "" 
                            :
                            <UserCard
                                key={recomendation.Descripcion}
                                Nombre={recomendation.Nombre}
                                Descripcion={recomendation.Descripcion}
                                Carrera={recomendation.Carrera}
                                Hobbies={recomendation.Hobbies}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center items-center mt-8 space-x-4">
                        <div className="text-lg font-medium">
                            Personas que comparten tus gustos:
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1"
                            onClick={() => {
                                window.location.href = "/recomendations";
                            }}
                        >
                            Ir allá
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}