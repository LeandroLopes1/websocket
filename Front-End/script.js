const socket = io();

socket.emit('user', 'nickname');

let nickname = '';

const sendMessage = document.getElementById('send-message');
const inputValue = document.getElementById('input-message');
sendMessage.addEventListener('click', (event) => {
  event.preventDefault();
  const chatMessage = inputValue.value;
  console.log(chatMessage);
  socket.emit('message', { nickname, chatMessage });
  inputValue.value = '';
});

const changeUser = document.getElementById('add-new-nick');
const inputNick = document.getElementById('input-nick');
changeUser.addEventListener('click', (event) => {
  event.preventDefault();
  const oldnick = nickname;
  nickname = inputNick.value;
  inputNick.value = '';
  socket.emit('changeNick', { nickname, oldnick });
});

const connectUser = document.querySelector('#ul-online-user');
socket.on('onlineList', (array) => {
  connectUser.innerHTML = '';
  array.forEach((user) => {
    const liUser = document.createElement('li');
    liUser.innerText = user.nickname;
      if (socket.id === user.id) {
        connectUser.prepend(liUser);
      } else {
        connectUser.appendChild(liUser);
      }
  });
});

const insertMessage = (string) => {
  const li = document.createElement('li');
  li.innerText = string;
  document.getElementById('ul-msg').appendChild(li);
};

socket.on('message', (string) => {
  insertMessage(string);
});

window.onload = async () => {
  const req = await fetch('http://localhost:3000/messages');
  const result = await req.json();
  result.forEach(({ message, nickname: nick, timestamp }) => {
    const string = `${timestamp} - ${nick} ${message}`;
    insertMessage(string);
    });
};
