# Siti Challenge
## Routes implemented
* `POST /register`: Registers user and returns x-auth token in header.
* `POST /login`: Log user in and returns x-auth token in header.
* `DELETE /logout`: Logs user out. Specify x-auth token in header for authentication.
* `GET /getEvents`: Retrieves events based on classification and genre stored in user's profile. Specify x-auth token in header for authentication.
* `PATCH /setPreferences`: Set user preferences for classification and genre. Specify x-auth token in header for authentication.


