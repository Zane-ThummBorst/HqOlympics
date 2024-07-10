import axios from 'axios';
import{useEffect, useState, useContext} from 'react';
import {Box, TextField, Select, Autocomplete, Button} from '@mui/material'
import {MyContext} from '../MyContext';
import countries from './CountryData';
import { useNavigate } from "react-router-dom";
import ModalCode from './ModalCode';
import Grid from '@mui/material/Unstable_Grid2'

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
                  <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                  <img src={'%PUBLIC_URL%/branVenmo.jpg'}/>
                  </Box>
                  </Grid>
                  <Grid xs/>
            </Grid>
        </>
    )
}

export default Catering