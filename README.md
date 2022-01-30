# Web Chat

# Sumário

- [Sobre o desafio](#sobre)
- [Requisitos técnicos](#requisitos)
- [Tecnologias utilizadas](#requisitos)
- [Comandos para instalar na sua maquina](#instalação)


# Sobre

Desenvolver um sistema de CHAT para conversas em grupo utilizando WEBSOCKET.

# Requisitos

Ao se conectar no app, será necessário informar um nome de usuário que será usado como
identificação nas mensagens enviadas.
Todos usuários conectados podem enviar e ler mensagens de todas as pessoas conectadas
Ao se conectar, será necessário carregar o histórico das últimas 30 mensagens trocadas
através de uma API REST.
As mensagens deverão ser armazenadas em um banco de dados da sua escolha.

# Tecnologias

Projeto desenvolvido com Socket-IO, NodeJS, Express, MongoDB, Javasript, HTML e CSS.

# Instalação

Clone o repositotório
```
git@github.com:LeandroLopes1/websocket.git
```

No terminal conecte o mongoDB
```
sudo service mongod start 
```
Conecte o server:
```
cd Voll/backend
npm install
npm start
```
Conecte o client:
```
no navegador acesse a URL: http://localhost:3000
```

