import React, { useState } from 'react';
import {
    Paper, Typography, TextField, Button,
    Box, LinearProgress, InputAdornment,
    ToggleButton, ToggleButtonGroup
} from '@mui/material';
import api_instance from "../../services/api.js";

function DonationComponent({ sealId, totalGathered, targetAmount, onDonationSuccess }) {
    const [amount, setAmount] = useState('0');
    const [loading, setLoading] = useState(false);

    // Calculate progress percentage
    const progress = Math.min((totalGathered / targetAmount) * 100, 100);

    const handleAmountChange = (event, newAmount) => {
        if (newAmount !== null) setAmount(newAmount);
    };

    const handleDonate = async () => {
        setLoading(true);
        try {
            await api_instance.post(`/support/donate/`, {
                seal_id: sealId,
                amount: parseFloat(amount)
            });
            onDonationSuccess(amount);
            setAmount('0');
        } catch (error) {
            console.error("Donation failed:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 4, bgcolor: '#f9fbfd', width: '650px' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
                Support this Seal
            </Typography>

            {/* Progress Bar Section */}
            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="black">
                        ${totalGathered.toLocaleString()} raised
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" >
                        {Math.round(progress)}%
                    </Typography>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#e1e4e8',

                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#2e7d32',
                            borderRadius: 5,
                        }
                    }}
                />                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', color: 'black' }}>
                    Target: ${parseFloat(targetAmount).toLocaleString()}
                </Typography>
            </Box>

            {/* Preset Amounts */}
            <ToggleButtonGroup
                value={amount}
                exclusive
                onChange={handleAmountChange}
                fullWidth
                sx={{ mb: 2 }}
            >
                <ToggleButton value="10">$10</ToggleButton>
                <ToggleButton value="25">$25</ToggleButton>
                <ToggleButton value="50">$50</ToggleButton>
                <ToggleButton value="100">$100</ToggleButton>
            </ToggleButtonGroup>

            {/* Custom Amount */}
            <TextField
                fullWidth
                label="Custom Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{ mb: 3 }}
            />

            <Button
                variant="contained"
                fullWidth
                size="large"
                color="secondary"
                onClick={handleDonate}
                disabled={loading || !amount || amount <= 0}
                sx={{ borderRadius: 2, py: 1.5, fontWeight: 'bold' }}
            >
                {loading ? "Processing..." : `Donate $${amount} Now`}
            </Button>
        </Paper>
    );
}

export default DonationComponent;