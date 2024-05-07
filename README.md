# Chat Seguro

Este é um exemplo de um chat seguro que utiliza criptografia RSA-OAEP para proteger as mensagens trocadas entre os clientes. Ele é executado em um servidor Node.js e os clientes se conectam ao servidor usando WebSocket.

## Instalação

1. Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo [aqui](https://nodejs.org/).

2. Clone o repositório para o seu computador:
   ```bash
   git clone https://github.com/WasDevFullStack/nodechat-cript-rsa.git

3. Navegue até o diretório do projeto.
  
5. Instale as dependências do projeto usando o npm:
   npm install
### Execução do Servidor

1. Inicie o servidor Node.js executando o seguinte comando no terminal:
   node server.js
Isso iniciará o servidor na porta 8080.
Agora o servidor está pronto para aceitar conexões de clientes.

### Teste do Cliente

1. Abra o arquivo client.html em seu navegador.
2. Você será solicitado a inserir um nome de usuário. Digite um nome e clique em "OK".
3. A interface do cliente será carregada. Você verá uma lista de clientes conectados à esquerda e um formulário para enviar mensagens à direita.
4. Para enviar uma mensagem para outro cliente, insira o nome de usuário do destinatário no campo "ID do cliente" e digite sua mensagem no campo de mensagem. Em seguida, clique em "Enviar".
5. A mensagem será enviada criptografada para o cliente selecionado e exibida na caixa de mensagens do cliente destinatário.
6. Você pode testar a comunicação entre diferentes clientes abrindo o arquivo client.html em diferentes abas ou navegadores.
