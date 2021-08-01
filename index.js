// Loads environment variables from a .env file into process.env
require('dotenv').config()

const createApp = require("./app");

const port = process.env.PORT;
// Mongo Url goes here
const mongoURL = process.env.MONGO_URL;

const config = {
  mongoURL
}

createApp(config).then(app => {
  app.listen(port, () =>
    console.log(`My first server is runnnin at http://localhost:${port}`)
  );
})