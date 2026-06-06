import { Paper, Box, Typography, Chip } from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from "react-router-dom"; // Use the Hook

const SealInfoCardCompact = ({ seal }) => {
    // Calculate progress percentage
    const progress = Math.min((seal.total_gathered / seal.target_amount) * 100, 100);
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/seals/${seal.id}`);
    };

    return (
        <Paper
            variant="outlined"
            onClick={handleCardClick} // Handle click manually
            sx={{
                p: 1.5,
                height: '110px',
                width: '100%',
                maxWidth: '150px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                bgcolor: '#f6f8fa',
                borderColor: '#d0d7de',
                borderRadius: 1,
                overflow: 'hidden',
                boxSizing: 'border-box',
                cursor: 'pointer', // Makes it look like a link
                transition: 'all 0.2s ease',
                '&:hover': {
                    bgcolor: '#f3f4f6',
                    borderColor: '#0969da',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                },
                '&:active': {
                    transform: 'scale(0.97)'
                }
            }}
        >

            {/* TOP: Icon, Name, and Status */}
            <Box sx={{ minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                    <PetsIcon sx={{ fontSize: '0.9rem', flexShrink: 0 }} />
                    <Typography
                        variant="subtitle2"
                        noWrap
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '0.85rem',
                            textOverflow: 'ellipsis',
                            minWidth: 0
                        }}
                    >
                        {seal.name}
                    </Typography>
                    <Chip
                        label={seal.status}
                        size="small"
                        variant="outlined"
                        sx={{ height: 16, fontSize: '0.6rem', flexShrink: 0 }}
                    />
                </Box>
                <Typography variant="caption" color="#000000" noWrap sx={{ display: 'block' }}>
                    Rescued: {seal.rescue_date}
                </Typography>
            </Box>

            {/* BOTTOM: Fundraising Numbers and Bar */}
            <Box sx={{ minWidth: 0 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 0.5,
                    gap: 0.5
                }}>
                    <Typography
                        variant="caption"
                        noWrap
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '0.65rem',
                            textOverflow: 'ellipsis',
                            minWidth: 0
                        }}
                    >
                        ${parseFloat(seal.total_gathered).toLocaleString()} / ${parseFloat(seal.target_amount).toLocaleString()}
                    </Typography>
                </Box>

                {/* Progress Bar */}
                <Box sx={{ width: '100%', height: 5, borderRadius: 4, bgcolor: '#e1e4e8', overflow: 'hidden' }}>
                    <Box sx={{
                        width: `${progress}%`,
                        height: '100%',
                        bgcolor: progress >= 100 ? '#2e7d32' : 'primary.main',
                    }} />
                </Box>
            </Box>
        </Paper>
    );
};

export default SealInfoCardCompact;