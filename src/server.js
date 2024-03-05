const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});
const express = require('express');
const router = require('./routes/router');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running in port: ${PORT}`);
});