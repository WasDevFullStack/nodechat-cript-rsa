const http = require('http');
const WebSocket = require('ws');
const url = require('url');
const fs = require('fs');

const clients = [];

const server = http.createServer((req, res) => {
    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('404 Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    console.log('Novo cliente conectado');
    clients.push(ws);

    ws.on('message', message => {
        console.log('Mensagem recebida:', message);
        handleMessage(message, ws);
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
        clients.splice(clients.indexOf(ws), 1);
        listClients();
    });

    listClients(ws);
    clients.filter((c)=>{return c != ws}).forEach((cws)=>{
        listClients(cws);
    });
});

function listClients(ws) {
    let clientList = clients.map(client => {return {name:client.name,publicKey:client.publicKey}});
    if (ws) {
        clientList = clients.filter((c)=>{return c != ws}).map(client => {return {name:client.name,publicKey:client.publicKey}});
        ws.send(JSON.stringify({ type: 'clients', clients: clientList }));
    } else {
        broadcastMessage(JSON.stringify({ type: 'clients', clients: clientList }));
    }
}

function broadcastMessage(message) {
    clients.forEach(client => {
        client.send(message);
    });
}

function sendMessageToClient(clientId, message, sender) {
    const client = clients.find(client => client.name === clientId);
    if (client) {
        client.send(JSON.stringify({ type: 'message', message: message, sender: sender.name }));
    } else {
        sender.send(JSON.stringify({ type: 'error', message: `Cliente ${clientId} não encontrado na sala.` }));
    }
}

function setName(name, publicKey, ws) {
    if(clients.find((c) =>{return c.name == name}) != null){
        ws.send(JSON.stringify({ type: 'nomeJaExiste', message: `O nome ${name} já está sendo utilizado.` }));
        return;
    }
    ws.name = name;
    ws.publicKey = publicKey;
    ws.send(JSON.stringify({ type: 'status', message: `Seu nome foi definido como ${name}.` }));
    clients.filter((c)=>{return c != ws}).forEach((cws)=>{
        listClients(cws);
    });
}

function handleMessage(message, ws) {
    const data = JSON.parse(message);
    switch (data.type) {
        case 'getClients':
            listClients(ws);
            break;
        case 'broadcast':
            broadcastMessage(data.message);
            break;
        case 'sendMessage':
            sendMessageToClient(data.clientId, data.message, ws);
            break;
        case 'setName':
            setName(data.name, data.publicKey, ws);
            break;
        default:
            console.log('Tipo de mensagem desconhecido:', data.type);
    }
}

server.listen(8080, () => {
    console.log('Servidor HTTP iniciado na porta 8080');
});
