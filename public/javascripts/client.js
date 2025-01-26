const socket = io('http://localhost:9000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

// Append message to the chat container
const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if(position==='left'){
    var audio=new Audio('/audios/noti.wav');
    audio.play();
  }
};

const username = prompt('Enter your name');
if (username) {
  socket.emit('new-user-joined', username); // Notify server about the new user
}

socket.on('user-joined', (name) => {
  append(`${name} joined the chat`, 'left');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, 'right'); // Append message locally
  socket.emit('send', message); // Send message to server
  messageInput.value = ''; // Clear input
});

socket.on('receive', (data) => {
  append(`${data.username}: ${data.message}`, 'left');
});
socket.on('left',(username)=>{
  append(`${username} left the chat`,'left');
})
