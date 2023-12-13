import { Alert, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function NewPassword() {
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [alert, setAlert] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const setPassword = async(req, res)=>{
    if(!pass) {
      setAlert(false);
      setMessage("Password should not be empty");
      return;
    }
    if(pass!==cpass) {
      setAlert(false);
      setMessage("Passwords Should match");
      return;
    }
    setLoading(true);
    fetch(process.env.REACT_APP_BASE_URL + "/newpassword/"+params.token, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        "password":pass
      })
    }).then(res=>res.json()).then(data=>{
      setLoading(false);
      setAlert(data.success);
      setMessage(data.message);
      setTimeout(()=>{navigate('/')})
    })
  }
  return (
    <Stack sx={{minHeight:"100vh", minWidth:"100vw"}} gap={4} alignItems="center" justifyContent="center">
      <img src="https://media1.giphy.com/media/3ohhwwjwWWdcV4Jezm/giphy.gif" height="10%" width="10%" alt=""/>
      <Typography variant="h2"> Set Your New Password.</Typography>
      <TextField type="password" label="Password" sx={{width:"25%"}}value={pass} onChange={(e)=>{setPass(e.target.value)}} required/>
      <TextField type="password" label="Confirm Password" sx={{width:"25%"}}value={cpass} onChange={(e)=>{setCpass(e.target.value)}} required/>
      <Button disabled={loading} onClick={setPassword} variant="outlined">Change Password</Button>
      {alert===0?"":<Alert action={alert===false?<Button color={alert?"success":'error'}>{alert?"TRY AGAIN LATER":""}</Button>:''}
     severity={alert?"success":'error'}>{message}</Alert>}
      <Stack className="footer">
        <Typography p={2} variant="subtitle1" sx={{ color: "white", fontFamily: "Poppins", fontweight: "600", letterSpacing: "2px", textAlign:'center'}}>Made with ❤️ by TechSeaPioneers</Typography>
      </Stack>
    </Stack>
  )
}

export default NewPassword