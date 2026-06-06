import React from 'react';
import {Box, Button} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

/**
 * Reusable Back Button
 * @param {string} to - (Optional) Specific path to navigate to. If null, goes back in history.
 * @param {string} label - (Optional) Text to display. Default: "Back".
 * @param {object} sx - (Optional) Extra styles to merge.
 */
function BackButton({ to = null, label = null, sx = {} }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        } else {
            navigate(-1); // Go back one step in history
        }
    };

    return (
        <Box sx={{
            // width: '100%',
            display: 'flex',
            position: "absolute",
            justifyContent: 'flex-start',
            marginLeft: '-130px',
            // marginBottom: '-55px',
            overflow: "hidden",
            '@media (max-width: 600px)': {
                marginLeft: '0px',
            },
            borderRadius: '20px',
        }}>
            <Button
                startIcon={<ArrowBackIcon sx={{
                    fontSize: '28px !important',
                    display: 'flex',
                    color: 'black',
                }} />}
                onClick={handleClick}
                disableRipple
                sx={{
                    textTransform: 'none',
                    color: 'black',
                    fontWeight: 600,
                    fontSize: '14px',
                    padding: '6px 12px',
                    minWidth: 'auto',
                    justifyContent: 'flex-start',
                    borderRadius: '20px',
                    transition: '0.2s cubic-bezier(0.3, 0, 0.5, 1)',
                    '&:hover': {
                        backgroundColor: '#f5f5f5',
                        color: 'black', // Darker on hover
                        textDecoration: 'none'
                    },
                    ...sx
                }}
            >
                {label}
            </Button>
        </Box>
    );
}

export default BackButton;