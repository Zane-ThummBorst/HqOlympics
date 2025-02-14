
import {Box, Typography} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
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
                }}>
                    <Box sx={{mt:3}}>
                        <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                            What is this thing?
                        </Typography>
                        <Typography color={'grey'} fontFamily={'PilsenPlakat'}  variant='h6' component='p'>
                            In commemoration of The 2024 Olympics, HQ has decided it'd be best to host our own Olympic style event complete with its own set of games!
                        </Typography>
                    </Box>

                    <Box sx={{mt:3}}>
                        <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                            Where is this thing?
                        </Typography>
                        <Typography color={'grey'} fontFamily={'PilsenPlakat'}  variant='h6' component='p'>
                            620 Bloomfield Street apt. 1 Hoboken, NJ
                        </Typography>
                    </Box>

                    <Box sx={{mt:3}}>
                        <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                            When is this thing?
                        </Typography>
                        <Typography color={'grey'} fontFamily={'PilsenPlakat'} variant='h6' component='p'>
                            August 10th at 2:00 PM EST. In the event of weather, our rain date is August 17th.
                        </Typography>
                    </Box>


                    <Box sx={{mt:3}}>
                        <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                            Can I come and participate in games even if I registered a certain way?
                        </Typography>
                        <Typography color={'grey'} fontFamily={'PilsenPlakat'}  variant='h6' component='p'>
                            The form is there to get an idea of what we need for the party. Anyone can participate in games!
                        </Typography>
                    </Box>

                    <Box sx={{mt:3}}>
                        <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                            How big are teams suppose to be?
                        </Typography>
                        <Typography color={'grey'} fontFamily={'PilsenPlakat'}  variant='h6' component='p'>
                            Teams can be anywhere between 4-6 people, if you can't hit that margin we will most likely find a solo to join your team.
                        </Typography>
                    </Box>

                    <Box sx={{mt:3}}>
                        <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                            What if I don't have a team, but want to be a part of the games?
                        </Typography>
                        <Typography color={'grey'} fontFamily={'PilsenPlakat'}  variant='h6' component='p'>
                            We'll squeeze you in some team somewhere.
                        </Typography>
                    </Box>

                    <Box sx={{mt:3}}>
                        <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                            What if I just want to come and not play games?
                        </Typography>
                        <Typography color={'grey'} fontFamily={'PilsenPlakat'}  variant='h6' component='p'>
                            That's all Good! 
                        </Typography>
                    </Box>


                    <Box sx={{mt:3}}>
                        <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                            Food?
                        </Typography>
                        <Typography color={'grey'} fontFamily={'PilsenPlakat'} variant='h6' component='p'>
                            Refer to catering page.
                        </Typography>
                    </Box>

                    <Box sx={{mt:3}}>
                        <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                            What if I have questions or want to reach out about something?
                        </Typography>
                        <Typography color={'grey'} fontFamily={'PilsenPlakat'} variant='h6' component='p'>
                            Feel free to shoot us anything on your mind at zane58989@gmail.com
                        </Typography>
                    </Box>

                    <Box sx={{mt:3}}>
                        <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                            Why can't I create a team?
                        </Typography>
                        <Typography color={'grey'} fontFamily={'PilsenPlakat'} variant='h6' component='p'>
                            There are a few reasons for why you may not be able to create a team. Only captains can create teams and cannot join teams. Each captain can create one team.
                        </Typography>
                    </Box>

                    <Box sx={{mt:3}}>
                        <Typography fontFamily={'PilsenPlakat'} variant='h5' component='h6'>
                            Why can't I join a team
                        </Typography>
                        <Typography color={'grey'} fontFamily={'PilsenPlakat'} variant='h6' component='p'>
                            There are a few reasons why you might not be able to join a team. only non captains can join teams, and you must be signed in to join a team. You can only be a part of one team.
                        </Typography>
                    </Box>
                </Grid>
            <Grid xs/>
        </Grid>
        </>
    )
}

export default FAQ;