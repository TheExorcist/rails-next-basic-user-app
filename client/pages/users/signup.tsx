import * as React from 'react';
import { useEffect } from 'react';
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

import { useRouter } from 'next/router'

import useCreateUser from '../../hooks/use-create-user';
import useAuth from '../../hooks/use-auth';
import useInvite from '../../hooks/use-invite';

export default function SignUp() {
  const { isError, mutate, isLoading, isSuccess, error, data } = useCreateUser();
  const { setUser, isAuthenticated } = useAuth();

  const { referral_code: referralCode } = useRouter().query;

  const { data: invite, error: inviteError } = useInvite(referralCode as string);

  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    mutate({
      email: data.get('email') as string,
      password: data.get('password') as string,
      firstName: data.get('firstName') as string,
      lastName: data.get('lastName') as string,
      referralCode: referredEmail && referralCode as string,
    })
  };

  useEffect(() => {
    if (error && isError) {
      setErrorMessage(error?.response?.data?.info || 'Some Error occured');
    } else if (isSuccess && !isError && data) {
      setSuccessMessage('User created successfully');
    }
  }, [error, isSuccess, isError, data]);

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data?.data?.data)
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => window.location.href = '/', 1000);
    }
  }, [isAuthenticated])

  const referredEmail = invite?.data && invite.data[0]?.email

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={referredEmail}
                  focused={!!referredEmail}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/users/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}