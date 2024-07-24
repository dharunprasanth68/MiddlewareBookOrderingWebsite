// Required for Node to read .env file
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// required for communicating and connecting to the database
// and perform CRUD operations
const mongoose = require('mongoose');

// required for the application to run
const app = require('./app');

const https = require('https');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

// Connect to the database and replace the password
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

// Connect to the database
console.log(DB); // check the database connection string
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection successful!')
  })
  .catch(err => {
    console.log('DB connection failed!');
    console.log(err); 
  });

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});
