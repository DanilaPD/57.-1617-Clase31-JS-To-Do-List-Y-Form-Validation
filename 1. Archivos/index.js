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
  //* console.log("Apreté submit");
  validate();
});

//!https://regexr.com/3e48o
// La "i" al final es "insensitive": No distingue mayúsculas de minúsculas.
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

//!https://stackoverflow.com/questions/14850553/javascript-regex-for-password-containing-at-least-8-characters-1-number-1-uppe
const pass1Regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

//* Para que no haya "varita seleccionada":
// "-1" se puede usar para el "fuera de index", o sea, no existe.
// "selectedIndex" dice qué "index" va a mostrar.
wand.selectedIndex = -1;

// Vamos a llamar cada validación en una sola "función":
const validate = () => {
  //* console.log("validate");
  // Tenemos un problema: Los "espacios" los toma como caracteres. Para evitar eso, usamos una función llamada "trim" : Va a quitar los espacios del principio y del final.
  const user = username.value.trim();
  const mail = email.value.trim();
  const pass1 = password1.value.trim();
  const pass2 = password2.value.trim();
  const userWand = wand.value; //No necesito "trimearlo".

  //? Por esta razón, capturamos el "value" y no el "input":
  //* console.log("Mail:", typeof mail, mail);
  //* console.log("Email:", typeof email, email);

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

  if (mail === "") {
    let errorMessage = "El email no puede estar vacío.";
    inputError(email, errorMessage);
    // Esto se lee como "Si 'emailRegex' al testear el 'mail' da 'false',...".
    // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
    // El "!" significa "NO da true".
    // Sería igual a "emailRegex.test(mail) === false", pero, en nuestro caso, estaríamos usando una versión más compacta.
  } else if (!emailRegex.test(mail)) {
    let errorMessage = "El mail no es válido.";
    inputError(email, errorMessage);
  } else {
    inputSuccess(email);
  }

  if (userWand === "") {
    let errorMessage = "Seleccione su varita.";
    inputError(wand, errorMessage);
  } else {
    inputSuccess(wand);
  }

  if (pass1 === "") {
    let errorMessage = "El password no puede estar vacío.";
    inputError(password1, errorMessage);
  } else if (!pass1Regex.test(pass1)) {
    let errorMessage =
      "El password no es válido. Debe tener, al menos, 8 caracteres, una mayúscula, una minúscula y un número.";
    inputError(password1, errorMessage);
  } else {
    inputSuccess(password1);
  }

  if (pass2 === "") {
    let errorMessage = "El password no puede estar vacío.";
    inputError(password2, errorMessage);
  } else if (pass2 !== pass1) {
    let errorMessage = "Los password no coinciden";
    inputError(password2, errorMessage);
  } else {
    inputSuccess(password2);
  }

  //!
  //? Pseudocódigo para poner un "ojito" en el "input" del "password"; poner el ícono con "absolute" desde CSS:
  //* ojito.addEventListener("click", () => {
  //* password1.setAttribute("type", "text");
  //* ojito.classList.add("Ojo tachado");
  //* })

  //? Pseudocódigo para agregar "varita personalizada" al elegir "otra":
  // Hay que tener un "input" que esté oculto. Al seleccionar "index 4" (que es el "otra"), remove(clase que oculte ese "index"). Entonces, si no tiene (!=) esa clase, que se compruebe que no está vacío.
  // Revisar los "tabIndex". Calculo que, estando oculto el tab, no va a entrar a él, pero estén atentos.

  //? Validar "términos y condiciones": Habría que chequear que el "checkbox" esté en "checked" (Si el "checkbox" está "chequeado", todo bien, que el botón de continuar y apretar se habilite, sino, no te va a permitir avanzar). Lo ideal sería que el botón de "submit" tenga un "setAttribute("disabled", "disabled")" si no se chequeó.
  // Probablemente, esta función la pondría fuera del "validate" porque sino, ¿cómo chequeamos el botón de "submit"? Yo le pondría un "listener" al "check" y tendría todo en una función aparte.

  //? Se puede hacer un "¿Estás seguro de que tus datos son correctos? Para hacerlo, acceder a la siguiente página: https://sweetalert2.github.io/"

  //? Se pueden activar las etiquetas "i" cuando es "success" o "error".
};

// Vamos a "validar" si el "form" se rellenó bien:
const inputSuccess = (input) => {
  const inputParent = input.parentElement;
  // Con "querySelector", nos va a agarrar el primero en que la etiqueta coincida. Si fuera "querySelectorAll", nos agarraría todos.
  const small = inputParent.querySelector("small");
  inputParent.classList.add("success");
  inputParent.classList.remove("error");
  small.innerHTML = "";
  //* console.log("Success");
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
  //* console.log("Error");
};
