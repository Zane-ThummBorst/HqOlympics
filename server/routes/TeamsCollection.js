const express = require('express')
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
const {MongoClient} = require('mongodb');
const { param, body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const Filter = require('bad-words')
const filter = new Filter();
const dotenv = require('dotenv')
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI, { monitorCommands: true })

// https://medium.com/@ntsendifor/cultivating-respect-and-safety-in-educompanion-au-e86bc8610f0c
const checkForBadWords = (req, res, next) => {
    const checkBadWordsInObject = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
            
          const containsBadWord = filter.isProfane(obj[key].normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
          if (containsBadWord) {
            obj[key] = filter.clean(obj[key].normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
          }
        } else if (typeof obj[key] === 'object') {
          checkBadWordsInObject(obj[key].normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
        }
      }
    };
  
    checkBadWordsInObject(req.body);
  
    next();
  };


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



// this will come in with a token, we will check if they are a user, and also check if they are a captain
router.post('/createTeam',[
    body("teamName").isString().trim().escape(),
    body("username").isString().trim().escape(),
    body("countryCode").isString().trim().escape()],
    isAuthorized,
    checkForBadWords,
    async(req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {teamName, username, countryCode} = req.body;
        const userId = req.userId
        const alphaNumList ="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        let teamCode = ""
        for(let i = 0; i < 6; i++){
            teamCode += alphaNumList.charAt(Math.floor(Math.random() * alphaNumList.length))
        }

        const teamId = crypto.randomUUID()
        const teamDetails = {
            team_id: teamId,
            team_name: teamName,
            team_lead: userId,
            team_code: teamCode,
            countryCode: countryCode,
            teammates: [{userId: userId, username: username }]
        }

        const db = client.db('BeerOlympics')
        const Teams = db.collection('Teams')

        await Teams.insertOne(teamDetails)
        .then( response =>{
            console.log('Team has been created')
            res.json({teamCode: teamCode, teamId: teamId})
        })
        .catch(err =>{
            console.log('Team has failed to create')
            res.json(err)
        })
})

router.put('/joinTeam',[
    body("teamId").isString().trim().escape(),
    body("teamCode").isString().trim().escape(),
    body("username").isString().trim().escape()],
    isAuthorized,
    async(req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {teamId, teamCode, username} = req.body;
        const userId = req.userId;

        const db = client.db('BeerOlympics')
        const Teams = db.collection('Teams')

        let result = null;


        const query = {team_id: teamId}
        await Teams.findOne(query)
        .then(response =>{
            code = response.team_code
            result = teamCode === code ? true : false
        })

        if(result){
            await Teams.updateOne(query, {$push: {teammates: {userId: userId, username: username }}})
            .then(response =>{
                console.log('Team has been given new teammate')
                res.json(response)
            })
            .catch(err =>{
                console.log('Team has failed to accept teammate')
                res.json(err);
            })
        }else{
            res.status(405).json({error: 'invalid Team Code'})
        }
    })
router.put('/removeFromTeam',
    [body("teamId").isString().trim().escape()],
    isAuthorized,
    async(req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { teamId} = req.body;
        const userId = req.userId;

        const db = client.db('BeerOlympics')
        const Teams = db.collection('Teams')

        const query = {team_id: teamId}
        await Teams.updateOne(query, {$pull: {teammates:{ userId: userId}}})
        .then(response =>{
            console.log('removed teammember')
            res.json(response)
        })
        .catch(err =>{
            console.log('failed to remove teammate')
            res.json(err);
        })
    })
// should be authorized?
router.post('/deleteTeam', [body("teamId").isString().trim().escape()],
    async(req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {teamId} = req.body;

        const db = client.db('BeerOlympics')
        const Teams = db.collection('Teams')

        const query = {team_id: teamId}
        await Teams.deleteOne(query)
        .then(response =>{
            console.log('successfully deleted a team')
            res.json(response)

        })
        .catch(err =>{
            console.log('failed to delete team')
            res.json(err)
        })
})

router.put('/updateTeam', async(req,res) =>{

})

router.get('/getAllTeams', async(req,res) =>{
    const db = client.db('BeerOlympics')
    const Teams = db.collection('Teams')
    await Teams.find({}).toArray()
    .then(response =>{
        console.log("successfully retrieved teams")
        res.json(response)
    }).catch(error => {
        console.log("Failed to retrieve teams")
        res.json(error)

    })
})

router.get('/getTeam/:teamId', async (req,res) =>{
    const db = client.db('BeerOlympics')
    const Teams = db.collection('Teams')
    const teamId = req.params.teamId;

    const query = {team_id: teamId}
    await Teams.findOne(query)
    .then(response =>{
        res.json(response);
    }) 
})



module.exports = router;