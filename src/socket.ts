import * as io from 'socket.io';
import { Events } from './events';

export class Server {
  server: io.Server;
  players: Player[] = [];

  constructor(public port: number) {}

  boot() {
    console.log(`Server booted and accepting connections on :${this.port}`);
    this.server = io.listen(this.port);
    this.server.on('connection', socket => {
      console.log(`Client connected`);
      this.listenForEvents(socket);
    });
  }

  listenForEvents(socket: io.Socket) {
    socket.on(Events.UserConnect, name => {
      this.players.push({ name });
      this.server.emit(Events.ServerPlayersUpdate, this.players);
    });
  }
}

interface Player {
  name: string;
}
