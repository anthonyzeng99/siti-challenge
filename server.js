const axios = require('axios');
const express = require("express");
const bodyParser = require("body-parser");

require('./config/config')
const {authenticate} = require('./middleware/authenticate');
const eventsController = require('./controllers/events');

const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());

app.post('/register', eventsController.createUser);
app.post('/login', eventsController.loginUser);
app.delete('/logout', authenticate, eventsController.logoutUser);
app.get('/getEvents', authenticate, eventsController.getEvents);
app.patch('/setPreferences', authenticate, eventsController.setPreferences);

app.listen(port, () => {
  console.log(`Started on port ${port}`)
});

module.exports = {app};
