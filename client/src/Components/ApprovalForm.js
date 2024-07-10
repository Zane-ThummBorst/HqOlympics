import axios from 'axios';
import{useEffect, useState, useContext} from 'react';
import {Box, TextField, Typography, Radio, MenuItem, InputLabel, FormControl, FormHelperText, FormControlLabel, RadioGroup, Button} from '@mui/material'
import {MyContext} from '../MyContext';

const ApprovalForm = () =>{

    const {approval, setApproval, extraCuricularRole, setExtraCuricularRole, handlePrevious, formPage, setFormPage} = useContext(MyContext)
    const [approvalChoice, setApprovalChoice] = useState(null);

    const [approvalError, setApprovalError] = useState(null)
    const [approvalErrorStatus, setApprovalErrorStatus] = useState('')

    const [extraCuricularRoleError, setExtraCuricularRoleError] = useState(null)
    const [extraCuricularRoleErrorStatus, setExtraCuricularRoleErrorStatus] = useState('')

    const checkApproval = () =>{
        if(approval === null || approval === undefined){
            setApprovalError(true);
            setApprovalErrorStatus('Please select one')
            return false
        }else{
            setApprovalError(false)
            setApprovalErrorStatus('')
            return true
        }
    }

    const CheckExtraCuricularRole = () =>{
        if (extraCuricularRole === '' || extraCuricularRole == undefined){
            setExtraCuricularRoleError(true)
            setExtraCuricularRoleErrorStatus('please select one')
            return false
        }else{
            setExtraCuricularRoleError(false)
            setExtraCuricularRoleErrorStatus('')
            return true
        }
    }
    
    const handleNext = () =>{
        if(checkApproval() & CheckExtraCuricularRole()){
            let new_formPage = formPage;
            setFormPage(new_formPage + 1)
        }
    }
    
    const handleApproval = (event) =>{
        if(event.target.value === 'yes'){
            setApproval(true)
        }else{
            setApproval(false)
        }
        setApprovalChoice(event.target.value)
    }


    const handleRole = (event) =>{
        setExtraCuricularRole(event.target.value);
    }

    
    return(
        <>                    
            <InputLabel sx = {{fontFamily:'PilsenPlakat'}} >Recording Approval</InputLabel>
            <FormControl error={approvalError}>
                <RadioGroup
                value = {approvalChoice}
                onChange={handleApproval}>
                    <FormControlLabel value="yes" control={<Radio />} label={<Typography fontFamily={'PilsenPlakat'}>Yes</Typography>} />
                    <FormControlLabel value="No" control={<Radio />} label={<Typography fontFamily={'PilsenPlakat'}>No</Typography>} />                     
                </RadioGroup>
                <FormHelperText>{approvalError ? approvalErrorStatus : ''}</FormHelperText>
            </FormControl>

            <FormControl fullWidth error={extraCuricularRoleError}>
            <TextField
            select
            value={extraCuricularRole}
            onChange={ handleRole }
            label='Want a role at the party?'
            InputProps={{style: {fontFamily:'PilsenPlakat'}}}
            InputLabelProps={{style: {fontFamily:'PilsenPlakat'}}}
            sx={{
                mt: 3}} 
            >
                <MenuItem value="Ref">Referee</MenuItem>
                <MenuItem value="Film">Filming</MenuItem>
                <MenuItem value="Beer Drinker">Beer Drinker</MenuItem>
                <MenuItem value="Nothing">Nothing</MenuItem>
            </TextField>
            <FormHelperText>{extraCuricularRoleError ? extraCuricularRoleErrorStatus : ''}</FormHelperText>
            </FormControl>
            <InputLabel sx = {{fontSize:'12px', mb: 3, fontFamily:'PilsenPlakat', whiteSpace: 'pre-wrap'}} > *Can Have a role AND participate in games!</InputLabel>
            <Box display="flex" justifyContent="space-between">
                <Button sx = {{fontFamily:'PilsenPlakat'}} onClick={handlePrevious}>PREV</Button>
                <Button sx = {{fontFamily:'PilsenPlakat'}} onClick={handleNext}>NEXT</Button>
            </Box>
        </>
    )
}

export default ApprovalForm;