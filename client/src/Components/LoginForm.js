import axios from 'axios';
import{useState, useContext} from 'react';
import {MyContext} from '../MyContext';
import UserInfoForm from './UserInfoForm';
import CaptainStatusForm from './CaptainStatusForm';
import ParticipationForm from './ParticipationForm';
import ApprovalForm from './ApprovalForm';
import MiscForm from './MiscForm';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2'

const LoginForm = () =>{
    const navigate = useNavigate();

    const { registrationStatus,setRegistrationStatus} = useContext(MyContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [motive, setMotive] = useState('');
    const [wayToContact, setWayToContact] = useState('');
    const [captain, setCaptain] = useState(null);
    const [sobriety, setSobriety] = useState(null);
    const [approval, setApproval] = useState(null);
    const [extraCuricularRole, setExtraCuricularRole] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [formPage, setFormPage] = useState(0)

    const handlePrevious = () =>{
        let new_formPage = formPage;
        setFormPage(new_formPage - 1)
    }

    const HandleSubmission = async() =>{
        const body = {username: username,
            password: password,
            motive: motive, 
            captain: captain, 
            wayToContact: wayToContact,
            sobriety: sobriety, 
            arrival: "noon",
            approval: approval,
            extraCuricularRole: extraCuricularRole,
            additionalNotes: additionalNotes,
        }
        await axios.post(`${process.env.REACT_APP_API_URL}/users/createUser`, body)
        .then(response =>{
            localStorage.setItem('jwt_token', response.data)
            let new_registrationStatus = registrationStatus;
            setRegistrationStatus(!new_registrationStatus);
            navigate('/')
        })
        .catch(err =>{
            console.log(err)
        })
    }


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
                    {formPage == 0 &&(
                    <MyContext.Provider value={{username, setUsername, password, setPassword, formPage, setFormPage}}>
                        <UserInfoForm></UserInfoForm>
                    </MyContext.Provider>
                    )}
                    
                    {formPage == 1 &&(
                    <MyContext.Provider value={{captain, setCaptain, wayToContact, setWayToContact, formPage, setFormPage, handlePrevious}}>
                        <CaptainStatusForm></CaptainStatusForm>
                    </MyContext.Provider>
                    )}

                    {formPage == 2 &&(
                    <MyContext.Provider value = {{motive, setMotive, sobriety, setSobriety, formPage, setFormPage, handlePrevious}}>
                        <ParticipationForm></ParticipationForm>
                    </MyContext.Provider>
                    )}


                    {formPage == 3 &&(
                    <MyContext.Provider value={{approval, setApproval, extraCuricularRole, setExtraCuricularRole, formPage, setFormPage , handlePrevious}}>
                        <ApprovalForm></ApprovalForm>
                    </MyContext.Provider>
                    )}

                    {formPage == 4 &&(
                    <MyContext.Provider value ={{additionalNotes, setAdditionalNotes, handlePrevious, HandleSubmission}}>
                        <MiscForm></MiscForm>
                    </MyContext.Provider>
                    )}
                </Grid>
                <Grid xs/>
            </Grid>
        </>
    )
}

export default LoginForm;