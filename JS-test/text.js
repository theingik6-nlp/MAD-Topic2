const firstName = document.getElementById("firstName");
const clickMe = document.getElementById("clickMe");
const header = document.getElementById("myStaticHeader");
const clickBtn = document.getElementById("clickBtn");


const buttonClicked = () => {
  const name = firstName.value;
  alert("Hello " + name);
  alert("Welcome to this game " + name);
  console.log(name);
};

clickMe.onclick = buttonClicked;



header.innerHTML = "Js Changed the static value";
