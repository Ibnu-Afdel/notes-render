const noteRouter = require("express").Router();
const Note = require("../models/note");

noteRouter.get("/", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

// const generateId = () => {
//   const maxId =
//     notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
//   return String(maxId + 1);
// };

noteRouter.post("/", (request, response, next) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  // if (!body.content) {
  //   return response.status(400).json({
  //     error: "content missing",
  //   });
  // }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  // const note = {
  //   content: body.content,
  //   important: Boolean(body.important) || false,
  //   id: generateId(),
  // };
  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
  // notes = notes.concat(note);
  // response.json(note);
});

noteRouter.get("/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
  // const id = request.params.id;
  // const note = notes.find((note) => note.id === id);
  // if (note) {
  //   response.json(note);
  // } else {
  //   response.status(404).end();
  // }
});

noteRouter.put("/:id", (request, response, next) => {
  // const body = request.body;
  const { content, important } = request.body;

  // const note = {
  //   content: body.content,
  //   important: body.important,
  // };

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" },
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

noteRouter.delete("/:id", (request, response, next) => {
  // const id = request.params.id;
  // notes = notes.filter((note) => note.id !== id);
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
  response.status(204).end();
});

module.exports = noteRouter;
