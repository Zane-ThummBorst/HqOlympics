import axios from 'axios';
import{useEffect, useState, useContext} from 'react';
import {Typography, Box, Divider, List, ListItem, ListItemText, Select, Paper, Radio, MenuItem, InputLabel, FormControl, FormControlLabel, RadioGroup, Button} from '@mui/material'
import {MyContext} from '../MyContext';
import TempModal from './TempModal';
import '../assets/fonts/Global.css'

const Teams = ({item}) =>{
    //if team and team id are the same: user is given leave option
    // if team not null but not equal to team id, display nothing
    // if team id null, display join
    const {teamStatus, username, team, setTeam, userId,captain, teamList, setTeamList,deletionStatus, setDeletionStatus} = useContext(MyContext);
    const {countryCode, teammates, team_name, team_id} = item
    const [joined, setJoined] = useState(null)
    const [teammatesList, setTeammatesList] = useState(teammates);
    const [userTeam, setUserTeam] = useState(team);
    const [userTeamCode, setUserTeamCode]  = useState(null);
    const [open, setOpen] = useState(false);

    const [teamLimit, setTeamLimit] = useState(0)

    const [codeError, setCodeError] = useState(null)
    const [codeErrorStatus, setCodeErrorStatus] = useState('')

    const handleOpen = () =>{
        setOpen(true)
    }


    useEffect(() =>{
        setTeamLimit(teammatesList.length)
    },[teammatesList])

    /*
    should not work if:
        - user is in a team
        - user is in this team
        - user provides wrong code
        - user is not signed in (not authorized)
    */
    const joinTeam = async() =>{
        let result = false
        await axios.put(`${process.env.REACT_APP_API_URL}/teams/joinTeam`,
            {teamCode: userTeamCode, username: username, teamId: team_id},
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                },
                withCredentials: true
            })
            .then(response =>{
                console.log('success!')

                result = true;
                setTeammatesList(prevTeammatesList => [...prevTeammatesList, {userId: userId, username: username}]);
            }).catch(err => {
                if(err.response.data.error == "invalid Team Code"){
                    setCodeError(true)
                    setCodeErrorStatus("Incorrect Team Code")
                }else{
                    setCodeError(true)
                    setCodeErrorStatus("Cannot process at this time")
                }
            })
        if(result){
            setCodeError(false)
            setCodeErrorStatus('')
            await axios.put(`${process.env.REACT_APP_API_URL}/users/joinsTeam`,
                {teamId: team_id},
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                    },
                    withCredentials: true
                })
                .then(response =>{
                    // triger re gather of user info, or change useState
                    setTeam(team_id)
                })
                setOpen(false)
        }
    }

    const leaveTeam = async() =>{
        let result = false
        await axios.put(`${process.env.REACT_APP_API_URL}/teams/removeFromTeam`,
            {teamCode: '0VAFC7', teamId: team_id},
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                },
                withCredentials: true
            })
            .then(response =>{
                result = true;
                const newTeammatesList = teammatesList.filter(item => item.userId !== userId);
                console.log(newTeammatesList)
                setTeammatesList(newTeammatesList);
            }).catch(err => {
                console.log('failure')
            })
        if(result){
            await axios.put(`${process.env.REACT_APP_API_URL}/users/leavesTeam`,
                {teamId: team_id},
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                    },
                    withCredentials: true
                })
                .then(response =>{
                    // triger re gather of user info, or change useState
                    setTeam(null)
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    }

    const deleteTeam = async() =>{
        console.log(teamList)
        console.log(team_id)
        axios.post(`${process.env.REACT_APP_API_URL}/teams/deleteTeam`,{teamId: team_id})
        .then(response =>{
            // do something
            setTeamList(teamList.filter(item => item.team_id !== team_id))
            let new_deletionStatus = deletionStatus
            console.log(deletionStatus)
            setDeletionStatus(!new_deletionStatus)
        })
        .catch(error =>{
            // do something
            console.log(error.data)
        })
    }

    return(
        <>
            <MyContext.Provider value={{userTeamCode, setUserTeamCode, open, setOpen, handleOpen, joinTeam, codeError, setCodeError, codeErrorStatus, setCodeErrorStatus}}>
                <TempModal/>
            </MyContext.Provider>


            <Paper display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'} // Adjusted to push items apart
                alignItems="center"
                elevation={12}
                variant="outlined"
            sx={{
                background: '#fffbe0',
                borderRadius: '1em',
                margin: '1em',
                padding:'1em',
                 position: 'relative'
            }}>
                      <img src={`https://flagcdn.com/w640/${countryCode ? countryCode : 'us'}.webp`}
                  style={{ width: '300px', height: '200px' }}/>
                <div style={{textAlign: 'center'}}>
                    <Typography fontFamily={"OldLondon"} sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
                        {team_name}
                    </Typography>
                </div>

                <List dense={true}>
                {teammatesList.map( (item, index) =>{
                 return(
                <div>
                    <Divider/>
                    <ListItem>
                    <ListItemText
                         primaryTypographyProps={{fontFamily: 'PilsenPlakat'}}
                        primary={item.username}
                    />
                    </ListItem>
                </div>
                )})}
             </List>
             <Box sx={{ position: 'absolute', bottom: 0, right: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {!team && !captain && <Button disabled={teamLimit == 6} onClick={handleOpen}>JOIN</Button>}
        {team == team_id && !captain && <Button onClick={leaveTeam}>LEAVE</Button>}
        {team == team_id && captain && <Button onClick={deleteTeam}>DELETE</Button>}
    </Box>
            </Paper>
        </>
    )
}

export default Teams