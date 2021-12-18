// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp
//*https://regexr.com/3e48o

const form = document.getElementById("form");
const username = document.getElementById("username");
const wand = document.getElementById("wand");
const email = document.getElementById("email");
const password1 = document.getElementById("pass1");
const password2 = document.getElementById("pass2");

form.addEventListener("submit", (e) => {
  // El "preventDefault" sirve para evitar el comportamiento por default, que, en este caso, es justamente, el "submit".
  e.preventDefault();
  console.log("Apreté submit");
  validate();
});

// Vamos a llamar cada validación en una sola "función":
const validate = () => {
  console.log("validate");
  // Tenemos un problema: Los "espacios" los toma como caracteres. Para evitar eso, usamos una función llamada "trim" : Va a quitar los espacios del principio y del final.
  const user = username.value.trim();

  // Vamos a hacer las "comprobaciones":
  if (user === "") {
    let errorMessage = "El user no puede estar vacío.";
    inputError(username, errorMessage);
  } else if (user.length < 2 || user.length > 30) {
    let errorMessage =
      "El nombre de usuario debe tener entre 2 y 30 caracteres.";
    inputError(username, errorMessage);
  } else {
    inputSuccess(username);
  }
};

// Vamos a validar si el "form" se rellenó bien:
const inputSuccess = (input) => {
  const inputParent = input.parentElement;
  // Con "querySelector", nos va a agarrar el primero en que la etiqueta coincida. Si fuera "querySelectorAll", nos agarraría todos.
  const small = inputParent.querySelector("small");
  inputParent.classList.add("success");
  inputParent.classList.remove("error");
  small.innerHTML = "";
  console.log("Success");
};

// O si se rellenó mal:
// Agrego un "parámetro" que va a ser el texto de "error" de los "small", el cual va a ser personalizado de acuerdo con el error que cometamos.
const inputError = (input, message) => {
  const inputParent = input.parentElement;
  const small = inputParent.querySelector("small");
  inputParent.classList.add("error");
  inputParent.classList.remove("success");
  small.innerHTML = message;
  small.classList.add("error");
  console.log("Error");
};
