import axios from 'axios';
import{useEffect, useState, useContext} from 'react';
import {Modal, Typography, Box, TextField, Select, Radio, MenuItem, InputLabel, FormControl, FormControlLabel, RadioGroup, Button} from '@mui/material'
import {MyContext} from '../MyContext';
import { useNavigate } from "react-router-dom";


const ModalCode = () =>{
    const { teamCode, open, setOpen } = useContext(MyContext);
    const navigate = useNavigate();



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: '1em',
        textAlign: 'center',
        p: 4,
      };


    const handleClose = () =>{
        setOpen(false)
        navigate('/')
    }

    return (
        <>
            <Modal
            open ={open}
            onClose={() => {}}
            >
            <Box sx={style}>
                <Typography fontWeight={'bold'} fontFamily={'PilsenPlakat'} id="modal-modal-title" variant="h4" component="h2">
                    SAVE THIS!
                </Typography>
                <Typography sx={{mt: 3}} fontFamily={'PilsenPlakat'} id="modal-modal-title" variant="h6" component="h3">
                    Your Team Code: {teamCode}
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', }}>
                    <Button sx={{fontFamily : 'PilsenPlakat'}} onClick={handleClose}>Confirm</Button>
                </Box>
            </Box>
            </Modal>
        </>
    )
}

export default ModalCode;