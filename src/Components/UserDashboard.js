import React, { useEffect } from 'react'
import { Button, Stack, Typography, useMediaQuery } from '@mui/material';
import ChatBox from './ChatBox';
import LogoutIcon from '@mui/icons-material/Logout';
import MpedaLogo from './svgs/MpedaLogo';
import { useNavigate } from 'react-router-dom';
function UserDashboard() {
  const matches = useMediaQuery('(min-width:600px)')
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate('/')
    }
  },[navigate])
  return (
<Stack className="App">
      <Stack width="100%" direction={matches?"row":"column"} justifyContent="center" className="App-header" alignItems="center" gap={8}>
        <ChatBox />
        <Stack width="fit-content" gap={2} alignItems="left" justifyContent="flex-start" p={2}>
          <Stack direction="row" width="100%" alignItems="center" justifyContent="center">
            <MpedaLogo/>
            <Typography variant="h3">Shrimp Talker</Typography>
          </Stack>
          <Button variant="contained">
            Schedule a meeting with exporters
          </Button>
          <Button variant="contained">
            List of Exporters
          </Button>
          <Button endIcon={<LogoutIcon/>}onClick={()=>{localStorage.clear();navigate('/')}}variant="contained">
            Logout
          </Button>
        </Stack>
        <Stack>
      </Stack>
      </Stack>
      <Stack className="footer">
      <Typography p={2} variant="subtitle1" sx={{color:"white",fontFamily:"Poppins",fontweight:"600", letterSpacing:"2px"}}>Made with ❤️ by TechSeaPioneers</Typography>
      </Stack>
    </Stack>
  )
}

export default UserDashboard