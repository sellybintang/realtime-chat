const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  pengirim: {
    type: String,
    required: true,
  },
  penerima: {
    type: String,
    required: true,
  },
  isiPesan: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);
