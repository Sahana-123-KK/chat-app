const socket = io("http://localhost:8000"); //-->May b for sending details to node server
var audio = new Audio("ting.mp3"); //-->This is how initialize audio
// const form = document.getElementById("formcontain");
const messageInp = document.getElementById("messageinp");
const container = document.getElementById("messagecontainer");
const sendbtn = document.getElementById("btnsend");
const nameis = prompt("Enter you name to join");

socket.emit("new-user-joined", nameis);
const append = (message, position) => {
  const userJoined = document.createElement("div");
  userJoined.innerText = message;
  userJoined.classList.add("message");
  userJoined.classList.add(position);
  container.append(userJoined);
  if (position === "left") {
    audio.play();
  }
};

socket.on("user-joined", (name) => {
  append(`${name} Joined the Chat`, "right");
});
sendbtn.addEventListener("click", () => {
  append(`You: ${messageInp.value}`, "right");
  socket.emit("send", messageInp.value);
  messageInp.value = "";
});

socket.on("receive", (data) => {
  append(`${data?.name}: ${data?.message}`, "left");
});

socket.on("leave", (name) => {
  append(`${name} left the chat`, "left");
});
