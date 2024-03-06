const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});
const express = require('express');
const router = require('./routes/router');
const { getSchedules, triggerEmail } = require('./services/mailer')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', router);

const triggerFunction = async () => {
    const result = await getSchedules();
    if (result && result.length > 0) {
        for (const e of result) {
            console.log(`Triggering email to ${e.send_to}`);
            triggerEmail(e.send_to)
        }
    }
}

const currentTime = new Date();
const secondsForSync = 60 - currentTime.getSeconds();
setTimeout(() => {
    setInterval(triggerFunction, 60000);
}, secondsForSync * 1000);

app.listen(PORT, () => {
    console.log(`Server is running in port: ${PORT}`);
});