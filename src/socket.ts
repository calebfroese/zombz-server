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

      this.players.push({ socket });
      socket.on(Events.UserConnect, name => {
        this.server.emit(Events.ServerPlayersUpdate, this.players.length);
      });

      socket.on('disconnect', () => {
        console.log(`Client disconnected`);
        const i = this.players.findIndex(
          player => player.socket.id === socket.id,
        );
        this.players.splice(i, 1);
        this.server.emit(Events.ServerPlayersUpdate, this.players.length);
      });
    });
  }
}

interface Player {
  socket: io.Socket;
}
