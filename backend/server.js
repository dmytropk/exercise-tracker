//create an Express server, attach the cors and express.json middleware
const express = require('express'); 
const cors = require('cors');

//to store configuration in the environment separate from code
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//make the server listen on port 5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});