import axios from 'axios';
import{useEffect, useState, useContext} from 'react';
import {Box, TextField, Select, Radio, MenuItem, InputLabel, FormControl, FormControlLabel, RadioGroup, Button} from '@mui/material'
import {MyContext} from '../MyContext';

const MiscForm = () =>{

    const {additionalNotes, setAdditionalNotes, handlePrevious, HandleSubmission} = useContext(MyContext)

    

    const handleAdditionalNotes = (event) =>{
        setAdditionalNotes(event.target.value)
    }
    
    return(
        <>
             <InputLabel sx = {{fontFamily:'PilsenPlakat'}}>Accomodations? Food Allergies? Etc?</InputLabel>                
            <TextField
            fullWidth
            sx={{mt:3}}
            multiline
            InputProps={{style: {fontFamily:'PilsenPlakat'}}}
            InputLabelProps={{style: {fontFamily:'PilsenPlakat'}}}
            onChange={handleAdditionalNotes} 
            label="additonal Notes Section"></TextField>
            <Box sx={{mt: 3}} display="flex" justifyContent="space-between">
                <Button sx = {{fontFamily:'PilsenPlakat'}} onClick={handlePrevious}>PREV</Button>
                <Button sx = {{fontFamily:'PilsenPlakat'}} onClick={HandleSubmission}>SUBMIT</Button>
            </Box>
        </>
    )
}

export default MiscForm;