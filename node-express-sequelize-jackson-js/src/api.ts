import express = require('express');
import { JsonStringifier, JsonParser } from 'jackson-js';
import { Writer } from './models/Writer';
import { Book } from './models/Book';
import { ProfileViews } from './views';

const jsonStringifier = new JsonStringifier();
const jsonParser = new JsonParser();

const router = express.Router();

router.get('/writers/public', async (req, res) => {
  const writers = await Writer.findAll({
    include: [
      {
        all: true
      }
    ]
  });

  const jsonData = jsonStringifier.stringify(
    writers, {
      mainCreator: () => [Array, [Writer]],
      withViews: () => [ProfileViews.public],
      withContextGroups: ['writerContextApi']
    });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(jsonData);
});

router.get('/writers', async (req, res) => {
  const writers = await Writer.findAll({
    include: [
      {
        all: true
      }
    ]
  });

  const jsonData = jsonStringifier.stringify(
    writers, {
      mainCreator: () => [Array, [Writer]],
      withContextGroups: ['writerContextApi']
    });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(jsonData);
});

router.post('/writers', async (req, res) => {
  let newWriter = jsonParser.transform(req.body, {
    mainCreator: () => [Writer]
  });
  newWriter = await newWriter.save();

  const jsonData = jsonStringifier.stringify(
    newWriter, {
      mainCreator: () => [Writer],
      withContextGroups: ['writerContextApi']
    });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(jsonData);
});

router.get('/writers/:id([0-9]+)', async (req, res) => {
  const writer = await Writer.findByPk(req.params.id, {
    include: [
      {
        all: true
      }
    ]
  });

  const jsonData = jsonStringifier.stringify(
    writer, {
      mainCreator: () => [Writer],
      withContextGroups: ['writerContextApi']
    });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(jsonData);
});

router.get('/books', async (req, res) => {
  const books = await Book.findAll({
    include: [
      {
        all: true
      }
    ]
  });

  const jsonData = jsonStringifier.stringify(
    books, {
      mainCreator: () => [Array, [Book]],
      withContextGroups: ['bookContextApi']
    });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(jsonData);
});

router.get('/books/public', async (req, res) => {
  const books = await Book.findAll({
    include: [
      {
        all: true
      }
    ]
  });

  const jsonData = jsonStringifier.stringify(
    books, {
      mainCreator: () => [Array, [Book]],
      withViews: () => [ProfileViews.public],
      withContextGroups: ['bookContextApi']
    });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(jsonData);
});

router.post('/books', async (req, res) => {
  let newBook = jsonParser.transform(req.body, {
    mainCreator: () => [Book]
  });
  newBook = await newBook.save();

  const jsonData = jsonStringifier.stringify(
    newBook, {
      mainCreator: () => [Book],
      withContextGroups: ['bookContextApi']
    });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(jsonData);
});

router.get('/books/:id([0-9]+)', async (req, res) => {
  const book = await Book.findByPk(req.params.id, {
    include: [
      {
        all: true
      }
    ]
  });

  const jsonData = jsonStringifier.stringify(
    book, {
      mainCreator: () => [Book],
      withContextGroups: ['bookContextApi']
    });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(jsonData);
});

export default router;
