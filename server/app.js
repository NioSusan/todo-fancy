const express = require("express");
const logger = require("morgan");
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require("express-session");
const cors = require("cors");
const userSeed = require("./seeds/users");
const todoSeed = require("./seeds/todos");
require("dotenv").config();

// userSeed();
// todoSeed();

const indexRoutes = require('./routes/index')
const todoRoutes = require('./routes/todos')
const userRoutes = require("./routes/users");

let app = express();

mongoose.connect('mongodb://localhost:27017/todo-api', {useNewUrlParser:true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!')
});

app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true
}));

app.use('/', indexRoutes)
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
    console.log(`its running on ${port}`)
})

