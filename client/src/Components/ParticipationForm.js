import axios from 'axios';
import{useEffect, useState, useContext} from 'react';
import {Box, Grid ,TextField, Select, Radio, MenuItem, InputLabel, FormControl, FormControlLabel, RadioGroup, Button, FormHelperText, Typography} from '@mui/material'
import {MyContext} from '../MyContext';

const ParticipationForm = () =>{

    const {motive, setMotive, sobriety, setSobriety, handlePrevious, formPage, setFormPage} = useContext(MyContext)

    //needs to be pulled into login
    const [sobrietyChoice, setSobrietyChoice] = useState(null);
    
    const [motiveError, setMotiveError] = useState(null)
    const [motiveErrorStatus, setMotiveErrorStatus] = useState('')

    const [sobrietyError, setSobrietyError] = useState(null)
    const [sobrietyErrorStatus, setSobrietyErrorStatus] = useState('')


    const checkMotive = () =>{
        if(motive === '' || motive === undefined){
            setMotiveError(true)
            setMotiveErrorStatus("Please select a motive")
            return false;
        }else{
            return true;
        }
    }

    const checkSobriety = () =>{
        if(sobriety === null || sobriety === undefined){
            setSobrietyError(true)
            setSobrietyErrorStatus("please Select one")
            return false;
        }else{
            setSobrietyError(false)
            setSobrietyErrorStatus("")
            return true;
        }
    }

    const handleMotive = (event) =>{
        setMotive(event.target.value);
    }

    const handleSobriety = (event) =>{
        if(event.target.value === 'yes'){
            setSobriety(true)
        }else{
            setSobriety(false)
        }
        setSobrietyChoice(event.target.value)
    }
    

    const handleNext = () =>{
        if(checkMotive() & checkSobriety()){
            let new_formPage = formPage;
            setFormPage(new_formPage + 1)
        }
    }

    return(
        <>         


            <FormControl fullWidth error={motiveError}>
            <TextField
            value={motive}
            select
            onChange={ handleMotive }
            label = 'Motive'
            InputProps={{style: {fontFamily:'PilsenPlakat'}}}
            InputLabelProps={{style: {fontFamily:'PilsenPlakat'}}}
            sx={{
                mt: 3}} 
            >
                <MenuItem sx = {{fontFamily:'PilsenPlakat'}} value="Participate">Particpate in Beer Olympic Games</MenuItem>
                <MenuItem sx = {{fontFamily:'PilsenPlakat'}} value="Hang Out">Hang out and watch</MenuItem>
            </TextField>
            <FormHelperText >{motiveError ? motiveErrorStatus : ''}</FormHelperText>
            </FormControl>

            <InputLabel sx = {{fontFamily:'PilsenPlakat', mt: 3}} >Sobriety Status</InputLabel>
            <FormControl error ={sobrietyError}>
                <RadioGroup
                    value = {sobrietyChoice}
                    onChange={handleSobriety}>
                    <FormControlLabel value="yes" control={<Radio />} label={<Typography fontFamily={'PilsenPlakat'}>Sober</Typography>} />
                    <FormControlLabel value="No" control={<Radio />} label={<Typography fontFamily={'PilsenPlakat'}>Olympian</Typography>} />                      
                </RadioGroup>
                <FormHelperText>{sobrietyError ? sobrietyErrorStatus : ''}</FormHelperText>
            </FormControl>


                    <Box display="flex" justifyContent="space-between">
                    <Button  sx = {{fontFamily:'PilsenPlakat'}} onClick={handlePrevious}>PREV</Button>
                    <Button   sx = {{fontFamily:'PilsenPlakat'}} onClick={handleNext}>NEXT</Button>
                    </Box>
        </>
    )
}

export default ParticipationForm;
