import { Alert, Button, CircularProgress, Link, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(0);
  const [message,setMessage] = useState("");
  const navigate = useNavigate()
  const handleSubmit = ()=>{
    setLoading(true);
    fetch(process.env.REACT_APP_BASE_URL+'/user/login',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        "email":email,
        "password":password
      })
    }).then(res=>res.json()).then(data=>{
      console.log(data);
      setLoading(false)
      setAlert(data.success);
      setMessage(data.message);
      localStorage.setItem("token",data.token)
      navigate("/dashboard")
    })
  }
  const resendmail = ()=>{
    setLoading(true);
    fetch(process.env.REACT_APP_BASE_URL+'/user/resendmail',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        "email":email
      })
    }).then(res=>res.json()).then(data=>{
      console.log(data);
      setLoading(false)
      setAlert(data.success);
      setMessage(data.message);
      if(data.success==='true'){
        localStorage.setItem("token", data["token"])
        navigate('/dashboard')
        return
      }
      return;
    })
  }
  return (
    <Stack gap={2}>
    <Stack gap={4} alignItems="center" justifyContent="center">
        <Typography variant="h4" >ShrimpTalker1.0</Typography>
        <TextField value={email} onChange={(e)=>{setEmail(e.target.value)}} sx={{width:"100%"}} required type="email" label="Email" name="email" />
        <TextField  value={password} onChange={(e)=>setPassword(e.target.value)} sx={{width:"100%"}} required type="password" label="Password"/>
    </Stack>
    {alert===0?"":<Alert action={alert===false?<Button color={alert?"success":'error'} onClick={resendmail}>{alert?"RESEND MAIL":""}</Button>:''}
     severity={alert?"success":'error'}>{message}</Alert>}
    <Button onClick={handleSubmit} disabled={loading} variant="contained" startIcon={loading?<CircularProgress size={30} thickness={8}/>:""}>Login</Button>
    <Link onClick={()=>{}}>Forgot Password?</Link>
    </Stack>
  )
}

export default LoginForm