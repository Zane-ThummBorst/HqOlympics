# HQ Olympics
 Intro material, what is the project? why was it made? etc ...

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
       assets
       Components
    App.js
    .env
server/
    routes
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
 $ cd ./client                                                             // navigate to the client folder
 $ echo "REACT_APP_API_URL=http://localhost:*your port #*" >> src/.env    // backend endpoint to make REST requests to server
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

 
