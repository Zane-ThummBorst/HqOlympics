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

# client setup
 ```terminal
 $ cd ./client // navigate to the client folder
 $ npm i // install node packages
 $ echo "REACT_APP_API_URL=*Your backend endpoint*" >> src/.env
 $ npm start
 ```

# server setup
 ```terminal
 $ cd ./server // navigate to the server folder
 $ npm i // install node packages
 $ echo "SECRET_KEY=*Your JWT secret key*" >> src/.env
 $ echo "MONGO_URI=*Your Mongo URL OR connection string*" >> src/.env
 $ echo "PORT=1234 [or any port you want]" >> src/.env
 $ npm run nodemon
 ```

# Dependencies
 Node Packages

# Screenshots of Project

 
