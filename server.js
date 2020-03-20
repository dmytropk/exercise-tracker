//create an Express server, attach the cors and express.json middleware
const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose');  /* to interact with mongoDB through node.js simpler */
const path = require('path');

//to store configuration in the environment separate from code
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//.env file for connection string taken from MongoDB Atlas
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("mongoDB database connection established successfully");
})

//tell the server to read the files from routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//check if production build
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

//make the server listen
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
