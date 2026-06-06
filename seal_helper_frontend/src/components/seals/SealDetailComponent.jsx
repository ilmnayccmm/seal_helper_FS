import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api_instance, { BASE_URL } from "../../services/api.js";
import {
    Box, Typography, Button, Avatar, Grid, Card,
    Divider, Chip, Stack, CircularProgress, Link, Container
} from "@mui/material";
import DonationComponent from "./DonationComponent.jsx";
import VerifiedIcon from '@mui/icons-material/Verified';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import PetsIcon from '@mui/icons-material/Pets';
import BackButton from "../../components/history/BackButton.jsx";


function SealDetailComponent() {
    const { id } = useParams();
    const [seal, setSeal] = useState(null);
    const [guardians, setGuardians] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    // Loading states
    const [loading, setLoading] = useState(true);
    const [processingAction, setProcessingAction] = useState(false);

    const handleUpdateGathered = (newAmount) => {
        setSeal(prevSeal => ({
            ...prevSeal,
            total_gathered: parseFloat(prevSeal.total_gathered) + parseFloat(newAmount)
        }));
    };

    const handleBecomeSupporter = async () => {
        setProcessingAction(true);
        try {
            await api_instance.post(`support/${id}/`, { seal_id: id });
            window.location.reload();
        } catch (error) {
            console.error("Error joining:", error);
            alert("Failed to join.");
        } finally {
            setProcessingAction(false);
        }
    };

    const handleCancelSupport = async () => {
        if (!window.confirm("Stop being a guardian?")) return;
        setProcessingAction(true);
        try {
            await api_instance.post(`support/${id}/cancel`, { seal_id: id });
            window.location.reload();
        } catch (error) {
            console.error("Error cancelling:", error);
        } finally {
            setProcessingAction(false);
        }
    };

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const userRes = await api_instance.get('users/profile').catch(() => null);
                if (userRes?.data) setCurrentUser(userRes.data);

                const sealResponse = await api_instance.get(`seals/${id}`);
                setSeal(sealResponse.data);

                if (sealResponse.data.guardians?.length > 0) {
                    const userPromises = sealResponse.data.guardians.map(uid =>
                        api_instance.get(`users/profile/${uid}`).catch(() => null)
                    );
                    const userResponses = await Promise.all(userPromises);
                    setGuardians(userResponses.filter(r => r).map(r => r.data));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [id]);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: '100px' }}><CircularProgress /></Box>;
    if (!seal) return <Box sx={{ p: '40px', textAlign: 'center' }}><Typography variant="h5">Seal not found.</Typography></Box>;

    const isCurrentUserGuardian = currentUser && seal.guardians.includes(currentUser.id);

    // --- Styles ---
    const sectionHeaderStyle = {
        backgroundColor: '#f6f8fa', // GitHub-like light gray header
        padding: '12px 16px',
        borderBottom: '1px solid #d0d7de',
        fontWeight: 600,
        fontSize: '14px'
    };

    const cardStyle = {
        border: '1px solid #d0d7de',
        borderRadius: '6px',
        boxShadow: 'none',
        marginBottom: '24px'
    };

    return (
        <Container sx={{ maxWidth: '1100px !important', padding: '40px 0' }}>
            <Box>
                <BackButton to={"/seals"} label="Back" />
            </Box>


            {/* 1. TOP HEADER SECTION */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderBottom: '1px solid #d0d7de',
                paddingBottom: '24px',
                marginBottom: '32px'
            }}>
                <Box sx={{ display: 'flex', gap: '24px' }}>
                    <Avatar
                        src={seal.images && seal.images[0] ? `${BASE_URL}${seal.images[0].image}` : ''}
                        sx={{ width: '100px', height: '100px', border: '1px solid gray' }}
                    >S</Avatar>
                    {console.log(seal)}

                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 600, mb: '8px', textAlign: 'left' }}>
                            {seal.name}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                                label={seal.status}
                                size="small"
                                sx={{
                                    height: '24px',
                                    backgroundColor: seal.status === 'Healthy' ? '#dafbe1' : '#fff8c5',
                                    color: seal.status === 'Healthy' ? '#1a7f37' : '#9a6700',
                                    fontWeight: 600,
                                    border: '1px solid transparent',
                                    borderColor: seal.status === 'Healthy' ? 'rgba(26,127,55,0.4)' : 'rgba(154,103,0,0.4)'
                                }}
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <CalendarMonthIcon sx={{ fontSize: '16px' }} /> Rescued: {seal.rescue_date}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                {/* Fixed Width Button to prevent glitching */}
                {currentUser && (
                    <Box sx={{ width: '220px', display: 'flex', justifyContent: 'flex-end' }}>
                        {isCurrentUserGuardian ? (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleCancelSupport}
                                disabled={processingAction}
                                sx={{ width: '100%', height: '40px', fontWeight: 600, textTransform: 'none' }}
                            >
                                {processingAction ? <CircularProgress size={20} color="inherit" /> : "Cancel Support"}
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleBecomeSupporter}
                                disabled={processingAction}
                                startIcon={!processingAction && <PetsIcon />}
                                sx={{
                                    width: '100%',
                                    height: '40px',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    bgcolor: '#1f883d', // GitHub Green
                                    '&:hover': { bgcolor: '#1a7f37' }
                                }}
                            >
                                {processingAction ? <CircularProgress size={20} color="inherit" /> : "Become a Guardian"}
                            </Button>
                        )}
                    </Box>
                )}
            </Box>

            {/* 2. GRID LAYOUT */}
            <Grid container spacing={4}>

                {/* --- LEFT COLUMN (MAIN) --- */}
                <Grid item xs={12} md={8}>

                    {/* About Card */}
                    <Card sx={cardStyle}>
                        <Box sx={sectionHeaderStyle}>
                            <Typography variant="inherit">Seal History / Readme.md</Typography>
                        </Box>
                        <Box sx={{ p: '24px', backgroundColor:'white' }}>
                            <Box sx={{
                                bgcolor: '#f6f8fa',
                                p: '16px',
                                borderRadius: '6px',
                                fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
                                fontSize: '13px',
                                border: '1px solid #e1e4e8',
                                color: '#24292e'
                            }}>
                                {seal.medical_data || "No history details available."}
                            </Box>
                        </Box>
                    </Card>

                    {/* Medical Log Card */}
                    <Card sx={cardStyle}>
                        <Box sx={sectionHeaderStyle}>
                            <Typography variant="inherit">Medical Logs</Typography>
                        </Box>
                        <Box sx={{ p: '24px', bgcolor: '#fff' }}>
                            <Box sx={{
                                bgcolor: '#f6f8fa',
                                p: '16px',
                                borderRadius: '6px',
                                fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
                                fontSize: '13px',
                                border: '1px solid #e1e4e8',
                                color: '#24292e'
                            }}>
                                {seal.medical_data || "No medical records found."}
                            </Box>
                        </Box>
                    </Card>

                    {/* Gallery (Fixed Grid) */}
                    <Typography variant="h6" sx={{ mb: '16px', fontWeight: 600 }}>Gallery</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                        {seal.images?.map((img) => (
                            <Box
                                key={img.id}
                                sx={{
                                    height: '200px',
                                    borderRadius: '6px',
                                    overflow: 'hidden',
                                    border: '1px solid #d0d7de'
                                }}
                            >
                                <img
                                    src={`${BASE_URL}${img.image}`}
                                    alt="Seal"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Box>
                        ))}
                    </Box>

                </Grid>

                {/* --- RIGHT COLUMN (SIDEBAR) --- */}
                <Grid item xs={12} md={4}>

                    {/* Info Sidebox - NOW IN A CARD */}
                    <Card sx={cardStyle}>
                        <Box sx={sectionHeaderStyle}>
                            <Typography variant="inherit">About</Typography>
                        </Box>
                        <Box sx={{ p: '24px', backgroundColor: 'white' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: '20px', lineHeight: 1.5 }}>
                                {seal.history}
                            </Typography>

                            <Stack spacing={2}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <LocationOnIcon sx={{ fontSize: 18, color: '#57606a' }} />
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>North Sea Rescue Center</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                                        {seal.gender === 'Female' ?
                                            <FemaleIcon sx={{ fontSize: 18, color: '#cf222e' }} /> :
                                            <MaleIcon sx={{ fontSize: 18, color: '#0969da' }} />
                                        }
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{seal.gender || 'Unknown'}</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <PetsIcon sx={{ fontSize: 18, color: '#57606a' }} />
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {seal.age} Years Old
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Card>

                    {/* Guardians List */}
                    <Card sx={cardStyle}>
                        <Box sx={{ ...sectionHeaderStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="inherit">Guardians</Typography>
                            <Chip
                                label={guardians.length}
                                size="small"
                                sx={{
                                    height: '20px',
                                    fontSize: '11px',
                                    backgroundColor: '#afb8c133',
                                    fontWeight: 600
                                }}
                            />
                        </Box>
                        <Box sx={{ backgroundColor: 'white' }}>
                            {guardians.length > 0 ? (
                                guardians.map((user, index) => (
                                    <Box
                                        key={user.id}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            p: '12px 16px',
                                            borderBottom: index < guardians.length - 1 ? '1px solid #f0f0f0' : 'none',
                                            '&:hover': { bgcolor: '#f6f8fa' } // Optional hover effect
                                        }}
                                    >
                                        <Avatar
                                            src={user.profile_picture ? `${BASE_URL}${user.profile_picture}` : ""}
                                            sx={{ width: 32, height: 32, border: '1px solid #d0d7de' }}
                                        >
                                            {user.username?.charAt(0)}
                                        </Avatar>
                                        <Box sx={{ minWidth: 0 }}>
                                            <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
                                                {user.username || "Anonymous"}
                                                {user.is_verified && (
                                                    <VerifiedIcon sx={{ fontSize: 14, color: '#0969da', ml: 0.5, verticalAlign: 'middle' }} />
                                                )}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Box sx={{ p: '32px 24px', textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        No guardians yet.
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#0969da', fontWeight: 600, cursor: 'pointer' }}>
                                        Be the first to support {seal.name}!
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Card>

                    {/* Donation Widget */}
                    <DonationComponent
                        sealId={seal.id}
                        totalGathered={seal.total_gathered}
                        targetAmount={seal.target_amount}
                        onDonationSuccess={handleUpdateGathered}
                    />

                </Grid>
            </Grid>
        </Container>
    );
}

export default SealDetailComponent;