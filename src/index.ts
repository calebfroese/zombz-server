import * as socket from 'socket.io';

const io = socket.listen(5000);

io.on('connection', socket => {
  socket.on('newplayer', () => {
    console.log('Creating a new player....');
  });
});
