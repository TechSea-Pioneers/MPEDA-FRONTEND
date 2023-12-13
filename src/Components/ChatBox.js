import { Button, Stack } from '@mui/material'
import { TypeAnimation } from 'react-type-animation';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import React, { useState } from 'react'
import Conversation from './Conversation';
function ChatBox() {
  const features = ['Intelligent', 100, 'Friendly', 100, 'Responsive', 100, 'Engaging', 100, 'Efficient', 100, 'Helpful', 100, 'Conversational', 100, 'Personalized', 100, 'Innovative', 100, 'Knowledgeable', 100, 'Interactive', 100, 'Approachable', 100, 'Proactive', 100, 'Empathetic', 100, 'Versatile', 100, 'Dynamic', 100, 'Resourceful', 100, 'Reliable', 100, 'User-Focused', 100, 'Cutting-edge']
  const [showConversation, setShowConversation] = useState();
  return (
    <Stack height="fit-content" width="fit-content" alignItems="center" justifyContent="center" gap={2} p={4}>
      {!showConversation && <>
        <img width="50%" height="fit-content"src="https://jungleworks.com/wp-content/uploads/2021/04/1_9I6EIL5NG20A8se5afVmOg.gif" alt="" />
        <TypeAnimation
          sequence={features}
          wrapper="span"
          speed={50}
          style={{ fontSize: '2rem', display: 'inline-block', fontFamily: 'Poppins',fontWeight:800 }}
          repeat={Infinity}
        />
      </>}
      {
        showConversation && <Conversation />
      }
      {!showConversation && <Button variant="outlined" size="large" onClick={() => { setShowConversation(true) }} endIcon={<PlayCircleOutlineIcon />}>Start Conversation</Button>}
      {showConversation && <Button sx={{ color: "#BB2525", borderColor: "#BB2525 !important" }} variant="outlined" size="large" onClick={() => { setShowConversation(false) }} endIcon={<DoDisturbOnIcon />}>End Conversation</Button>}
    </Stack>
  )
}

export default ChatBox