const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');

require('dotenv/config');

app.use(bodyParser.json());


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


PORT = process.env.PORT || 5000;
app.listen(PORT);