import { Box, Button, Modal, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import LoginIcon from '@mui/icons-material/Login';
import MpedaLogo from './svgs/MpedaLogo';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
function Home() {
  const matches = useMediaQuery('(min-width:600px)')
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleClose = () => {
    setOpen(false);
  }
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose2 = () => {
    setOpen2(false);
  }
  const handleOpen2 = () => {
    setOpen2(true);
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: matches ? '30%' : '80%',
    bgcolor: 'background.paper',
    filter: 'blur("10px")',
    border: '2px solid transparent',
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Stack width="fit-content" justifyContent="center" alignItems="center" gap={4}>
      <MpedaLogo/>
      <Typography variant={matches ? "h1" : "h4"} mb={2} sx={{ fontFamily: "Montserrat", fontWeight: "800" }}>ShrimpTalker</Typography>
      <Stack direction="row" gap={2} justifyContent="center" alignItems="center">
        <Button variant="contained" onClick={handleOpen} endIcon={<LoginIcon/>} size="large">Login</Button>
        <Button variant="contained" onClick={handleOpen2} size="large" endIcon={<PersonAddIcon/>}>Signup</Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LoginForm />
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SignupForm />
        </Box>
      </Modal>
    </Stack>
  )
}

export default Home