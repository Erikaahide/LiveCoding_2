/**
 * STEPS:
 * 1. Create a fetchAnswer function and call the API
 * 2. Output the API's response
 * 3. Attach fetchAnswer to an event listener
 * 4. Clear output after 5 seconds
 */


const API_ENDPOINT = 'https://yesno.wtf/api';
const input  = document.getElementById('input');
const answer = document.getElementById('answer');
const btn      = document.getElementById('button');
let clearTimer;

//funcion para limpiar despues de 5 segundos
function clearFields() {
  input.value = '';
  answer.textContent = '';
}

function fetchAnswer() {
  fetch(API_ENDPOINT)//ruta a API
    .then(response => {
        if (!response.ok){ //valida el request 
        throw new Error ('Error de conexion') //manejo de errores 
        } return response.json();//parsear fectch a json
    })
    .then(data => {
      answer.textContent = String(data.answer).toUpperCase();
      clearTimer = setTimeout(clearFields, 5000);
    })
    .catch(err => {
      console.error(err);
      answer.textContent = 'Ocurrió un error';
      clearTimer = setTimeout(clearFields, 5000);
    });
}

btn.addEventListener('click', fetchAnswer);


/**
 * version con async/await
 * 
 * async function fetchAnswer() {
  try {
    const response = await fetch(API_ENDPOINT); //primer await para fetch

    if (!response.ok) {
      throw new Error('Error de conexión');
    }

    const data = await response.json(); //segundo awat para parsea a json
    console.log("Respuesta de la API:", data);

  } catch (error) {
    console.error('Hubo un error:', error);
  }
}
fetchAnswer();
 */