const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to mongo database');
  })
  .catch((err) => {
    console.log('error connecting to database', err.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
  photo: String,
});

// personSchema.set('toJSON', {
//   transform: (document, returnedObj) => {
//     returnedObj.id = returnedObj._id.toString();
//     delete returnedObj._id;
//     delete returnedObj.__v;
//   },
// });

module.exports = mongoose.model('Person', personSchema);
