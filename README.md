# HQ Olympics
The purpose of this project is to serve as a hub and registration form for an upcoming party me and my roommates are hosting! The party is themed around the summer olympics and will have choice games where teams can compete against one another for medals. On the site, users can register there info so we have an idea of who is coming and if we need to make any special accomodations. Users can also to choose to register as solo or captains, where captains have the extended ability to create one team to invite their friends on to. In the future, depending on how things go, the site might also hold various pieces of information such as; score cards, video(s) of the events and promo, etc. Below are details on how to setup the project locally as well as a link to the current production build, screenshots, and other details.

# Clone or download
```terminal
$ git clone https://github.com/Zane-ThummBorst/BeerOlympics.git
```

# File Structure
 ```terminal
client/
    build
    public
    src/
       assets/
       Components/
    App.js
    .env
server/
    routes/
    .env
    index.js
...
```

# Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)


# server setup


 ```terminal
 $ cd ./server                                                             // navigate to the server folder
 $ echo "SECRET_KEY=*Your JWT secret key*" >> src/.env                     // secret key to sign for token based access
 $ echo "MONGO_URI=*Your Mongo URL OR connection string*" >> src/.env      // mongo connection to save created info
 $ echo "PORT=1234 [or any port you want]" >> src/.env                     // port to run the server on
 $ npm i // install node packages                                          // install dependencies
 $ npm run nodemon                                                         // run the server locally
 ```

# client setup

 ```terminal
  // make sure to change the proxy server in the package.json file to your local server!
  "options": {
    "allowedHosts": [
      "localhost",
      ".localhost"
    ],
    "proxy": "http://localhost:*your port #*"                              //make sure this is the port number you chose for server!
  },
 ```

 ```terminal
 $ cd ./client                                                             // navigate to the client folder
 $ echo "REACT_APP_API_URL=http://localhost:*your port #*" >> src/.env     // backend endpoint to make REST requests to server
 $ npm i                                                                   // install node packages
 $ npm start                                                               // run client locally
 ```

# Dependencies
Client-side | Server-side
--- | ---
"@emotion/react": "^11.11.4" |  "axios": "^1.6.8"
"@emotion/styled": "^11.11.5" | "bad-words": "^3.0.4"
"@mui/icons-material": "^5.16.0" | "bcrypt": "^5.1.1"
"@mui/material": "^5.15.19" |  "cookie-parser": "^1.4.6"
"@testing-library/jest-dom": "^5.17.0" |  "cors": "^2.8.5"
"@testing-library/react": "^13.4.0" | "dotenv": "^16.4.5"
"@testing-library/user-event": "^13.5.0" | "express": "^4.19.2"
"axios": "^1.7.2" | "express-validator": "^7.1.0"
"dotenv": "^16.4.5" | "helmet": "^7.1.0"
"react": "^18.3.1" | "jsonwebtoken": "^9.0.2"
"react-dom": "^18.3.1" | "mongodb": "^6.7.0"
"react-router-dom": "^6.23.1" | "nodemon": "^3.1.0"
"react-scripts": "5.0.1" |
"styled-components": "^6.1.11" |
"web-vitals": "^2.1.4" |

# Screenshots of Project

![hqOlympicDash](https://github.com/user-attachments/assets/769cc125-0640-4627-88ec-d2aef50b0cb1)

Homepage that contains currently created teams

![hqOlympicTeamCreation](https://github.com/user-attachments/assets/c2934b82-4bf6-4b27-92a3-2aae680f9c8c)

Team creation page where users (captains) can choose a country and a team name

![HqRegistration](https://github.com/user-attachments/assets/0e1fce2e-37f8-4201-98d1-e8f8d5844324)

Part of the registration process for users (collecting user info for party details)

![hqregistrationIOS](https://github.com/user-attachments/assets/21810b78-aa67-4b4d-a1b4-ac45c82367da)

responsive view display

