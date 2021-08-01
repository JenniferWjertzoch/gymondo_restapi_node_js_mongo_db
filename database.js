const mongoose = require("mongoose");

async function connectToDb(mongoURL) {
  await mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connectToDb;
