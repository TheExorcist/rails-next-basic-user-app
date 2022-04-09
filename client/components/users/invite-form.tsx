import { useState, useContext } from "react";
import axios from "axios";

import { TextField, Button, Box, Alert } from "@mui/material";

import ServerConfigsContext from "../../contexts/server-configs";
import useAuth from "../../hooks/use-auth";

export default function InviteForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false);
  const { jwt } = useAuth();


  const { serverConfigs } = useContext(ServerConfigsContext);

  console.log(error)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSuccess(false);
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post(`${serverConfigs.baseApiPath}/invites`, { email }, { headers: {
        Authorization: 'Bearer ' + jwt
      }});
      setEmail('');
      setSuccess(true);
      onSuccess();
    } catch (err) {
      const errors = err?.response?.data || {}
      const message = Object.keys(errors).map(key => `${key} ${errors[key]}`).join(', ')
      setError(message);
    }
    setLoading(false);
  };

  return <>
    { isSuccess && <Alert onClose={() => setSuccess(false)} sx={{ marginBottom: 3 }} severity="success"> Invite sent !! </Alert> }
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Email"
        value={email}
        sx={{width: '60%'}}
        onChange={(e) => setEmail(e.target.value)}
        error={!!error}
        helperText={error}
        disabled={loading}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send invite'}
      </Button>
    </Box>
    </>
}
