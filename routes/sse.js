const express = require('express');
const router = express.Router();

let clients = [];

router.get('/events', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });

  res.flushHeaders();

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res
  };
  clients.push(newClient);

  console.log(`New SSE client connected: ${clientId}`);

  res.write(`data: Connected to server\n\n`);

  req.on('close', () => {
    console.log(`SSE client disconnected: ${clientId}`);
    clients = clients.filter(c => c.id !== clientId);
  });
});

function sendToAllClients(message) {
  clients.forEach(client => {
    client.res.write(`data: ${message}\n\n`);
  });
}

function sendProductRefreshEvent() {
  sendToAllClients("refresh-products");
}

module.exports = {
  router,
  sendProductRefreshEvent
};
