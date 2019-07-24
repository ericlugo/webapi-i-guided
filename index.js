const express = require(`express`);
const db = require(`./data/hubs-model.js`);
const moment = require(`moment`);
// import express from 'express' is not supported in NODE.js

const server = express();
server.use(express.json());

server.get(`/`, (request, response) => {
  response.send(`hello world from express!`);
});

server.get(`/now`, (request, response) => {
  response.send(`${moment()}`);
});

server.get(`/hubs`, (request, response) => {
  db.find()
    .then((hubs) => {
      response.status(200).json(hubs);
    })
    .catch((error) => {
      response.status(500).json({ success: false, error });
    });
});

server.get(`/hubs/:id`, (request, response) => {
  const { id } = request.params;

  db.findById(id)
    .then((hub) => {
      response.status(200).json(hub);
    })
    .catch((error) => {
      response.status(500).json({ success: false, error });
    });
});

server.post(`/hubs`, (request, response) => {
  const hubInfo = request.body;

  db.add(hubInfo)
    .then((hub) => {
      response.status(201).json({ success: true, hub });
    })
    .catch((error) => {
      response.status(500).json({ success: false, error });
    });
});

server.delete(`/hubs/:id`, (request, response) => {
  const { id } = request.params;

  db.remove(id)
    .then((deleted) => {
      if (deleted) {
        response.status(204).end();
      } else {
        response
          .status(404)
          .json({ success: false, message: "these are not the droids you're looking for..." });
      }
    })
    .catch((error) => {
      response.status(500).json({ success: false, error });
    });
});

server.put(`/hubs/:id`, (request, response) => {
  const { id } = request.params;
  const hubInfo = request.body;

  db.update(id, hubInfo)
    .then((updated) => {
      if (updated) {
        response.status(200).json({ success: true, updated });
      } else {
        response.status(404).json({ success: false, message: "you're tearing me apart LISA!" });
      }
    })
    .catch((error) => {
      response.status(500).json({ success: false, error });
    });
});

server.listen(4000, () => {
  console.log(`server listening on port 4000`);
});
