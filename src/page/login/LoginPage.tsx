import React from 'react';
import {
    Avatar,
    Button,
    TextField,
    Paper,
    Box,
    Typography,
    CircularProgress,
    Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from "../../api/adminAuth";
import type { Login } from "../../type/auth.type";

const LoginPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<Login>();

    const [errorMessage, setErrorMessage] = React.useState('');
    const navigate = useNavigate();

    const onSubmit = async (data: Login) => {
        try {
            setErrorMessage('');
            const response = await login(data);

            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);

            navigate('/chat');
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Invalid username or password');
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Paper elevation={6} sx={{ p: 6, maxWidth: 400, width: '100%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 2, width: '100%' }}
                    >
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Username"
                            autoComplete="username"
                            autoFocus
                            {...register('userName', { required: 'Username is required' })}
                            error={!!errors.userName}
                            helperText={errors.userName?.message}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            {...register('password', { required: 'Password is required' })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        {errorMessage && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {errorMessage}
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginPage;
