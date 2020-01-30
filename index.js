const express = require("express");

const server = express();

server.use(express.json());
const projetos = [];
validarProjetoExisteMiddleware = function(req, res, next) {
  const { id } = req.params;
  if (projetos.findIndex(projeto => projeto.id == id) > -1) {
    return next();
  }
  return res.status(400).json({ Erro: `Projeto ${id} não existe.` });
};

server.post("/projects", (req, res) => {
  projetos.push(req.body);
  return res.sendStatus(201);
});

server.post(
  "/projects/:id/tasks",
  validarProjetoExisteMiddleware,
  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const projeto = projetos.find(projeto => projeto.id == id);
    projeto.tasks.push(title);
    return res.sendStatus(201);
  }
);

server.get("/projects", (req, res) => {
  return res.send(projetos);
});

server.put("/projects/:id", validarProjetoExisteMiddleware, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projeto = projetos.find(proj => proj.id == id);
  projeto.title = title;

  return res.sendStatus(200);
});

server.delete("/projects/:id", validarProjetoExisteMiddleware, (req, res) => {
  const { id } = req.params;
  const projetoIndex = projetos.findIndex(proj => proj.id == id);

  projetos.splice(projetoIndex, 1);
  return res.sendStatus(200);
});

server.listen(2020);
