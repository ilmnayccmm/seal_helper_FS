import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0a0a0a',
            light: '#0A9396',
            dark: '#001219',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#00C853',
            light: '#06e867',
            dark: '#BB3E03',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#FFFFFF', // Changed to white
            paper: '#FFFFFF',   // Replaced #065470 with white
        },
        text: {
            primary: '#000000',   // Changed to pure black
            secondary: '#000000', // Changed to pure black (was #f1f1f1)
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700, color: '#000000' }, // Removed blue, set to black
        h2: { fontWeight: 600, color: '#000000' }, // Removed blue, set to black
        button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '10px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Updated shadow to a neutral black/gray
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 2px 10px rgba(0,0,0,0.05)',
                    border: '1px solid #E0E0E0',
                },
            },
        },
    },
});

export default theme;