const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  artistName: { type: String, required: true },
  albumName: { type: String, required: true },
  genre: { type: String, required: true },
  subGenre: { type: String, required: true },
  labelName: String,
  publisher: { type: String, required: true },
  tiktokClipStartTime: String,
  songwriter: { type: String, required: true },
  originalReleaseDate: String,
  language: String,
  explicit: { type: String, required: true },
  coverArtCheck: { type: String, required: true },
  uploadMusic: { type: String, required: true }
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;