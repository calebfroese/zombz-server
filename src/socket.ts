import * as io from 'socket.io';

import { Events } from './events';

export class Server {
  server: io.Server;
  players: Player[] = [];

  constructor(public port: number) {}

  boot() {
    console.log(`Server booted and accepting connections on :${this.port}`);
    this.server = io.listen(this.port);
    this.server.on('connection', socket => this.onClient(socket));
  }

  onClient(socket: io.Socket) {
    console.log(`Client connected`);

    const player = new Player(socket);
    this.players.push(player);
    this.updatePlayers();

    socket.on('disconnect', () => {
      const i = this.players.findIndex(p => p.socket.id === socket.id);
      this.players.splice(i, 1);
      this.updatePlayers();
    });
  }

  updatePlayers() {
    this.server.emit(
      Events.ServerPlayersUpdate,
      this.players.map(p => p.socket.id),
    );
  }
}

class Player {
  constructor(public socket: io.Socket) {}
}
