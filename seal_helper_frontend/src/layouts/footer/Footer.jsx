import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import bubble from '../../assets/bubble.png';
import stars from '../../assets/stars.png';
import star from '../../assets/star.png';
import letter from '../../assets/letter.png';
import arrow from '../../assets/arrow.png';

function Footer() {
    const navigate = useNavigate();

    return (
        <Box
            component="footer"
            sx={{
                /* --- BREAKOUT STYLES --- */
                width: '100vw',
                position: 'relative',
                left: '50%',
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw',
                /* ------------------------ */
                height: '55vh',
                overflow: 'hidden',
                flexShrink: 0,
                zIndex: 10,
            }}
        >
            <Box
                sx={{
                    width: '150%',
                    height: '250px',
                    backgroundColor: '#96C0D0FF',
                    borderRadius: '50%',
                    position: 'absolute',
                    bottom: '-100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 0,
                }}
            >
                <img
                    style={{
                        position: 'absolute',
                        zIndex: 1,
                        top: '-150px',
                        left: '50%',
                        transform: 'translateX(-250%)',
                        width: '13%',
                    }}
                    alt={'bubble_icon'}
                    src={bubble}
                />
                <img
                    style={{
                        position: 'absolute',
                        zIndex: 1,
                        top: '-200px',
                        left: '43%',
                        transform: 'translateX(-250%)',
                        width: '7%',
                    }}
                    alt={'stars_icon'}
                    src={stars}
                />

                <img
                    style={{
                        position: 'absolute',
                        zIndex: 1,
                        top: '-190px',
                        right: '16.5%',
                        width: '13%',
                    }}
                    alt={'star_icon'}
                    src={star}
                />

                <img
                    style={{
                        position: 'absolute',
                        zIndex: 2,
                        top: '-120px',
                        right: '18.5%',
                        width: '7%',
                        cursor: 'pointer',
                    }}
                    alt={'letter_icon'}
                    src={letter}
                    // Updated the URL here
                    onClick={() => navigate('/help/become-volunteer')}
                />

                <img
                    style={{
                        position: 'absolute',
                        zIndex: 1,
                        top: '-200px',
                        right: '24.5%',
                        width: '5%',
                    }}
                    alt={'arrow_icon'}
                    src={arrow}
                />

                <Box sx={{
                    position: 'absolute',
                    zIndex: 1,
                    top: '-100px',
                    right: '28%',
                    width: '10%',
                }}>
                    <Typography variant={'body1'} component="p">Do you want to join our team?</Typography>
                    <Typography variant={'body1'} component="p">Fill out this application now!</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Footer;