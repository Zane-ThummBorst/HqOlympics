import{ useState, useContext} from 'react';
import {Box, TextField, MenuItem, FormControl, FormHelperText, Button} from '@mui/material'
import {MyContext} from '../MyContext';

const CaptainStatusForm = () =>{

    const {captain, setCaptain, wayToContact, setWayToContact, formPage, setFormPage, handlePrevious} = useContext(MyContext)
    const [status, setStatus] = useState('');

    const [statusError, setStatusError] = useState(null)
    const [statusErrorStatus, setstatusErrorStatus] = useState('')

    const [wayToContactError, setWayToContactError] = useState(null)
    const [wayToContactErrorStatus, setWayToContactErrorStatus] = useState('') 

    const checkStatus = () =>{
        if(status === '' || status === undefined){
            setStatusError(true)
            setstatusErrorStatus("please select one")
            return false
        }else{
            setStatusError(false)
            setstatusErrorStatus("")
            return true 
        }
    }

    const checkWayToContact = () =>{
        let contactRegex = /^[a-zA-Z0-9._:%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^\d{10}$/;
        if (!contactRegex.test(wayToContact) && captain){
            setWayToContactError(true)
            setWayToContactErrorStatus('please enter a valid email or phone Number')
            return false
        }else{
            setWayToContactError(false)
            setWayToContactErrorStatus('')
            return true
        }
    }

    const handleNext = () =>{
        if(checkStatus() & checkWayToContact()){
            let new_formPage = formPage;
            setFormPage(new_formPage + 1)
        }
    }
    
    const handleStatus= (event) =>{
        if (event.target.value === "Captain"){
            setCaptain(true)
        }else{
            setCaptain(false)
        }
        setStatus(event.target.value);
    }

    const handleContact = (event) =>{
        setWayToContact(event.target.value);
    }
    return(
        <>    
            <FormControl fullWidth error={statusError}>                
                <TextField
                helperText
                select
                label='Captain Status'
                value={status}
                onChange={ handleStatus }
                InputProps={{style: {fontFamily:'PilsenPlakat'}}}
                InputLabelProps={{style: {fontFamily:'PilsenPlakat'}}}
                sx={{
                    mt: 3}} 
                >
                    <MenuItem sx = {{fontFamily:'PilsenPlakat'}} value="Captain">Captain</MenuItem>
                    <MenuItem sx = {{fontFamily:'PilsenPlakat'}} value="Apart of Team">A Part of a Team</MenuItem>
                    <MenuItem sx = {{fontFamily:'PilsenPlakat'}} value="Solo">Solo</MenuItem>
                </TextField>
                <FormHelperText>{statusError ? statusErrorStatus : ''}</FormHelperText>
            </FormControl>

            <TextField
            fullWidth
            margin="normal"
                label='Contact Info (Only required for Captains)'
            value={wayToContact}
            error={wayToContactError}
            helperText={wayToContactError ? wayToContactErrorStatus : ''}
            onChange={handleContact}
            InputProps={{style: {fontFamily:'PilsenPlakat'}}}
            InputLabelProps={{style: {fontFamily:'PilsenPlakat'}}}
            sx={{
                mt: 3}} />
            <Box display="flex" justifyContent="space-between">
                <Button sx = {{fontFamily:'PilsenPlakat'}} onClick={handlePrevious}>PREV</Button>
                <Button sx = {{fontFamily:'PilsenPlakat'}} onClick={handleNext}>NEXT</Button>
            </Box>
        </>
    )
}

export default CaptainStatusForm;