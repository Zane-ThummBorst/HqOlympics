import axios from 'axios';
import{useEffect, useState, useContext} from 'react';
import {Box, Typography, TextField, Select, Radio, MenuItem, InputLabel, FormControl, FormControlLabel, RadioGroup, Button} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import {MyContext} from '../MyContext';
import { useNavigate } from "react-router-dom";
import '../assets/fonts/Global.css'

const FAQ = () =>{
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
                <Box sx={{mt:3}}>
                    <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                        What is this thing?
                    </Typography>
                    <Typography color={'grey'} fontFamily={'PilsenPlakat'}  variant='h6' component='p'>
                        In Commemoration of The 2024 Olympics, HQ has decided it'd be best to host our own Olympic style event complete with its own set of games revoloving around booze.
                    </Typography>
                </Box>

                <Box sx={{mt:3}}>
                    <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                        When is this thing?
                    </Typography>
                    <Typography color={'grey'} fontFamily={'PilsenPlakat'} variant='h6' component='p'>
                        August 10th. In the event of weater, our rain Day is August 23rd.
                    </Typography>
                </Box>


                <Box sx={{mt:3}}>
                    <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                        Can I come and participate in games even if I don't want to drink?
                    </Typography>
                    <Typography color={'grey'} fontFamily={'PilsenPlakat'}  variant='h6' component='p'>
                       You sure can!
                    </Typography>
                </Box>


                <Box sx={{mt:3}}>
                    <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                        What if I don't have a team, but want to be a part of the games?
                    </Typography>
                    <Typography color={'grey'} fontFamily={'PilsenPlakat'}  variant='h6' component='p'>
                        We'll squeeze you in somewhere.
                    </Typography>
                </Box>

                <Box sx={{mt:3}}>
                    <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                        Food?
                    </Typography>
                    <Typography color={'grey'} fontFamily={'PilsenPlakat'} variant='h6' component='p'>
                        There will be food.
                    </Typography>
                </Box>
            </Grid>
            <Grid xs/>
        </Grid>
        </>
    )
}

export default FAQ;