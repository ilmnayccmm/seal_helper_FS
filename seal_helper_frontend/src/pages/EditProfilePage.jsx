import React, { useState, useEffect } from 'react';
import {
    Container, TextField, Button, Typography, Box, Paper,
    Avatar, Grid, MenuItem, Switch, FormControlLabel
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import api_instance from '../services/api.js';
import LoadingSpinner from '../components/loading/LoadingSpinner.jsx';

const EditProfilePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({
        bio: '',
        profile_image: null
    });

    // Reuseable SX for TextFields to ensure all internal parts are black
    const textFieldSx = {
        '& .MuiInputBase-input': { color: 'black' },
        '& .MuiInputLabel-root': { color: 'black' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' },
        },
        '& .MuiFormHelperText-root': { color: 'black' },
        // For the select icon and selected text
        '& .MuiSelect-icon': { color: 'black' },
    };

    useEffect(() => {
        api_instance.get('users/profile/edit/')
            .then(res => {
                const d = res.data;
                setFormData({
                    bio: d.bio || '',
                    profile_image: null
                });
                setPreview(d.profile_image);
                setLoading(false);
            })
            .catch(() => navigate('/profile'));
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, profile_image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'profile_image') {
                if (formData[key] instanceof File) data.append(key, formData[key]);
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            await api_instance.patch('users/profile/edit/', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Profile updated successfully!");
            navigate('/profile');
        } catch (err) {
            console.error(err);
            alert("Error updating profile");
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/profile')}
                sx={{ mb: 2, color: 'black', textTransform: 'none' }}
            >
                Back to Profile
            </Button>

            <Paper sx={{ p: 4, borderRadius: 3, backgroundColor: "white", color: "black" }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: 'black' }}>
                    Edit Profile
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} display="flex" flexDirection="column" alignItems="center">
                            <Avatar src={preview} sx={{ width: 120, height: 120, mb: 1, border: '2px solid #ddd' }} />
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<PhotoCamera />}
                                size="small"
                                sx={{ color: 'black', borderColor: 'black', '&:hover': { borderColor: 'black' } }}
                            >
                                Change Photo
                                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                            </Button>
                        </Grid>

                        {/* Basic Info */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth multiline rows={3} label="Bio" name="bio"
                                value={formData.bio} onChange={handleChange} inputProps={{ maxLength: 300 }}
                                helperText={`${formData.bio.length}/300`}
                                sx={textFieldSx}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={{
                                    py: 1.5,
                                    fontWeight: 'bold',
                                    backgroundColor: '#eee',
                                    color: 'black',
                                    '&:hover': { backgroundColor: '#ddd' }
                                }}
                            >
                                Save Changes
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default EditProfilePage;