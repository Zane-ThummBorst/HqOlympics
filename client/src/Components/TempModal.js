import{useContext} from 'react';
import {Modal, Typography, Box, TextField, Button} from '@mui/material'
import {MyContext} from '../MyContext';


const TempModal = () =>{
    const {userTeamCode, setUserTeamCode, open, setOpen, joinTeam, codeError, codeErrorStatus } = useContext(MyContext);

    const handleUserTeamCode = (event) =>{
        setUserTeamCode(event.target.value)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: '1em',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        };


    const handleClose = () =>{
        setOpen(false)
    }

    return (
        <>
            <Modal
            open ={open}
            onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField
                        value ={userTeamCode}
                        label='Team Code'
                        InputProps={{
                            style: { textAlign: 'center', fontFamily: 'PilsenPlakat' },
                        }}
                        InputLabelProps={{
                            style: { textAlign: 'center', fontFamily: 'PilsenPlakat' },
                            shrink: true,
                        }}
                        error={codeError}
                        helperText={codeError ? codeErrorStatus : ''}
                        onChange={handleUserTeamCode}>

                        </TextField>
                        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', }}>
                            <Button onClick={joinTeam}>Submit</Button>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default TempModal;