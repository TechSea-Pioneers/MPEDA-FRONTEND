import { Alert, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function RecoveryPage() {
    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState(0);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const recoverPassword = async ()=>{
        setLoading(true);
        fetch(process.env.REACT_APP_BASE_URL + "/user/recovery", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "email":email
            })}).then(res=>res.json()).then(data=>{
                setAlert(data.success);
                setMessage(data.message);
                setLoading(false);
            })
        setLoading(false);
    }

  return (
    <Stack gap={4}>
        <Typography variant="h5" sx={{fontFamily:"Montserrat"}}>
            Provide your Email Address
        </Typography>
        <TextField label="Email Address" required autoFocus value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        {alert===0?"":<Alert action={alert===false?<Button color={alert?"success":'error'}>{alert?"RESEND MAIL":""}</Button>:''}
     severity={alert?"success":'error'}>{message}</Alert>}
     <Button disabled={loading} onClick={recoverPassword} variant="contained">Next</Button>
    </Stack>
  )
}

export default RecoveryPage