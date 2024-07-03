import PropTypes from 'prop-types';
import  useLocalStorage  from "../Script/localStorage";
import { useState } from 'react';

export default function UserCard({ Nombre, Descripcion, Carrera, Hobbies }) {
    const [formData, setFormData] = useLocalStorage('formData', {});
    const [isDisabled, setIsDisabled] = useState(false);

    const handleClick = (e) => {
        fetch(`http://localhost:3000/nodes/agregarAmigo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user1:formData.Nombre, user2:e.target.id})
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setIsDisabled(true);
            })
            .catch(error => {
                console.error(error);
            });

    }

    return (
        <div className="font-mono mx-auto w-100 h-80 rounded border overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:scale-105">
            <div className='grid grid-cols-3 items-center mt-2'>
                <img className="w-10 ml-8" src="../../public/images/user.png" alt="Imagen Descriptiva" />
                <div className="font-bold text-2xl mb-2 col-span-2">{Nombre}</div>
            </div>
            <div className="col-span-3">
                <div className="px-6 py-4 text-xs ">
                    <p className="text-gray-700 text-base">{Descripcion}</p>
                    <p className="text-gray-700 text-base">Carrera: {Carrera}</p>
                    <div>Hobbys:<br />
                        {Hobbies.map((hobbie, index) => (
                            <span key={index} className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">
                                {hobbie}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="px-6 pt-2 pb-3">
                    <button id={Nombre} onClick={handleClick} className={`w-full ${isDisabled ? 'bg-gray-500 hover:bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} text-white font-mono py-2 px-4 rounded` }
                    disabled={isDisabled}>
                        {isDisabled ? "Amigo agregado" : "Agregar Amigo"}
                    </button>
                </div>
            </div>
        </div>
    );
}

UserCard.propTypes = {
  Nombre: PropTypes.string.isRequired,
  Descripcion: PropTypes.string.isRequired,
  Carrera: PropTypes.string.isRequired,
  Hobbies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
