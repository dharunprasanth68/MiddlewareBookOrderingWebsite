const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = 3000;

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

app.defaultConfiguration('/', (req, res) => {
    res.send("Hello, World!");
});

https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});