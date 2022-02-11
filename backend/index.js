require('dotenv').config();
const express = require('express');
const app = express();
const Person = require('./models/person');
const cors = require('cors');
const multer = require('multer');

app.use(express.json());
// app.use(cors());
app.get('/api/persons', (req, res) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((err) => console.log(err.message));
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number,
    // photo: req.file,
  });
  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((err) => console.log(err.message));
});

const PORT = process.env.PORT;
app.listen(PORT);
