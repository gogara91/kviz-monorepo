import express from 'express';
import WebSocket, {WebSocketServer} from 'ws';
import cors from 'cors';
import bodyParser from "body-parser";


const app = express();
app.use(cors())
app.use(bodyParser.json());

const port = 4001;

const sockets: Array<WebSocket> = []

const wsClient = new WebSocketServer({
  port: 4002,
});

wsClient.on('connection', (ws) => sockets.push(ws))

app.post<{team: string, answer: string}>('/answer', (req, res) => {
  sockets.forEach(el => el.send(JSON.stringify(req.body)))
  res.send('ok');
})

app.post<{team: string, answer: string}>('/sendAnswer', (req, res) => {
  sockets.forEach(el => el.send(JSON.stringify(req.body)))
  res.send('ok');
})

app.post<{command: string}>('/sendCommand', (req, res) => {
  sockets.forEach(el => el.send(JSON.stringify(req.body)))
  res.send('ok');
})

app.post<{team: string}>('/tap', (req, res) => {
  sockets.forEach(el => el.send(JSON.stringify(req.body)))
  res.send('ok');
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
