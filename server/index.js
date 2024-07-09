
const express = require('express')
const app = express()
const UserCollection = require('./routes/UserCollection')
const TeamsCollection = require('./routes/TeamsCollection')

const cookieParser = require('cookie-parser')

require('dotenv').config();
const port = process.env.PORT || 1234

let cors = require('cors');
app.use(cors({credentials: true, origin: 'https://beerolympics-1.onrender.com/'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use("/users", UserCollection);
app.use("/teams", TeamsCollection);


app.get('/', (req, res) => {
    res.send('I declare these Beer Drinker Games ... OPEN !!!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})