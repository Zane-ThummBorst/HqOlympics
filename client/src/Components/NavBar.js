import LoginForm from './LoginForm';
import TeamCreationForm from './TeamCreationForm';
import {useState} from 'react'
import Login from './Login';
import TeamPage from './TeamPage';
import TempModal from './TempModal';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import '../assets/fonts/Global.css'
import axios from 'axios'
import Logout from './Logout';
import { IconButton,Button, Toolbar, AppBar, Typography, Box, Menu, MenuItem} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dehaze from '@mui/icons-material/Dehaze'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FAQ from './FAQ'
import Catering from './Catering';


const NavBar = () =>{
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorE2, setAnchorE2] = useState(null);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    
      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose2 = () => {
        setAnchorE2(null);
      };
      const handleMenu2 = (event) => {
        setAnchorE2(event.currentTarget);
      };

    return(
        <>  
                <Box sx={{m: !matches ? 3 : 1}}>
                {/* linear-gradient(0deg, #472700 0%, rgba(253,187,45,1) 100%) */}
                <AppBar sx={{ border:'solid',borderColor:' #120d06', borderWidth:'1px' ,borderRadius: '0.5em', background: '#250001'}}  position='relative'>
                    <Toolbar>

                        <Typography fontFamily={'OldLondon'} color='#fffbe0' variant='h4' component='h2' sx={{flexGrow: 1}}>
                            Beer Olympics
                        </Typography>
                        {!matches ? (
                            <>
                                <Button sx={{ 'color': '#fffbe0', fontFamily: 'PilsenPlakat' }} onClick={() => navigate('/')}>Team Page</Button>
                                <Button sx={{ 'color': '#fffbe0', fontFamily: 'PilsenPlakat' }} onClick={() => navigate('/TeamCreation')}>Team Creation</Button>
                                <Button sx={{ 'color': '#fffbe0', fontFamily: 'PilsenPlakat' }} onClick={() => navigate('/FAQ')}>FAQ/ABOUT</Button>
                                <Button sx={{ 'color': '#fffbe0', fontFamily: 'PilsenPlakat' }} onClick={() => navigate('/Catering')}>Catering</Button>

                            </>
                        ) : (
                            <div>
                                <IconButton  sx={{'color':'#fffbe0'}} onClick={handleMenu2}>
                                    <Dehaze/>
                                </IconButton>
                                <Menu
                                    id="responsive-menu"
                                    anchorEl={anchorE2}
                                    keepMounted
                                    open={Boolean(anchorE2)}
                                    onClose={handleClose2}
                                    sx={{ '& .MuiMenu-paper': { backgroundColor: 'black' } }}
                                >
                                    <MenuItem onClick={() => navigate('/')} sx={{ 'color': '#fffbe0', fontFamily: 'PilsenPlakat' }}>Team Page</MenuItem>
                                    <MenuItem onClick={() => navigate('/TeamCreation')} sx={{ 'color': '#fffbe0', fontFamily: 'PilsenPlakat' }}>Team Creation</MenuItem>
                                    <MenuItem onClick={() => navigate('/FAQ')} sx={{ 'color': '#fffbe0', fontFamily: 'PilsenPlakat' }}>FAQ/ABOUT</MenuItem>
                                    <MenuItem onClick={() => navigate('/Catering')} sx={{ 'color': '#fffbe0', fontFamily: 'PilsenPlakat' }}>Catering</MenuItem>


                                    
                                </Menu>
                            </div>
                        )}
                            <IconButton  sx={{'color':'#fffbe0'}} onClick={handleMenu}><AccountCircleIcon/></IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            sx={
                                { mt: "1px", "& .MuiMenu-paper": 
                                  { backgroundColor: "black", }, 
                                }}
                        >
                            <MenuItem  sx={{'color':'#fffbe0', fontFamily: 'PilsenPlakat'}} onClick={() => {navigate('/Register')}}>Register</MenuItem>
                            {!localStorage.getItem('jwt_token') &&  <MenuItem  sx={{'color':'#fffbe0', fontFamily: 'PilsenPlakat'}} onClick={() => {navigate('/Login')}}>Login</MenuItem>}
                            {localStorage.getItem('jwt_token') && <Logout></Logout> }
                        </Menu>
                    </Toolbar>
                </AppBar>
                </Box>

                <Routes>
                <Route index element={<TeamPage/>}/>
                <Route path="Register" element={<LoginForm/>}/>
                <Route path = "TeamCreation" element={<TeamCreationForm/>}/>
                <Route path = "Login" element={<Login/>}/>
                <Route path = "FAQ" element={<FAQ/>}/>
                <Route path = "Catering" element={<Catering/>}/>

                </Routes>
        </>
    )
}

export default NavBar;