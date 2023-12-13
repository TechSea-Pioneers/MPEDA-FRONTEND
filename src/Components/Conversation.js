import { Alert, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import MpedaLogo from './svgs/MpedaLogo';
import { TypeAnimation } from 'react-type-animation';
function Conversation() {
    const apiurl = process.env.REACT_APP_API_URL
    const [messages, setMessages] = useState([
        { "text": "Hello! How may I help you today?", "sender": "bot" }
    ])
    const [loading, setLoading] = useState(false)
    const [currMess, setCurrMess] = useState("");
    const [sender, setSender] = useState(0);
    const handleUserInput = (e) => {
        if (e.key === 'Enter' && currMess) {
            e.preventDefault()
            setMessages(prev => [...prev, { "text": currMess, "sender": sender }])
            setSender(prev => !prev)
            setCurrMess("".trim());
            // after adding to current message stream send request.
            setLoading(true);
            setMessages(prev => [...prev, { "text": "thinking...", "sender": !sender }])
            fetch(apiurl + "/chatbot", {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "body": JSON.stringify({
                        "messageResponse": currMess,
                        "history": ['Previous Message1', 'Previous Message2']
                    })
                })
            }).then(res => res.json()).then(data => {
                setLoading(false);
                setMessages(prev => {
                    const next = [...prev];
                    next.pop();
                    return next;
                })
                setMessages(prev => [...prev, { "text": data.messageResponse.response, "sender": !sender }])
                setSender(prev => !prev)
                setCurrMess("".trim());
                return;
            })
            setLoading(false);
            return;
        }
    }

    return (
        <Stack className="conv" gap={2} width="42vw" height="43vh" p={3} pb={1}>
            <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "Poppins" }}>Get a Free Trial!</Typography>
            {
                messages.map((element, index) => {
                    return (
                        <>
                            {
                                element.text.includes("thinking...") ?
                                    <Stack key={index} width="100%" alignItems="center" direction="row" justifyContent={element.sender ? "flex-start" : "flex-end"} gap={2}>
                                        {element.sender ? <MpedaLogo height={"50"} width={"50"} /> : ""}
                                        <Typography width="50%" className={element.sender ? "bot" : "clientText"} sx={{ fontFamily: "Poppins" }}>
                                            <TypeAnimation
                                                sequence={["thinking...", "processing..."]}
                                                wrapper="span"
                                                speed={50}
                                                style={{ display: 'inline-block', fontFamily: 'Poppins', fontWeight: 800 }}
                                                repeat={Infinity}
                                            />
                                        </Typography>
                                        {!element.sender ? <AccountCircleIcon fontSize={"large"} /> : ""}
                                    </Stack> :
                                    <Stack key={index} width="100%" alignItems="center" direction="row" justifyContent={element.sender ? "flex-start" : "flex-end"} gap={2}>
                                        {element.sender ? <MpedaLogo height={"50"} width={"50"} /> : ""}
                                        <Typography width="50%" className={element.sender ? "bot" : "clientText"} sx={{ fontFamily: "Poppins" }}>
                                            {element.text}
                                        </Typography>
                                        {!element.sender ? <AccountCircleIcon fontSize={"large"} /> : ""}
                                    </Stack>

                            }</>
                    )
                })
            }
            <textarea disabled={loading} rows={5} value={currMess} placeholder={loading ? "Waiting for response..." : "Start Typing ... And then hit ENTER!"} onChange={(e) => { setCurrMess(e.target.value) }} onKeyDownCapture={handleUserInput} type="text" className='inputconv' />
            {loading && <Alert severity='error'>Loading</Alert>}
        </Stack>
    )
}

export default Conversation