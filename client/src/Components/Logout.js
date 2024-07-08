import axios from 'axios';
import{useEffect, useState, useContext} from 'react';
import { MyContext } from '../MyContext';
import {Button, MenuItem} from '@mui/material'
import { useNavigate } from 'react-router-dom';


const Logout = () =>{
    const {logoutStatus, setLogoutStatus} = useContext(MyContext)
        const navigate = useNavigate()
    const handleLogout = () =>{
        localStorage.removeItem('jwt_token')
        let new_logout = logoutStatus;
        setLogoutStatus(!new_logout);
        navigate('/')
    }
    return(
        <>
        <MenuItem  sx={{'color':'#fffbe0', fontFamily: 'PilsenPlakat'}} onClick={handleLogout}>Logout</MenuItem>
        </>
    )
}


export default Logout;