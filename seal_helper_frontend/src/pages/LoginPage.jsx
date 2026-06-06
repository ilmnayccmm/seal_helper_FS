import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '../recoil/atoms.js';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import api_instance from "../services/api.js";

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const setAuth = useSetRecoilState(authState);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api_instance.post('http://localhost:8000/login/', formData);

            const { token, user_data } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user_data));

            setAuth({
                isAuthenticated: true,
                token: token,
                user: user_data,
            });

            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');
            console.log(err);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4">Sign In</Typography>
                {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal" required fullWidth
                        label="Username"
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                    <TextField
                        margin="normal" required fullWidth
                        label="Password" type="password"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Login
                    </Button>
                    <Link to="/register">{"Don't have an account? Sign Up"}</Link>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;