import { Box, Button, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MailSender from './MailSender';

function ListofExporters() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [curTo, setCurTo] = useState("");
    const handleOpen = (email) => {setCurTo(email);setOpen(true);}
    const handleClose = () => setOpen(false);
    const [explist, setExpList] = useState([]);
    const style = {
        position: 'absolute',
        overflow: "scroll",
        height: "fit-content",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "90vw",
        bgcolor: 'background.paper',
        borderRadius: "1.2rem",
        boxShadow: 24,
        p: 4,
    };
    useEffect(() => {
        setLoading(true);
        fetch(process.env.REACT_APP_BASE_URL + "/exporter", {
            "method": "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            setLoading(false);
            console.log(data);
            setExpList(data.data)
        })
    }, [])
    return (
        <Stack>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className="black-row">
                        <TableRow>
                            <TableCell className="table-data" >Name</TableCell>
                            <TableCell className="table-data" align="right">About</TableCell>
                            <TableCell className="table-data" align="right">Infrastructure</TableCell>
                            <TableCell className="table-data" align="right">Products</TableCell>
                            <TableCell className="table-data" align="right">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {explist.length > 0 && explist.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 10 } }}
                            >
                                <TableCell className="table-data" component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell className="table-data" align="right">{row.about}</TableCell>
                                <TableCell className="table-data" align="right">{row.infrastructure}</TableCell>
                                <TableCell className="table-data" align="right">{row.products}</TableCell>
                                <TableCell className="table-data">
                                    <Stack alignItems="center" width="100%" justifyContent="center" gap={2}>
                                        <a href={`mailto:${row.email}`} style={{ width: "fit-content", textAlign:"center" }}>{row.email}</a>
                                        <Button size="small" sx={{ textAlign: "right", width: "fit-content" }} variant="contained" onClick={()=>{handleOpen(row.email)}}>
                                            Request a meeting
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                        {
                            loading &&
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Loading...
                                </TableCell>
                                <TableCell align="right">Loading...</TableCell>
                                <TableCell align="right">Loading...</TableCell>
                                <TableCell align="right">Loading...</TableCell>
                                <TableCell align="right">Loading...</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <MailSender to={curTo}/>
                </Box>
            </Modal>
        </Stack>
    )
}

export default ListofExporters