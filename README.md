# STIT Challenge
## Routes implemented
* `POST /register`: Registers user.
  * Requires: 'email', 'password', 'classificationName', and 'genreId' in body.
  * Returns x-auth token in response header.
* `POST /login`: Logs user in.
  * Requires: 'email', password'
  * Returns x-auth token in response header.
* `DELETE /logout`: Logs user out.
  * Requires x-auth token in request header.
* `GET /getEvents`: Retrieves events based on classification and genre stored in user's profile.
  * Require x-auth token in request header.
* `PATCH /setPreferences`: Set user preferences for classification and genre.
  * Requires: 'classificationName', and 'genreId' in body.
  * Requires x-auth token in request header.
## To use
* Fill out external api username and password in `config/apiConfig.js`
* Generate jwt secret keys and paste them in `config/config.js`
* Replace db address in `config/config.js`
* `yarn install` -> `yarn start` or `npm install` -> `npm start`
* Request that require data to be sent in body should be in JSON.
## Demo
 * Heroku url: https://fathomless-dawn-52799.herokuapp.com


