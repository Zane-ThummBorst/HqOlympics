import axios from 'axios';
import{useEffect, useState, useContext} from 'react';
import {MyContext} from '../MyContext';
import RegularList from './RegularList';
import Teams from './Teams';

const TeamPage = () =>{
    const [teamList, setTeamList] = useState(null)
    const {loginStatus,deletionStatus, setDeletionStatus, setLoginStatus, setTeamCreationStatus, 
           captain, username, teamStatus, team, setTeam, userId} =  useContext(MyContext)
    
    // move this to global?
    useEffect( () =>{
        const getTeams = async() =>{
            axios.get(`${process.env.REACT_APP_API_URL}/teams/getAllTeams`)
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
            <MyContext.Provider value = {{deletionStatus, setDeletionStatus, loginStatus, setLoginStatus, setTeamCreationStatus,
                                          captain, username, teamStatus, team, setTeam, userId, teamList, setTeamList}}>
                <RegularList items = {teamList ? teamList : []} resourceName = {"teams"} itemComponent = {Teams}/>
            </MyContext.Provider>
        </>
    )
}

export default TeamPage