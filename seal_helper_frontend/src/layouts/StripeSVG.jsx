import React from 'react';

const StripeSVG = ({
                       color = "#5889A7",
                       opacity = 0.5,
                       tilt = 150, // Controls the vertical drop of the diagonal
                       thickness = 50 // Controls how thick the stripe is
                   }) => {
    // We calculate the path based on the tilt and thickness props
    // M (Move to) x y
    // L (Line to) x y
    const startY = 100;
    const pathData = `
        M -50 ${startY} 
        L 1050 ${startY + tilt} 
        L 1050 ${startY + tilt + thickness} 
        L -50 ${startY + thickness} 
        Z
    `;

    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 500" // Increased height to prevent clipping
            preserveAspectRatio="none"
            style={{ display: 'block' }}
        >
            <path
                d={pathData}
                fill={color}
                opacity={opacity}
            />
        </svg>
    );
};

export default StripeSVG;