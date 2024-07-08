import axios from 'axios';
import{useEffect, useState, useContext} from 'react';
import {Box, TextField, Select, Radio, MenuItem, InputLabel, FormControl, FormControlLabel, RadioGroup, Button} from '@mui/material'
import {MyContext} from '../MyContext';

const UserInfoForm = () =>{

    const {username, setUsername, password, setPassword, formPage, setFormPage} = useContext(MyContext);
    const [usernameError, setUsernameError] = useState(null);
    const [usernameErrorStatus, setUsernameErrorStatus] = useState('');

    const [passwordError, setPasswordError] = useState(null);
    const [passwordErrorStatus, setPasswordErrorStatus] = useState('');

    const [retypedPassword, setRetypedPassword] = useState('');
    const [retypedPasswordError, setRetypedPasswordError] = useState(null);
    const [retypedPasswordErrorStatus, setRetypedPasswordErrorStatus] = useState('');

    const checkUsername = () =>{
        if(username === null || username === undefined){
            setUsernameError(true)
            setUsernameErrorStatus('Invalid Username')
            return false
        }else if(username.length < 3 || username.length > 256){
            setUsernameError(true);
            setUsernameErrorStatus('Invalid Username Length')
            return false
        }else{
            setUsernameError(false)
            setUsernameErrorStatus('')
            return true
        }
    }

    const checkPassword = () =>{
        const specialCharacters = /[!@#$%^&*]/
        const uppercaseCharaters = /[A-Z]/
        const lowercaseCharacters = /[a-z]/
        const digits = /[0-9]/

        if(!specialCharacters.test(password) ||
           !uppercaseCharaters.test(password) ||
           !lowercaseCharacters.test(password) ||
           !digits.test(password) ||
            password.length < 12){
                setPasswordError(true)
                setPasswordErrorStatus('Please enter a password with: a lowercase letter, an uppercase letter, a special character (!@#$%^&*), a digit, and a length of at least 12 characters')
                return false
            }
        else{
            setPasswordError(false)
            setPasswordErrorStatus('')
            return true
        }
    }

    const checkRetypePassword = () =>{
        if(password !== retypedPassword){
            setRetypedPasswordError(true)
            setRetypedPasswordErrorStatus("Passwords must match")
            return false
        }else{
            setRetypedPasswordError(false)
            setRetypedPasswordErrorStatus("")
            return true
        }
    }

    const handleNext = () =>{
        if(checkUsername() & checkPassword() & checkRetypePassword()){
            let new_formPage = formPage;
            setFormPage(new_formPage + 1)
        }
    }

    const handleUsername = (event) =>{
        setUsername(event.target.value);
    }

    const handlePassword = (event) =>{
        setPassword(event.target.value);
    }

    const handleRetypePassword = (event) =>{
        setRetypedPassword(event.target.value)
    }
    return(
        <>
            <TextField 
            fullWidth
            margin="normal"
            value={username}
            error={usernameError}
            helperText={usernameError ? usernameErrorStatus : ''}
            label='username'
            InputProps={{style: {fontFamily:'PilsenPlakat'}}}
            InputLabelProps={{style: {fontFamily:'PilsenPlakat'}}}
            onChange={handleUsername}
            sx={{
                mt: 3}} />

            <TextField 
            fullWidth
            margin="normal"
            value={password}
            error={passwordError}
            helperText={passwordError ? passwordErrorStatus : ''}
            label='password'
            type="password" 
            InputProps={{style: {fontFamily:'PilsenPlakat'}}}
            InputLabelProps={{style: {fontFamily:'PilsenPlakat'}}}
            onChange={handlePassword}
            sx={{
                mt: 3}} />

            <TextField fullWidth 
            margin="normal"
            value={retypedPassword}
            error={retypedPasswordError}
            helperText={retypedPasswordError ? retypedPasswordErrorStatus : ''}
            label='Retype password'
            type="password" 
            InputProps={{style: {fontFamily:'PilsenPlakat'}}}
            InputLabelProps={{style: {fontFamily:'PilsenPlakat'}}}
            onChange={handleRetypePassword}
            sx={{
                mt: 3}} />
            
            <Box  display="flex" justifyContent="flex-end">
                <Button sx={{fontFamily:'PilsenPlakat'}} onClick={handleNext}>NEXT</Button>
            </Box>
        </>
    )
}

export default UserInfoForm;