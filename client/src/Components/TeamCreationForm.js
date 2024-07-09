import axios from 'axios';
import{useEffect, useState, useContext} from 'react';
import {Box, TextField, Select, Autocomplete, Button} from '@mui/material'
import {MyContext} from '../MyContext';
import countries from './CountryData';
import { useNavigate } from "react-router-dom";
import ModalCode from './ModalCode';
import Grid from '@mui/material/Unstable_Grid2'


const TeamCreationForm = () =>{
    const navigate = useNavigate();
    const [countryCode, setCountryCode] = useState('')
    const [teamCode, setTeamCode] = useState('')
    const [countryCodeError, setCountryCodeError] = useState(null)
    const [countryCodeErrorStatus, setCountryCodeErrorStatus] = useState('')
    const [open, setOpen] = useState(false);

    const {captain, username, teamStatus, teamCreationStatus, setTeamCreationStatus} = useContext(MyContext)

    // const [captain, setCaptain] = useState(true)
    const [teamName, setTeamName] = useState('')
    const [teamNameError, setTeamNameError] = useState(null)
    const [teamNameErrorStatus, setTeamNameErrorStatus] = useState('')

    const handleCountry = (event, newValue) =>{
        if(newValue != null){
            setCountryCode(newValue.code.toLowerCase());
        }
    }

    const checkCountry = () =>{
        if(countryCode === '' || countryCode === undefined){
            setCountryCodeError(true)
            setCountryCodeErrorStatus('please make a selection')
            return false
        }else{
            setCountryCodeError(false)
            setCountryCodeErrorStatus('')
            return true
        }
    }

    const handleOpen = () =>{
        setOpen(true)
    }

    const handleTeamName = (event) =>{
        setTeamName(event.target.value);
    }

    const checkTeamName = () =>{
        if(teamName === '' || teamName === undefined){
            setTeamNameError(true)
            setTeamNameErrorStatus('please enter a valid team name')
            return false
        }else{
            setTeamNameError(false)
            setTeamNameErrorStatus('')
            return true
        }
    }
    // add in bearer token
    const handleSubmission = async() =>{
        if(checkTeamName()){
            let result = false;
            let team_id = null;
            await axios.post(`${process.env.REACT_APP_API_URL}/teams/createTeam`, {
                teamName: teamName,
                username: username,
                countryCode: countryCode,
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                },
                withCredentials: true
            }
        )
            .then( response =>{
                team_id = response.data.teamId
                setTeamCode(response.data.teamCode)
                setOpen(true)
                // navigate('/')
            })
            .catch( error =>{
                console.log(error)
            })

            if(team_id){
                await axios.put(`${process.env.REACT_APP_API_URL}/users/joinsTeam`,
                    {teamId: team_id},
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                        },
                        withCredentials: true
                    })
                    .then(response =>{
                        let new_teamCreationStatus = teamCreationStatus
                        console.log(teamCreationStatus)
                        setTeamCreationStatus(!new_teamCreationStatus);
                    })
            }
        }
    }
    return(
        <>
        <MyContext.Provider value = {{open,setOpen,teamCode}}>
            <ModalCode/>
        </MyContext.Provider>
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            columns={{ xs: 4, sm: 8, md: 12 }}   
            sx={{'my': 5}}>
                <Grid xs/>
                <Grid
                xs={4}
                borderRadius={'1em'}
                padding={3}
                sx ={{ background: '#fffbe0',
                    borderWidth: '1px',
                    borderColor: 'grey'
                }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                  <img src={`https://flagcdn.com/w320/${countryCode ? countryCode : 'us'}.webp`}  height="200"/>
                  </Box>
                <Autocomplete fullWidth
                options={countries}
                onChange={handleCountry}
                renderInput={(params) => <TextField {...params} InputLabelProps={{style: {fontFamily:'PilsenPlakat'}}} label="Countries"/>}
                sx={{
                    mt:3
                 }}>

                </Autocomplete>
                <TextField fullWidth
                label='Team Name'
                value={teamName}
                onChange={handleTeamName}
                error={teamNameError}
                helperText={teamNameErrorStatus}
                InputProps={{style: {fontFamily:'PilsenPlakat'}}}
                InputLabelProps={{style: {fontFamily:'PilsenPlakat'}}}
                sx={{
                    mt: 3}}
                ></TextField>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                    <Button sx = {{fontFamily:'PilsenPlakat'}} disabled={!captain || teamStatus} onClick={handleSubmission}>Submit</Button>
                </Box>
                </Grid>
                <Grid xs/>
                
        </Grid>
        </>
    )
}

export default TeamCreationForm;