/**
 * STEPS:
 * 1. Create a fetchAnswer function and call the API
 * 2. Output the API's response
 * 3. Attach fetchAnswer to an event listener
 * 4. Clear output after 5 seconds
 * 5. Validate cannot click button if the input is empty.
 */


const API_ENDPOINT = 'https://yesno.wtf/api';
const input  = document.getElementById('input');
const answer = document.getElementById('answer');
const btn      = document.getElementById('button');
let clearTimer;
let loading = false;

//funcion para validar texto al clickear boton
function updateButton() {
  const hasText = input.value.trim().length > 0;
  btn.disabled = !hasText || loading;
}

// Inicializa estado del botón y actualiza al escribir
updateButton();
input.addEventListener('input', updateButton);

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
      loading = true;
      updateButton();
      clearTimer = setTimeout(clearFields, 5000);
    })
    .catch(err => {
      console.error(err);
      answer.textContent = 'Ocurrió un error';
      loading = false;
      updateButton();
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