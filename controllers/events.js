const _ = require('lodash');
const axios = require('axios');

const {mongoose} = require("../db/mongoose");
const {User} = require("../db/models/user");
const {apiConfig, classificationNames, genreIds} = require('../config/apiConfig');

let eventsController = {};

eventsController.createUser = [
  async (req, res) => {
    const body = _.pick(req.body, ['email', 'password', 'classificationName', 'genreId']);
    let user;
    try {
      if (genreIds[body.genreId] && classificationNames.includes(body.classificationName)) {
        body.genreId = genreIds[body.genreId];
        user = new User(body);
      } else {
        throw new Error();
      }
      await user.save();
      const token = await user.generateAuthToken();
      res.header('x-auth', token).send(user);
    } catch (e) {
      res.status(400).send(`Invalid registration details, please make sure:
        email is valid and unique
        password is between lengths 6 and 50
        classificationName is valid
        genreId is valid`);
    }
  }
];

eventsController.loginUser = [
  async (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    try {
      const user = await User.findByCredentials(body.email, body.password);
      const token = await user.generateAuthToken();
      res.header('x-auth', token).send(user);
    } catch (e) {
      res.status(401).send('Invalid login info');
    }
  }
];

eventsController.logoutUser = [
  async (req, res) => {
    try {
      await req.user.removeToken(req.header('x-auth'));
      res.status(200).send();
    } catch (e) {
      res.status(401).send('Unable to logout');
    }
  }
]

eventsController.getEvents = [
  async (req, res) => {
    try {
      const user = await User.findByToken(req.header('x-auth'));
      const events = await axios.get(apiConfig.url, {
        auth: {
          username: apiConfig.username,
          password: apiConfig.password
        },
        params: {
          classificationName: user.classificationName,
          genreId: user.genreId
        }
      });
      res.send(events.data);
    }  catch (e) {
      res.status(400).send('Unable to fetch events');
    }
  }
];

eventsController.setPreferences = [
  async (req, res) => {
    try {
      const body = _.pick(req.body, ['classificationName', 'genreId']);
      if (genreIds[body.genreId] && classificationNames.includes(body.classificationName)) {
        body.genreId = genreIds[body.genreId];
      } else {
        throw new Error();
      }

      const user = await User.findByToken(req.header('x-auth'));
      const updated = await user.update({
        $set: {
          classificationName: body.classificationName,
          genreId: body.genreId
        }
      })

      res.send(body);
    } catch (e) {
        res.status(400).send('Invalid classificationName and/or genreId');
    }
  }
];

module.exports = eventsController;
