const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const gender = document.getElementsByName("gender");
const password = document.getElementById("password");
const address = document.getElementById("address");
const register = document.getElementById("register");
const fullText = document.getElementById("fullText");

const getGender = () => {
  const male = document.getElementById("male");
  const female = document.getElementById("female");
  if (male && male.checked) return "Male";

  if (female && female.checked) return "Female";

  return "Not specified";
};


const buttonSubmit = () => {
  const message =
    "first name: " +
    firstName.value +
    "\n" +
    "last name: " +
    lastName.value +
    "\n" +
    "gender: " +
    getGender() +
    "\n" +
    "password: " +
    password.value +
    "\n" +
    "address: " +
    address.value;

  alert(message);
  console.log(message);
  fullText.innerHTML = message;
};

register.addEventListener("click", buttonSubmit);

// "first name: " + firstName.value,
// "last name: " + lastName.value,
// "gender: " + getGender(),
// "password: " + password.value,
// "address: " + address.value
