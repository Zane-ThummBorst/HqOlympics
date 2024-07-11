import axios from 'axios';
import{useEffect, useState, useContext} from 'react';
import {Box, TextField, Select, Autocomplete, Button, Typography} from '@mui/material'
import {MyContext} from '../MyContext';
import countries from './CountryData';
import { useNavigate } from "react-router-dom";
import ModalCode from './ModalCode';
import Grid from '@mui/material/Unstable_Grid2'
import branVenmo from '../assets/images/branVenmo.jpg'

const Catering = () =>{
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
                <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                        Want Grub?
                </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                    <img src={branVenmo} style={{width: '300px', height: '300px', borderRadius: '1em'}}/>
                  </Box>
                  <Box sx={{mt:3}}>
                    <Typography color={'grey'} fontFamily={'PilsenPlakat'} variant='h6' component='p'>
                       *$5.00 for Beer
                    </Typography>
                    <Typography color={'grey'} fontFamily={'PilsenPlakat'} variant='h6' component='p'>
                       *$5.00 for Pizza
                    </Typography>
                    <Typography color={'grey'} fontFamily={'PilsenPlakat'} variant='h6' component='p'>
                       *$Feel free for BYO!
                    </Typography>
                </Box>
                  </Grid>
                  <Grid xs/>
            </Grid>
        </>
    )
}

export default Catering