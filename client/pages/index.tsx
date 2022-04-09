import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AccountMenu from '../components/users/account-menu';
import useAuth from '../hooks/use-auth';
import useInvites from '../hooks/use-invites';

// @ts-ignore, for missing type file
import hdate from 'human-date';

export default function Index() {
  const { resetAuth, isAuthenticated } = useAuth()
  const { data, refetch } = useInvites()
  
  const [alert, setAlert] = React.useState('')

  const copyInviteLink = React.useCallback(({ invite_url }) => {
    navigator.clipboard.writeText(invite_url)
    setAlert('Copied to clipboard')
    setTimeout(() => setAlert(''), 2000)
  }, [])

  const invites = data?.data || []

  if (!isAuthenticated) {
    window.location.href = '/users/signin';
  }

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}/>
          <Grid item xs={4}>
            <AccountMenu fetchInvites={refetch} resetAuth={resetAuth} />
          </Grid>
        </Grid>
      </Box>
      <CssBaseline />
      <Container>
        <Container>
          <Box sx={{ maxWidth: 570, margin: 'auto', paddingTop: 5 }}>
            <Typography variant="h5" gutterBottom component="div">
              Your Invites
            </Typography>
          </Box>
        </Container>
        { alert &&  <Alert onClose={() => setAlert('')} severity='info' sx={{ maxWidth: 600, margin: 'auto' }} > {alert} </Alert> }
        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', margin: 'auto' }}>
        {
          invites.map((invite, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={invite.email}
                  secondary={
                    <React.Fragment>
                      <a style={{ fontSize: 11, color: 'red', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => copyInviteLink(invite)}>
                        Copy link!
                      </a>

                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                      <br />
                      {`${invite.status} - ${hdate.relativeTime(invite.created_at)}`}
                      </Typography>

                    </React.Fragment>
                  }
                  />
              </ListItem>
            </React.Fragment>
          ))}
          { !invites.length && <Box sx={{ width: 300, color: 'grey', alignContent: 'center', paddingLeft: 2 }}>
              <Typography> You don't have any invite !! </Typography>
            </Box>
          }
        </List>
      </Container>
    </React.Fragment>
  );
}
