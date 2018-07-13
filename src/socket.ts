import * as socket from 'socket.io';
import { Events } from './events';

export class Server {
  server: socket.Server;
  players: Player[] = [];

  constructor(public port: number) {}

  boot() {
    console.log(`Server booted and accepting connections on :${this.port}`);
    this.server = socket.listen(this.port);
    this.server.on('connection', socket => {
      console.log(`Client connected`);
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
