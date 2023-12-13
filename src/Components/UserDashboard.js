import React, { useEffect } from 'react'
import { Box, Button, Modal, Stack, Typography, useMediaQuery } from '@mui/material';
import ChatBox from './ChatBox';
import LogoutIcon from '@mui/icons-material/Logout';
import MpedaLogo from './svgs/MpedaLogo';
import { useNavigate } from 'react-router-dom';
import ListofExporters from './ListofExporters';
function UserDashboard() {
  const matches = useMediaQuery('(min-width:600px)')
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const style = {
    position: 'absolute',
    overflow:"scroll",
    height:"90vh",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90vw",
    bgcolor: 'background.paper',
    borderRadius:"1.2rem",
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/')
    }
  }, [navigate])
  return (
    <Stack className="App">
      <Stack width="100%" direction={matches ? "row" : "column"} justifyContent="center" className="App-header" alignItems="center" gap={8}>
        <ChatBox />
        <Stack width="fit-content" gap={4} alignItems="left" justifyContent="flex-start" p={2}>
          <Stack direction="row" width="100%" alignItems="center" justifyContent="center">
            <MpedaLogo />
            <Typography variant="h3">Shrimp Talker</Typography>
          </Stack>
          <Button size="large" variant="contained" onClick={handleOpen}>
            List of Exporters
          </Button>
          <Button size="large" endIcon={<LogoutIcon />} onClick={() => { localStorage.clear(); navigate('/') }} variant="contained">
            Logout
          </Button>
        </Stack>
        <Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ListofExporters/>
        </Box>
      </Modal>
        </Stack>
      </Stack>
      <Stack className="footer">
        <Typography p={2} variant="subtitle1" sx={{ color: "white", fontFamily: "Poppins", fontweight: "600", letterSpacing: "2px" }}>Made with ❤️ by TechSeaPioneers</Typography>
      </Stack>
    </Stack>
  )
}

export default UserDashboard