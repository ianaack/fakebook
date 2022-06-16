# fakebook - Social Network API

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Description
  An API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

  ## Contribution
  There is no need for contribution at this time, but have a look at some other projects built by our team!
  * [Ian Ackerman](https://github.com/ianaack)   

  ## Table of Contents
  * [Description](Description)
  * [Contribution](Contribution)
  * [Deployment](Deployment)
  * [Usage](Usage)
  * [Tests](Tests)
  * [License](License)
  
  ## Deployment
  The application is a backend API only so there is no application deployment.
  In order to see how the application works check out: [Usage](Usage).
  To test the routes yourself and see the full capabilities check out: [Tests](Tests)

  Here are some screenshots of the example routes

  GET all users:

  GET all thoughts:

  ## Usage
  For a walkthough example of how the application functions: [Go Here]()

  ## Tests
  Tests for the application functionality were performed using Insomnia.

  If you would like to test out the various routes you can follow these instructions:

  - git clone the repository with either HTTP or SSH
  ```bash
  git clone
  ```
  - install the necessary dependencies
  ```bash
  npm install
  ```
  - once the dependencies are installed, start the server
  ```bash
  node server
  ```
  - within insomnia make calls to access the different models and routes
  To GET all users & POST a user:
  ```bash
  http://localhost:3001/api/users
  ```
  To GET all thoughts & POST a thought:
  ```bash
  http://localhost:3001/api/thoughts
  ```
  From these routes you can PUT, and DELETE data as well, using the created _id.

  Using this _id string is also how you create friend connections, and reply to thoughts.

  ## License
  This project is covered under the MIT License.
  