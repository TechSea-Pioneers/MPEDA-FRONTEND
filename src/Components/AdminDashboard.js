import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Conversation from './Conversation';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
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
      setAlert(true);
      setMessage("File Uploaded Successfully");
      setLoading(false);
    } catch (error) {
      console.log("File upload failed:", error);

      setLoading(false);
    }
  };
  const pdfs = ['Web_Details.pdf','SeaFood_Scraping.pdf','Reference sites for database for the User.pdf','Question often ask in the MPEDA.pdf','PRIME_2.pdf','MEPDA_EXPORTER_1.pdf','Indian_Fisheries.pdf','Indian_Fisheries_General.pdf','Exporters.pdf','About_MPEDA_Data.pdf']
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
            {apitype==="openai" && <Stack width="100%" direction="row" justifyContent="center" alignItems="center" gap={4}>
              <Typography sx={{ width: '50%' }}>Enter your API KEY</Typography>
              <TextField required sx={{ width: "60%" }} label="API KEY" />
            </Stack>}
            {apitype==="llm" && <Stack width="100%" direction="row" justifyContent="center" alignItems="center" gap={4}>
              <Typography sx={{ width: '50%' }}>Custom LLM API</Typography>
              <TextField required sx={{ width: "60%" }} label="LLM API" />
            </Stack>}
          </Stack>
          <Conversation />
        </Stack>
        <Stack gap={3} alignItems="center" justifyContent="center" width="100%">
            <Typography sx={{fontWeight:800}} variant="h3">Admins Only</Typography>
          <Stack width="100%" direction="row" alignItems="center" justifyContent="center" gap={4}>
            <Button component="label" disabled={loading} variant="contained" startIcon={<CloudUploadIcon />} onClick={handleFileUpload}>
              {loading?"Loading":"Upload file"}
            </Button>
            <input ref={fileInputRef} type="file"/>
          </Stack>
          <Stack width="100%" sx={{ border: "2px solid black", borderRadius: "1rem", height: "65vh" }}>
            <Stack flexWrap="wrap" p={4} direction="row" gap={4} sx={{overflow:"scroll"}}>
              {pdfs.map((element)=>{
                return (
                  <Stack sx={{border:"2px solid black", borderRadius:"1.2rem", padding:"1.2rem"}}>
                    <PictureAsPdfIcon sx={{fontSize:"6rem"}}/>
                    <Stack  class="pdf-block" sx={{fontSize:"0.8rem"}}>
                      {element}
                      </Stack>
                  </Stack>
                )
              })}
            </Stack>
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