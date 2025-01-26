const socket = io('http://localhost:9000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

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
  socket.emit('new-user-joined', username); 
}

socket.on('user-joined', (name) => {
  append(`${name} joined the chat`, 'left');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, 'right'); 
  socket.emit('send', message); 
  messageInput.value = ''; 
});

socket.on('receive', (data) => {
  append(`${data.username}: ${data.message}`, 'left');
});
socket.on('left',(username)=>{
  append(`${username} left the chat`,'left');
})
