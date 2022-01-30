const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
const http = require('http').createServer(app);

const list = [];

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
    },
});

const userController = require('./controllers/userController');

app.use(express.static(path.join(__dirname, "..", "Front-End")));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/messages', async (req, res) => {
    const messages = await userController.getAll();
    res.status(200).json(messages);
});

const data = new Date().toLocaleString().replace(/\//g, '-');

io.on('connection', (socket) => {
    socket.on('message', async ({ chatMessage, nickname }) => {
      await userController.createMessage(chatMessage, nickname, data);
      io.emit('message', `${data} - ${nickname} ${chatMessage}`);
    });

  socket.on('user', (nickname) => {
    list.push({ nickname, id: socket.id });
    io.emit('onlineList', list);
  });

  socket.on('changeNick', ({ nickname, oldNick }) => {
    const index = list.findIndex((item) => item.nickname === oldNick);
    list.splice(index, 1, { nickname, id: socket.id });
    io.emit('onlineList', list);
  });

    socket.on('disconnect', ({ id }) => {
    const index = list.findIndex((user) => user.id === id);
    list.splice(index, 1);
      io.emit('onlineList', list);
    });
  });

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});