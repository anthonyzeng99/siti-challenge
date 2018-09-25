require('./config/config')

const port = process.env.PORT || 3000;
const axios = require('axios');

const express = require("express");
const bodyParser = require("body-parser");

const {authenticate} = require('./middleware/authenticate');
const eventsController = require('./controllers/events');

const app = express();

app.use(bodyParser.json());

app.post('/register', eventsController.createUser);
app.post('/login', eventsController.loginUser);
app.delete('/logout', authenticate, eventsController.logoutUser);
app.get('/getEvents', authenticate, eventsController.getEvents);
app.patch('/setPreferences', authenticate, eventsController.setPreferences);

app.listen(port, () => {
  console.log(`Started on port ${3000}`)
});

module.exports = {app};
