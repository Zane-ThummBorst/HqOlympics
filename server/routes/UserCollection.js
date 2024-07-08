const express = require('express')
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
const {MongoClient} = require('mongodb');
const client = new MongoClient("mongodb://0.0.0.0:27017/", { monitorCommands: true })
const { param, body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const dotenv = require('dotenv')
dotenv.config({
    path:'../.env'
});


const isAuthorized = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error)
        res.status(405).json({ error: 'Invalid token' });
    }
}


router.get('/getUser', isAuthorized, async(req,res) =>{
    const db = client.db('BeerOlympics')
    const users = db.collection('Users')
    await users.findOne({user_id: req.userId})
    .then(response =>{
        res.json(response);
    })
    .catch(err =>{
        res.json(err);
    })

})


// captains have an option for a seperate form to create a team and generate a team code
// followers/ solos have the option to enter a team code
// solos by x time will be placed in random teams???
// focus on creating this form to get user info
router.post('/createUser',[
    body("username").isString().trim().escape(),
    body("password").isString().trim(),
    body("motive").isString().trim().escape(),
    body("captain").isBoolean(),
    body("sobriety").isBoolean(),
    body("approval").isBoolean(),
    body("extraCuricularRole").isString().trim().escape(),
    async(req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {username,
            password,
            motive, // playing games, chillin?
            captain, 
            wayToContact, // optional based on captain value (can be phone or email so validate within route)
            sobriety, 
            arrival, //on time, later? time frame? from to?
            approval,
            extraCuricularRole,
            additionalNotes} = req.body;

            let hashPassword;
            await bcrypt.hash(password, saltRounds)
            .then(hash =>{
                hashPassword = hash;
            }).catch(error =>{
                res.json("balls")
            })
            let userId = crypto.randomUUID();
            const user = {
                user_id: userId,
                username: username,
                password: hashPassword,
                motive: motive,
                captain: captain,
                wayToContact: wayToContact,
                sobriety: sobriety,
                arrival: arrival,
                approval: approval,
                extraCuricularRole: extraCuricularRole,
                additionalNotes: additionalNotes,
                teamStatus: false,
                team: null
            }
        
            const db = client.db('BeerOlympics')
            const users = db.collection('Users')
            await users.insertOne(user)
            .then((response) =>{
                const token = jwt.sign({ userId: userId }, process.env.SECRET_KEY, {
                    expiresIn: '1h',
                });
                console.log(token);
                res.json(token)
            }).catch(error =>{
                res.json("issues")
            })

}])

router.post('/updateUser', isAuthorized, async(req,res) =>{
    const {
        username,
        email,
        password,
        motive,
        captain, 
        wayToContact,
        sobriety, 
        arrival, 
        approval,
        extraCuricularRole} = req.body;

        const query = {user_id: req.userId}
        const updateFields = {
            username: username,
            motive: motive,
            captain: captain,
            wayToContact: wayToContact,
            sobriety: sobriety,
            arrival: arrival,
            approval: approval,
            extraCuricularRole: extraCuricularRole
        }

        const db = client.db('BeerOlympics')
        const users = db.collection('Users')
        await users.updateOne(query, {$set : updateFields})
        .then( response => {
            res.json(response)
        }).catch(error =>{
            next(error)
        })
})

router.post('/loginUser', async(req,res)=>{
    const {username, password} = req.body
    const db = client.db('BeerOlympics')
    const users = db.collection('Users')
    await users.findOne({username: username})
    .then( response => {
        if(!response.user_id){
            res.status(404).send({ error: "User not found" });
        }
        let user_id = response.user_id;
        let passwordHash = response.password;
        bcrypt.compare(password, passwordHash, (err, result) =>{
            if(result){
                const token = jwt.sign({ userId: user_id }, process.env.SECRET_KEY, {
                    expiresIn: '1h',
                });
                res.json(token)
            }else{
                res.status(401).send({ error: "password was Incorrect" });
            }
        })
    }).catch(error =>{
        res.status(404).send({ error: "User not found" });
    })
})

router.put('/joinsTeam', isAuthorized, async(req,res) =>{
    const {teamId} = req.body;

    const db = client.db('BeerOlympics')
    const users = db.collection('Users')
    const query = {user_id: req.userId}
    await users.updateOne(query, {$set : {teamStatus: true, team: teamId}})
    .then( response => {
        res.json(response)
    }).catch(error =>{
        next(error)
    })
})

router.put('/leavesTeam', isAuthorized, async(req,res) =>{
    
    const db = client.db('BeerOlympics')
    const users = db.collection('Users')
    const query = {user_id: req.userId}
    await users.updateOne(query, {$set : {teamStatus: false, team: null}})
    .then( response => {
        res.json(response)
    }).catch(error =>{
        next(error)
    })
})


module.exports = router;