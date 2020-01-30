const express = require("express");

const server = express();
server.use(express.json());

const projetos = [];

server.post("/projects", (req, res) => {
  projetos.push(req.body);
  return res.sendStatus(201);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projeto = projetos.find(projeto => projeto.id == id);
  projeto.tasks.push(title);
  console.table(projetos);
  return res.sendStatus(201);
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

  projetos.splice(
    projetos.find(proj => proj.id == id),
    1
  );

  return res.sendStatus(200);
});

server.listen(2020);
