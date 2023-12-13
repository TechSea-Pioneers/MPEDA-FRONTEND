import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery } from '@mui/material';
import ChatBox from './ChatBox';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function AdminDashboard() {
  const matches = useMediaQuery('(min-width:600px)')
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(0);
  const [message, setMessage] = useState("");
  const [apitype, setApitype] = useState('openai');
  // const [apikey, setApikey] = useState("")
  // const [file, setFile] = useState();
  const apiurl = process.env.REACT_APP_API_URL 
  const handleApitype = (event, api) => {
    setApitype(api);
  };
  const handleFileUpload = async () => {
    setLoading(true)
    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);
    try {
      const response = await fetch(apiurl + "/uploadfile", {
        "method":"POST",
        body:formData
      });
      console.log("File uploaded:", response.data);
      setLoading(false);
    } catch (error) {
      console.log("File upload failed:", error);
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/')
    }
  }, [navigate])
  return (
    <Stack className="App" gap={2} width="100%">
      <Stack width="100%" direction={matches ? "row" : "column"} justifyContent="center" className="App-header" alignItems="center" gap={2}>
        <Stack width="100%" alignItems="center" justifyContent="center" gap={2} p={4}>
          <Stack width="100%" gap={2} justifyContent='center' alignItems="center">
            <Stack width="100%" direction="row" justifyContent="center" alignItems="center" gap={4}>
              <Typography sx={{ width: '52%' }}>Select Your API Type</Typography>
              <ToggleButtonGroup sx={{ width: "62%" }}
                value={apitype}
                exclusive
                onChange={handleApitype}
                aria-label="api type"
              >
                <ToggleButton value="openai" aria-label="openai type">
                  OPEN AI
                </ToggleButton>
                <ToggleButton value="llm" aria-label="llm type">
                  LLM
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <Stack width="100%" direction="row" justifyContent="center" alignItems="center" gap={4}>
              <Typography sx={{ width: '50%' }}>Enter your API KEY</Typography>
              <TextField sx={{ width: "60%" }} label="API KEY" />
            </Stack>
            <Stack width="100%" direction="row" justifyContent="center" alignItems="center" gap={4}>
              <Typography sx={{ width: '50%' }}>Custom LLM API</Typography>
              <TextField sx={{ width: "60%" }} label="LLM API" />
            </Stack>
          </Stack>
          <ChatBox />
        </Stack>
        <Stack gap={3} alignItems="center" justifyContent="center" width="100%">
            <Typography sx={{fontWeight:800}} variant="h3">Admins Only</Typography>
          <Stack width="100%" direction="row">
            <Button component="label" disabled={loading} variant="contained" startIcon={<CloudUploadIcon />} onClick={handleFileUpload}>
              {loading?"Loading":"Upload file"}
            </Button>
            <input ref={fileInputRef} type="file"/>
          </Stack>
          <Stack width="100%" sx={{ border: "2px solid black", borderRadius: "1rem", height: "50vh" }}>
            <Typography sx={{ textAlign: "left" }} p={4}>PDF Files</Typography>
          </Stack>
        </Stack>
        {alert === 0 ? "" : <Alert severity={alert ? "success" : 'error'}>{message}</Alert>}
        <Stack>
        </Stack>
        
      </Stack>
      <Stack className="footer">
        <Typography p={2} variant="subtitle1" sx={{ color: "white", fontFamily: "Poppins", fontweight: "600", letterSpacing: "2px" }}>Made with ❤️ by TechSeaPioneers</Typography>
      </Stack>
    </Stack>
  )
}

export default AdminDashboard