import * as socket from 'socket.io';
import { Events } from './events';

export class Server {
  static port = 5000;
  server: socket.Server;
  players: Player[] = [];

  start() {
    this.server = socket.listen(5000);
    this.server.on('connection', socket => {
      this.listenForEvents(socket);
    });
  }

  listenForEvents(socket: socket.Socket) {
    socket.on(Events.UserConnect, name => {
      this.players.push({ name });
      socket.emit(Events.ServerPlayersUpdate, this.players);
    });
  }
}

interface Player {
  name: string;
}
