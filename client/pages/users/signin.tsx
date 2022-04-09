import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import useUserHooks from '../../hooks/use-user-hooks';
import useAuth from '../../hooks/use-auth';

export default function SignIn() {
  const { isError, mutate, isLoading, isSuccess, error, data } = useUserHooks();
  const { setUser, isAuthenticated } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    mutate({
      email: data.get('email') as string,
      password: data.get('password') as string,
    })
  };

  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  React.useEffect(() => {
    if (error && isError) {
      setErrorMessage(error?.response?.data?.message || 'Some Error occured');
    } else if (isSuccess && !isError && data) {
      setSuccessMessage('Successfully signed in');
    }
  }, [error, isSuccess, isError, data]);

  React.useEffect(() => {
    if (isSuccess && data) {
      setUser(data?.data?.data)
    }
  }, [isSuccess, data])

  React.useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => window.location.href = '/', 1000);
    }
  }, [isAuthenticated])

  return (
      <Container component="main" maxWidth="xs">
        { errorMessage && !isAuthenticated && <Alert onClose={() => setErrorMessage('')} severity="error">{errorMessage}</Alert> }
        { successMessage && <Alert onClose={() => setSuccessMessage('')} severity="info">{successMessage}</Alert> }
        { isAuthenticated && <Alert onClose={() => setSuccessMessage('')} severity="info"> Singning you in !! Hang on !!</Alert> }

        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
            >
            Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/users/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}