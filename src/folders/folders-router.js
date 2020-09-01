const express = require('express');
const FoldersService = require('./folders-service');
const path = require('path');
const xss = require('xss');

const foldersRouter = express.Router();
const jsonParser = express.json();

const serializeFolder = folder => ({
  id: folder.id,
  name: xss(folder.name) //sanitize name
})

foldersRouter
  .route('/')
  .get((req, res, next) => {
    FoldersService.getAllFolders(
      req.app.get('db')
    )
      .then(folders => {
        res.json(folders.map(serializeFolder))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { name } = req.body
    const newFolder = { name }

    for (const [key, value] of Object.entries(newFolder)) {
      if (value === null) {
        return res.status(400).json({
          error: { message: `Missing ${key} in request body` }
        })
      }
    }

    FoldersService.insertFolder(
      req.app.get('db'),
      newFolder
    )
      .then(folder => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${folder.id}`))
          .json(serializeFolder(folder))
      })
      .catch(next)
  })



module.exports = foldersRouter;