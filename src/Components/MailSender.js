import { Alert, Button, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
function MailSender({to}) {
    const [email, setEmail] = useState(to);
    const [body, setBody] = useState("");
    const [alert, setAlert] = useState(0);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async ()=>{
        setLoading(true);
        fetch(process.env.REACT_APP_BASE_URL + "/user/sendusermail",{
            "method":"POST",
            "headers":{
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body:JSON.stringify({
                "body":body,
                "to":email
            })
        }).then(res=>res.json()).then(data=>{
            setLoading(false);
            setAlert(data.success);
            setMessage(data.message);
        })
        setLoading(false);
    }
  return (
    <Stack gap={4}>
        <TextField label="To" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <textarea  style={{padding:"0.5rem", borderRadius:"0.5rem", border:"0.5px solid gray"}} placeholder='Type your message here! Also Include Your Preferred TIME / DATE / MATTER OF DISCUSSION' rows={10} value={body} onChange={(e)=>{setBody(e.target.value)}}/>
        <Button variant="outlined" sx={{width:"fit-content"}} disabled={loading} endIcon={<SendIcon/>}onClick={handleSubmit}>{loading?"Sending...":"Send"}</Button>
        {alert === 0 ? "" : <Alert severity={alert ? "success" : 'error'}>{message}</Alert>}
    </Stack>
  )
}

export default MailSender