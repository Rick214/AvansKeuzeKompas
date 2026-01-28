const express = require('express');
const app = express();

app.get('/user', (req, res) => {
    const id = req.query.id;

    const query = "SELECT * FROM users WHERE id = " + id;

    res.send(query);
});

module.exports = app;
