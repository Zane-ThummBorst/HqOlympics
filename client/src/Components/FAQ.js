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
                <Typography fontFamily={'PilsenPlakat'} variant='h4' component='h6'>
                    How did i Get here?
                </Typography>
                <Typography fontFamily={'PilsenPlakat'} variant='p' component='h6'>
                    How did i Get here?
                </Typography>
            </Grid>
            <Grid xs/>
        </Grid>
        </>
    )
}

export default FAQ;