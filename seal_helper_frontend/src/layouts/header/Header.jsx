import React from "react";
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Avatar, Link } from "@mui/material";
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/atoms.js';
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../services/api.js";
import logo_image from "../../assets/logo.png"
import header_stripe from "../../assets/stripe.png"

function Header() {
    const auth = useRecoilValue(authState);
    const userImagePath = auth.user?.profile_data?.profile_image
    const userAvatar = `${BASE_URL}${userImagePath}`
    const header_tabs_list = {
        "Seals": "/seals",
    };

    if (!auth.isAuthenticated) {
        header_tabs_list["Sign In"] = "/login";
    }

    return (
        <div>
            <Box
                component="header"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    height: "120px",
                    flexShrink: 0,
                    px: "50px",
                    backgroundColor: "#065470",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    boxSizing: "border-box",
                    overflow: "hidden",
                }}
            >
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    <Link
                        component={NavLink}
                        to="/"
                        underline="none"
                        color="inherit"
                    >
                        <Avatar
                            alt="User Profile Icon"
                            src={logo_image}
                            to="/"
                            sx={{
                                textDecoration: 'none',
                                top: '-8px',
                                width: 80,
                                height: 80
                            }}
                        />
                    </Link>
                </Typography>

                <List
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyItems: "space-between",
                        padding: 0
                    }}
                >
                    {Object.entries(header_tabs_list).map(([label, path]) => (
                        <ListItem key={label} disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to={path}
                                sx={{
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap',
                                    color: "white",
                                }}
                            >
                                <ListItemText primary={label} sx={{
                                    fontSize: "100px"
                                }} />
                            </ListItemButton>
                        </ListItem>
                    ))}

                    {auth.isAuthenticated && (
                        <ListItem disablePadding sx={{ width: 'auto' }}>
                            <Box sx={{ ml: "15px" }}>
                                <Avatar
                                    alt="User Profile Icon"
                                    src={userAvatar}
                                    component={NavLink}
                                    to="/profile"
                                    sx={{
                                        textDecoration: 'none',
                                        width: 40,
                                        height: 40
                                    }}
                                />
                            </Box>
                        </ListItem>
                    )}
                </List>
            </Box>
            <Box
                sx={{
                    backgroundImage: `url(${header_stripe})`,
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: 'contain',
                    height: '30px',
                    width: '100%',
                    position: 'relative',
                    top: '-10px',
                    zIndex: 1,
                }}
            />
        </div>
    );
}

export default Header;