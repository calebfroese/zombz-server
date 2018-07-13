import { Server } from './socket';

const app = new Server(3000);
app.boot();
