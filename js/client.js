 const socket = io("http://localhost:2200");
 const form = document.getElementById("send-container");
 const messageInput = document.getElementById("messageInp");
 const messageContainer = document.querySelector(".container");


const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

 const name = prompt("Enter your name😃");
 socket.emit('new-user-joined',name);
 
 socket.on("user-joined",name=>{
    append(`${name} is in the chat`,"right");
})
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You:${message}`,"right");
    socket.emit("send",message);
    messageInput.value = '';

});
socket.on("receive",data=>{
    append(`${data.name}: ${data.message}`,"left");
})

socket.on("leaving",name=>{
    append(`${name} has left`,`left`);
})