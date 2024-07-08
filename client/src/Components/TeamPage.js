import axios from 'axios';
import{useEffect, useState, useContext} from 'react';
import {Box, TextField, Select, Radio, MenuItem, InputLabel, FormControl, FormControlLabel, RadioGroup, Button} from '@mui/material'
import {MyContext} from '../MyContext';
import RegularList from './RegularList';
import Teams from './Teams';

const TeamPage = () =>{
    const [teamList, setTeamList] = useState(null)
    const {loginStatus,deletionStatus, setDeletionStatus, setLoginStatus, setTeamCreationStatus, captain, username, teamStatus, team, setTeam, userId} =  useContext(MyContext)
    useEffect( () =>{
        const getTeams = async() =>{
            axios.get('http://localhost:1234/teams/getAllTeams')
            .then(response =>{
                setTeamList(response.data)
            })
            .catch(error =>{
                console.log(error)
            })
        }
        getTeams()
    }, [])

    return (
        <>
        {/* { teamList ? teamList.map( (item, index) =>{
            return(
                <p>{item.team_name}</p>
            )
        }) : []} */}
        <MyContext.Provider value = {{deletionStatus, setDeletionStatus, loginStatus, setLoginStatus, setTeamCreationStatus, captain, username, teamStatus, team, setTeam, userId, teamList, setTeamList}}>
            <RegularList items = {teamList ? teamList : []} resourceName = {"teams"} itemComponent = {Teams}></RegularList>
        </MyContext.Provider>
        </>
    )
}

export default TeamPage