import React from "react";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

function SealCardComponent({ seal }) {
    const mainImage = seal.images?.[0]?.image || "https://via.placeholder.com/300x200?text=No+Image";

    return (
        <Box
            component={Link}
            to={`/seals/${seal.id}`}
            sx={{
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                width: 240,
                height: 300,
                backgroundColor: "#FFFFFF", // Polaroid white frame
                borderRadius: "4px", // Subtle rounding typical of cardstock
                padding: "16px", // Space around the photo and name
                paddingBottom: "10px", // Extra bottom space for text area
                boxShadow: "0px 10px 20px rgba(0,0,0,0.15)", // Depth effect
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                    transform: "rotate(-1deg) scale(1.02)", // Subtle hover tilt
                },
            }}
        >
            {/* THE IMAGE CONTAINER (The "Cutout") */}
            <Box
                sx={{
                    width: "100%",
                    flexGrow: 1, // Takes up available space above the text
                    overflow: "hidden", // Ensures image doesn't leak out
                    backgroundColor: "#f0f0f0", // Placeholder color while loading
                    border: "2px solid #f9f9f9", // Slight inner edge
                }}
            >
                <Box
                    component="img"
                    src={mainImage}
                    alt={seal.name}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // Crops image to fill the space
                        objectPosition: "center", // Centers the crop
                        display: "block",
                    }}
                />
            </Box>

            {/* THE TEXT AREA (The Polaroid Margin) */}
            <Box
                sx={{
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
                        color: "#9BCCE2",
                        WebkitTextStroke: "1px #4366A7",
                        textAlign: "center",
                        fontWeight: 900,
                    }}
                >
                    {seal.name || "UNNAMED"}
                </Typography>
            </Box>
        </Box>
    );
}

export default SealCardComponent;