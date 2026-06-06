import api_instance from "../services/api.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Avatar, Box, Button, Container, Typography,
    Grid, Chip, Divider, Paper, Tooltip,
    Tabs, Tab, Stack, Link, Collapse
} from "@mui/material";
// Icons
import EmailIcon from '@mui/icons-material/EmailOutlined';
import EditIcon from '@mui/icons-material/Edit';
import PetsIcon from '@mui/icons-material/Pets';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// Components
import TransactionHistory from "../components/profile/TransactionHistory.jsx";
import LoadingSpinner from "../components/loading/LoadingSpinner.jsx";
import SealInfoCardCompact from "../components/profile/SealInfoCardCompact.jsx";

function TabPanel({ children, value, index }) {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

function ProfilePage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        api_instance.get('users/profile/')
            .then((res) => {
                setCurrentUser(res.data);
                setLoading(false);
            })
            .catch(() => navigate('/login'));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/login');
    };

    if (loading) return <LoadingSpinner />;

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Grid container spacing={4}>

                {/* --- LEFT SIDEBAR (Fixed Width Area) --- */}
                <Grid item xs={12} md={3} sx={{mr: "50px"}}>
                    <Box sx={{ position: 'sticky', top: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar
                            src={currentUser?.profile_image}
                            sx={{ width: 260, height: 260, border: '1px solid #e1e4e8', mb: 2 }}
                        />
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>{currentUser?.username}</Typography>
                        <Typography variant="body2" sx={{ width: '300px'}}>
                            {currentUser?.bio}
                        </Typography>

                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<EditIcon />}
                            sx={{ my: 2, textTransform: 'none' }}
                            onClick={() => navigate('/profile/edit')}
                        >
                            Edit profile
                        </Button>

                        <Stack spacing={1.5} sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <MonetizationOnIcon fontSize="small" color="success" />
                                <Typography variant="body2">
                                    Total Donated: <b>${parseFloat(currentUser?.total_donations).toLocaleString()}</b>
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon fontSize="small" />
                                <Typography variant="body2">{currentUser?.email}</Typography>
                            </Box>
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        {/* --- ACHIEVEMENTS SECTION --- */}
                        {currentUser?.badges?.length > 0 && (
                            <Typography variant="subtitle1" sx={{fontWeight: 'bold', mb: 1, alignSelf: 'flex-start'}}>
                                Achievements
                            </Typography>
                        )}

                        {currentUser?.badges?.length > 0 && (
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 3, width: '100%'}}>
                                {currentUser.badges.map((item, idx) => (
                                    <Tooltip
                                        key={idx}
                                        placement="top"
                                        arrow
                                        slotProps={{
                                            tooltip: {
                                                sx: {
                                                    backgroundColor: '#ffffff', // White box
                                                    color: '#000000', // Ensure base color is black
                                                    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)', // Stronger shadow for larger card
                                                    border: '1px solid #e1e4e8',
                                                    p: 2, // Increased padding
                                                    maxWidth: 280
                                                }
                                            },
                                            arrow: {
                                                sx: {
                                                    color: '#ffffff', // Match arrow to box
                                                    "&::before": {
                                                        border: "1px solid #e1e4e8" // Matches arrow border to the box border
                                                    }
                                                }
                                            }
                                        }}
                                        title={
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                                {/* EXPANDED IMAGE */}
                                                <Avatar
                                                    src={item.badge.icon}
                                                    sx={{
                                                        width: 150,
                                                        height: 150,
                                                        mb: 1.5,
                                                        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)'
                                                    }}
                                                />
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#000000', mb: 0.5, lineHeight: 1.2 }}>
                                                    {item.badge.name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#000000' }}>
                                                    {item.badge.description}
                                                </Typography>
                                            </Box>
                                        }
                                    >
                                        <Avatar
                                            src={item.badge.icon}
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                border: '1px solid #ddd',
                                                cursor: 'pointer',
                                                transition: 'transform 0.2s ease-in-out',
                                                '&:hover': {
                                                    transform: 'scale(1.15)', // Pop effect on hover
                                                    borderColor: '#bbb'
                                                }
                                            }}
                                        />
                                    </Tooltip>
                                ))}
                            </Box>
                        )}

                        <Button variant="text" color="error" fullWidth onClick={handleLogout} sx={{ fontWeight: 'bold', border: '1px solid #e1e4e8' }}>
                            Sign Out
                        </Button>
                    </Box>
                </Grid>

                {/* --- RIGHT CONTENT AREA --- */}
                <Grid item xs={12} md={9}>
                    <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Adopted Seals
                            </Typography>
                        </Box>

                        <Grid container spacing={2}>
                            {currentUser?.adopted_seals.map((seal) => (
                                <Grid item xs={12} sm={6} md={4} key={seal.id}>
                                    <SealInfoCardCompact seal={seal} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* TABS & ACTIVITY */}
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={tabValue}
                            onChange={(e, v) => setTabValue(v)}
                            sx={{ '& .Mui-selected': { color: 'black !important' } }}
                        >
                            <Tab label="Transactions" sx={{ textTransform: 'none', fontWeight: 'bold' }} />
                        </Tabs>
                    </Box>

                    <TabPanel value={tabValue} index={0}>
                        <TransactionHistory transactions={currentUser?.transactions} name={'Transaction'} />
                    </TabPanel>

                </Grid>
            </Grid>
        </Container>
    );
}

export default ProfilePage;