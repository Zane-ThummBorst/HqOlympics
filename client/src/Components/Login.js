import axios from 'axios';
import{ useState, useContext} from 'react';
import {Box, TextField, Button} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import {MyContext} from '../MyContext';
import { useNavigate } from "react-router-dom";
import '../assets/fonts/Global.css'


const Login = () =>{

    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [usernameError, setUsernameError] = useState(null);
    const [usernameErrorStatus, setUsernameErrorStatus] = useState('');

    const [passwordError, setPasswordError] = useState(null);
    const [passwordErrorStatus, setPasswordErrorStatus] = useState('');

    const {loginStatus, setLoginStatus} = useContext(MyContext)


    const checkUsername = () =>{
        if(username === '' || username === undefined){
            setUsernameError(true)
            setUsernameErrorStatus('Invalid Username')
            return false
        }else{
            setUsernameError(false)
            setUsernameErrorStatus('')
            return true
        }
    }

    const checkPassword = () =>{
        if(password == '' || password == undefined){
                setPasswordError(true)
                setPasswordErrorStatus('please enter a password')
                return false
            }
        else{
            setPasswordError(false)
            setPasswordErrorStatus('')
            return true
        }
    }

    const handleSubmission = async() =>{
        if(checkUsername() & checkPassword()){
            axios.post(`${process.env.REACT_APP_API_URL}/users/loginUser`,{
                username: username,
                password: password
            }).then( response =>{
                localStorage.setItem("jwt_token", response.data)
                let new_loginStatus = loginStatus;
                setLoginStatus(!new_loginStatus);
                console.log(response.data)
                navigate('/')
            }).catch( error =>{
                if (!error.response){
                    console.log(error)
                }
                else if(error.response.status == 401){
                    alert("incorrect password")
                }else if(error.response.status == 404){
                    alert("User Not Found")
                }else if(error.response.status == 501){
                    alert("server down")
                }
            })
        }
    }

    const handleUsername = (event) =>{
        setUsername(event.target.value);
    }

    const handlePassword = (event) =>{
        setPassword(event.target.value);
    }

    return(
        <>
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
                    <TextField fullWidth margin="normal"
                        value={username}
                        error={usernameError}
                        helperText={usernameError ? usernameErrorStatus : ''}
                        label='username'
                        onChange={handleUsername}
                        InputProps={{style: {fontFamily:'PilsenPlakat'}}}
                        InputLabelProps={{style: {fontFamily:'PilsenPlakat'}}}
                        />

                    <TextField fullWidth margin="normal"
                        value={password}
                        error={passwordError}
                        helperText={passwordError ? passwordErrorStatus : ''}
                        InputProps={{style: {fontFamily:'PilsenPlakat'}}}
                        InputLabelProps={{style: {fontFamily:'PilsenPlakat'}}}
                        label='password'
                        type="password"
                    onChange={handlePassword}/>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                        <Button onClick={handleSubmission}>Login</Button>
                    </Box>
            </Grid>
            <Grid xs/>
            </Grid>

        </>
    )
}

export default Login;

{/* <TextField fullWidth margin="normal"
value={username}
error={usernameError}
helperText={usernameError ? usernameErrorStatus : ''}
label='username'
onChange={handleUsername}
InputProps={{style: {fontFamily:'PilsenPlakat'}}}
InputLabelProps={{style: {fontFamily:'PilsenPlakat'}}}
sx={{width: 300,
mt: 3}}/>

<TextField  margin="normal"
value={password}
error={passwordError}
helperText={passwordError ? passwordErrorStatus : ''}
InputProps={{style: {fontFamily:'PilsenPlakat'}}}
InputLabelProps={{style: {fontFamily:'PilsenPlakat'}}}
label='password'
type="password"
sx={{width: 300,
mt: 3,
fontFamily:'PilsenPlakat'}} 
onChange={handlePassword}/> */}