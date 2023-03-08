import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { useEffect, useState } from "react"
import { eventBus, SHOW_MSG } from "../services/event-bus.service";

export function UserMsg() {
    const [isOpen, setIsOpen] = useState(false)
    const [msg, setMsg] = useState('')

    useEffect(() => {
        eventBus.on(SHOW_MSG, (msg) => {
            setMsg(msg)
            const delay = msg.delay || 2000
            setIsOpen(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setTimeout(() => {
                setIsOpen(false)
            }, delay)
        })
    }, [])

    return (
        <div className="user-msg">
            <Collapse in={isOpen}>
                {msg && <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    severity={msg.type}
                >
                    {msg.txt}
                </Alert>}
            </Collapse>
        </div>
    )
}