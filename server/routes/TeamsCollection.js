const express = require('express')
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
const {MongoClient} = require('mongodb');
const { param, body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const dotenv = require('dotenv')
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI, { monitorCommands: true })


const isAuthorized = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
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
router.post('/createTeam', isAuthorized, async(req,res) =>{
    // teamlead : team leaders ID
    // teammates: team members IDs, inculdes teamlead
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
        res.json({teamCode: teamCode, teamId: teamId})
    })
    .catch(err =>{
        res.json(err)
    })
})

router.put('/joinTeam', isAuthorized, async(req,res) =>{
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
            res.json(response)
        })
        .catch(err =>{
            res.json(err);
        })
    }else{
        res.status(405).json({error: 'invalid Team Code'})
    }
})
router.put('/removeFromTeam', isAuthorized, async(req,res) =>{
    const { teamId, teamCode} = req.body;
    const userId = req.userId;

    const db = client.db('BeerOlympics')
    const Teams = db.collection('Teams')

    const query = {team_id: teamId}
    await Teams.updateOne(query, {$pull: {teammates:{ userId: userId}}})
    .then(response =>{
        res.json(response)
    })
    .catch(err =>{
        res.json(err);
    })

})
router.post('/deleteTeam', async(req,res) =>{
    const {teamId} = req.body;

    const db = client.db('BeerOlympics')
    const Teams = db.collection('Teams')

    const query = {team_id: teamId}
    console.log(teamId)
    await Teams.deleteOne(query)
    .then(response =>{
        res.json(response)
    })
    .catch(err =>{
        res.json(err)
    })
})

router.put('/updateTeam', async(req,res) =>{

})

router.get('/getAllTeams', async(req,res) =>{
    console.log(process.env.MONGO_URI)
    const db = client.db('BeerOlympics')
    const Teams = db.collection('Teams')
    await Teams.find({}).toArray()
    .then(response =>{
        res.json(response)
    }).catch(error => {
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