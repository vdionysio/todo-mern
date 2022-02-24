### TO-DO List na stack MERN

A aplicação consiste em um todo-list desenvolvido utilizando a stack **MERN** (MongoDB, React.JS, Express, Node.JS)

## Back-end

O server-side (Node.JS + Express) foi desenvolvido com base na arquitetura de camadas MSC (Model - Service - Cotroller). Para realizar as tarefas dentro do banco de dados MongoDB foi utilizado o ORM (Object–relational mapping) Mongoose.
Foram construídos testes unitários utilizando o Jest e o Mongodb Memory Server. A cobertura de testes atual está em 96.15%.

## Front-end
O client-side foi desenvolvido utilizando a biblioteca React.JS. Os componentes utlizados são do tipo funcional. Para o gerenciamento de estados foi utlizada a ContextAPI, por se tratar de uma aplicação relativamente pequena. 

## Passo a passo para executar o projeto em sua máquina

1. Clone o repositório
- `git clone git@github.com:vdionysio/todo-mern.git`
2. Entre na pasta criada
- `cd todo-mern`
3. Certifique-se de que a porta 3000 dá sua máquina local está disponível e então execute o docker-compose
- `docker-compose up`
4. Aguarda até o terminal indicar que sua aplicação está pronta e então entre na sua porta local 3000, normalmente pelo link http://localhost:3000/ .
