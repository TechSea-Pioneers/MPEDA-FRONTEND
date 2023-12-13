
import { Stack, Typography, useMediaQuery } from '@mui/material';
import './App.css';
import ChatBox from './Components/ChatBox';
import Home from './Components/Home';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const matches = useMediaQuery('(min-width:600px)')
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate('/dashboard')
    }
  })
  return (
    <Stack className="App">
      <Stack width="100%" direction={matches ? "row" : "column"} justifyContent="center" className="App-header" alignItems="center">
        <ChatBox />
        <Home />
      </Stack>
      <Stack className="footer">
        <Typography p={2} variant="subtitle1" sx={{ color: "white", fontFamily: "Poppins", fontweight: "600", letterSpacing: "2px" }}>Made with ❤️ by TechSeaPioneers</Typography>
      </Stack>
    </Stack>
  );
}

export default App;
