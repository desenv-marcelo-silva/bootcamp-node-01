const express = require("express");

const server = express();
server.use(express.json());

const projetos = [];

server.post("/projects", (req, res) => {
  projetos.push(req.body);
  console.log(projetos);
  return res.send(201);
});

server.get("/projects", (req, res) => {
  return res.send(projetos);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projeto = projetos.find(proj => proj.id == id);
  projeto.title = title;

  return res.sendStatus(200);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  proj = projetos.filter(proj => proj.id !== id);
  delete projetos;

  const projetos = [...proj];

  return res.json(projetos);
});

server.listen(2020);
