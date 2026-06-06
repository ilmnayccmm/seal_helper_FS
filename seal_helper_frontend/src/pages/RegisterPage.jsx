import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import api_instance from "../services/api.js";

const RegisterPage = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    // Change state to an object to store field-specific errors
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors on new submission

        try {
            await api_instance.post('http://localhost:8000/register/', formData);
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data) {
                // If it's a standard DRF JSON error object
                if (typeof err.response.data === 'object') {
                    setErrors(err.response.data);
                } else {
                    // Fallback if the server crashes and sends an HTML string (like a 500 error)
                    setErrors({ non_field_errors: ["An unexpected server error occurred."] });
                }
            } else {
                // Fallback for Network connection errors
                setErrors({ non_field_errors: ["Network error. Please check your connection and try again."] });
            }
        }
    };

    // Helper function to extract DRF array error messages into a single string
    const getErrorMessage = (field) => {
        if (errors[field]) {
            // DRF returns errors as an array (e.g., ["This field is required."])
            return Array.isArray(errors[field]) ? errors[field].join(' ') : errors[field];
        }
        return '';
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4">Join the Colony</Typography>

                {/* Display General / Non-Field Errors at the top using MUI Alert */}
                {(errors.non_field_errors || errors.detail) && (
                    <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                        {getErrorMessage('non_field_errors') || getErrorMessage('detail')}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        error={!!errors.username} // Turns the field outline red
                        helperText={getErrorMessage('username')} // Shows the error underneath
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        type="email"
                        error={!!errors.email}
                        helperText={getErrorMessage('email')}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        error={!!errors.password}
                        helperText={getErrorMessage('password')}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <Button type="submit" fullWidth variant="contained" color="secondary" sx={{ mt: 3 }}>
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;