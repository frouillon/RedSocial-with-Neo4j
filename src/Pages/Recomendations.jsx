import  useLocalStorage  from "../Script/localStorage";

export default function Recomendations(){
    const [formData] = useLocalStorage('formData', {}); 

    try{
        fetch(`http://localhost:3000/nodes/${formData.Hobbies}`)
        .then(response => response.json())
        .then(result => {
            console.log(result);
        }).catch(error => {
            console.error(error);
        });
    }catch(error){
        console.error(error);
    }

  return (
    <div>
      <h2>Datos del Formulario</h2>
      <p>Nombre: {formData.Nombre}</p>
      <p>Teléfono: {formData.Telefono}</p>
    </div>
  );
}