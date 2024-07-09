import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/LoginForm';
import TeamCreationForm from './Components/TeamCreationForm';
import Login from './Components/Login';
import TeamPage from './Components/TeamPage';
import TempModal from './Components/TempModal';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { MyContext } from './MyContext';
import {useEffect, useState} from 'react';
import axios from 'axios'
import Logout from './Components/Logout';
import { Button, Toolbar, AppBar, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
function App() {

  const [captain, setCaptain] = useState(null);
  const [username, setUsername] = useState(null);
  const [teamStatus, setTeamStatus] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);
  const [teamCreationStatus, setTeamCreationStatus] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [deletionStatus, setDeletionStatus] = useState(false);
  const [logoutStatus, setLogoutStatus] = useState(false);
  const [team, setTeam] = useState(null);
  const [userId, setUserId] = useState(null);

    useEffect(() =>{
      const getUser = async() =>{
          if (localStorage.getItem('jwt_token')){
            let team = null;
            let teamExists = true;
            const headers = {Authorization: `Bearer ${localStorage.getItem('jwt_token')}`} 
            await axios.get(`${process.env.REACT_APP_API_URL}/users/getUser`,
                {headers})
            .then( response =>{
                if(response.data){
                    setCaptain(response.data.captain);
                    setUsername(response.data.username);
                    setTeamStatus(response.data.teamStatus);
                    setTeam(response.data.team);
                    setUserId(response.data.user_id);
                    team = response.data.team
                }
            })
            .catch(error =>{
                console.log(error);
            })

            if(team){
              await axios.get(`${process.env.REACT_APP_API_URL}/teams/getTeam/${team}`)
              .then(response =>{
                if(response.data == null){
                  teamExists = false
                }
              })
            }

            if (!teamExists){
              await axios.put(`${process.env.REACT_APP_API_URL}/users/leavesTeam`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                    },
                    withCredentials: true
                }).then(response =>{
                  setTeamStatus(false);
                  setTeam(null);
                })
            }
        }else{
          console.log('balls')
          setCaptain(null);
          setUsername(null);
          setUserId(null);
          setTeamStatus(true);
          setTeam('nothing');
        }
      }
      getUser();
  },[loginStatus, teamCreationStatus, registrationStatus, deletionStatus, logoutStatus])


  return (
  <div>
    <MyContext.Provider value={{loginStatus, setLoginStatus, teamCreationStatus, setTeamCreationStatus,
       captain, username, teamStatus, team, setTeam, userId,registrationStatus ,setRegistrationStatus,deletionStatus,
        setDeletionStatus, logoutStatus, setLogoutStatus}}>
           <BrowserRouter>
              <NavBar/>
          </BrowserRouter>
    </MyContext.Provider>
  </div>
  );
}

export default App;
