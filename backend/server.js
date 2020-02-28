//create an Express server, attach the cors and express.json middleware
const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose');  /* to interact with mongoDB through node.js simpler */

//to store configuration in the environment separate from code
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//.env file for connection string taken from MongoDB Atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("mongoDB database connection established successfully");
})

//tell the server to read the files from backend/routes/
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//make the server listen on port 5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});