import { Alert, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
function SignupForm() {
    const [alert, setAlert] = useState(0);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        "name":"",
        "email":"",
        "phone":"",
        'cc':"",
        "password":"",
        "cpassword":""
    });
    const [name, setName]=  useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [phone, setPhone] = useState("");
    const [cc, setCc] = useState("91");
    const handleSubmit = () => {
        if (!name) {
            setError((prev) => { return { ...prev, "name": "Name Should not be Empty" } })
            return;
        }else{
            setError((prev) => { return { ...prev, "Name": 0 } })
        }
        if (!email) {
            setError((prev) => { return { ...prev, "email": "Email Should not be Empty" } })
            return;
        }else{
            setError((prev) => { return { ...prev, "email": 0 } })
        }
        if (!cc) {
            setError((prev) => { return { ...prev, "cc": "Country Code Should not be Empty" } })
            return;
        }else{
            setError((prev) => { return { ...prev, "cc": 0 } })
        }
        if (!phone) {
            setError((prev) => { return { ...prev, "phone": "Phone Should not be Empty" } })
            return;
        }
        else{
            setError((prev) => { return { ...prev, "phone": 0 } })
        }
        if (!password) {
            setError((prev) => { return { ...prev, "password": "Password Should not be Empty" } })
            return;
        }else{
            setError((prev) => { return { ...prev, "password": 0 } })
        }
        if (!(password === cpassword)) {
            setError((prev) => { return { ...prev, "cpassword": "Passwords Should Match" } })
            return;
        }else{
            setError((prev) => { return { ...prev, "cpassword": 0 } })
        }
        setError(()=>{return {"name":"","email":"", "phone":"","cc":"","password":"","cpassword":""}})
        setLoading(true)
        fetch(process.env.REACT_APP_BASE_URL+'/user/register',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "name":name,
                email,
                "phone":cc+phone,
                password
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            setLoading(false)
            setAlert(data.success)
            setMessage(data.message)
        })
        setLoading(false)
    }
    return (
        <Stack gap={2}>
            <Stack gap={4} alignItems="center" justifyContent="center">
                <Typography variant="h5" sx={{fontWeight:800}}>ShrimpTalker1.0</Typography>
                <TextField value={name} onChange={(e) => { setName(e.target.value) }} error={error.name.length!==0?true:false} helperText={error.name?error.name:""} sx={{ width: "100%" }} required type="email" label="Name" name="name" />
                <TextField value={email} onChange={(e) => { setEmail(e.target.value) }} error={error.email.length!==0?true:false} helperText={error.email?error.email:""} sx={{ width: "100%" }} required type="email" label="Email" name="email" />
                <Stack width="100%" direction="row" gap={2}>
                    <TextField sx={{ width: "30%" }} value={cc} onChange={(e)=>{setCc(e.target.value)}}placeholder={"91"} error={error.cc.length!==0?true:false} required type="text" label="CC" />
                    <TextField sx={{ width: "100%" }} value={phone} onChange={(e)=>{setPhone(e.target.value)}}error={error.phone.length!==0?true:false} helperText={error.phone} required type="phone" label="Phone Number" />
                </Stack>
                <TextField sx={{ width: "100%" }} value={password} onChange={(e)=>{setPassword(e.target.value)}} error={error.password.length!==0?true:false} helperText={error.password} required type="password" label="Password" />
                <TextField sx={{ width: "100%" }} value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}} error={error.cpassword.length!==0?true:false} helperText={error.cpassword} required type="password" label="Confirm Password" />
            </Stack>
            <Button disabled={loading} onClick={handleSubmit} variant="contained" startIcon={loading?<CircularProgress size={30} thickness={8}/>:""}>Register</Button>
            {alert===0?"":<Alert onClose={()=>{setAlert(0)}}severity={alert?"success":"error"} >{message}</Alert>}
        </Stack>
    )
}

export default SignupForm