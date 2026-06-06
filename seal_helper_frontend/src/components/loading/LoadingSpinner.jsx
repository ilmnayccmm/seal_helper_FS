import React from 'react';
import { Box, CircularProgress, Typography } from "@mui/material";

function LoadingSpinner({ message = "" }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                minHeight: '400px',
                flexGrow: 1
            }}
        >
            <CircularProgress size={60} thickness={4} color="primary" />
            <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
                {message}
            </Typography>
        </Box>
    );
}

export default LoadingSpinner;