const { request, response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://ezorders:root@ezorders.lzwp9.mongodb.net/ezorders?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.use((request, response, next) => {
  request.io = io;
  next();
});
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3001, () =>
  console.log("> Server is running")
);
