import './App.css'
import Header from "./layouts/header/Header.jsx";
import Footer from "./layouts/footer/Footer.jsx";
import theme from "./theme.js";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import StripeSVG from "./layouts/StripeSVG.jsx";
import header_stripe from "./assets/stripe.png";
import React from "react";
import fish_stripe from "./assets/fish_stripe.png";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100%',
                position: 'relative', // Necessary for absolute children
                bgcolor: 'background.default',
            }}>
                {/* Background Layer */}
                <Box sx={{
                    position: 'absolute',
                    top: '10vh', // Adjust where the stripe starts vertically
                    left: 0,
                    width: '100%',
                    height: '600px', // Total height of the decorative area
                    zIndex: 0,      // Behind the Outlet content
                    pointerEvents: 'none',
                }}>
                    <StripeSVG
                        color={'#5889A7'}
                        opacity={0.5}
                        thickness={100}
                        tilt={300}
                    />
                </Box>
                <Header />

                <Box component="main"
                     sx={{
                         flexGrow: 1,
                         minHeight: '80vh',
                         display: 'flex',
                         flexDirection: 'column',
                         flexShrink: 0,
                         position: 'relative',
                         zIndex: 1,
                     }}>
                    <Outlet />
                </Box>
                <Footer />
            </Box>
        </ThemeProvider>
    )
}

export default App;