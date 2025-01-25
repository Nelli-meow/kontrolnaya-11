import { useState } from 'react';
import * as React from 'react';
import { RegisterMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectRegisterError } from './UsersSlice.ts';
import { Link, useNavigate } from 'react-router-dom';
import { register } from './UsersThunk.ts';
import Header from '../../components /Header/Header.tsx';
import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import VpnKeyOffIcon from '@mui/icons-material/VpnKeyOff';
import Grid from '@mui/material/Grid2';


const initialState = {
  username: '',
  password: '',
  displayName: '',
  phoneNumber: '',
}

const RegisterPage = () => {
  const [form, setForm] = useState<RegisterMutation>({...initialState});
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    if (name === 'phoneNumber') {

      const phone = /^[+]?[0-9]*$/;

      if (!phone.test(value)) {
        alert('Phone number can only contain numbers and optional "+" at the beginning');
        return;
      }
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit =  async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    try {
      await dispatch(register(form)).unwrap();
      navigate('/');
      setForm(initialState);
    } catch (e) {
      console.log(e);
    }
  };

  const getFiledError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Box
          sx={{
            width: '40%',
            margin: '20px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(245,245,245,0.75)',
            borderRadius: '10px',
            padding: '30px 0',
          }}>
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <VpnKeyOffIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{mt: 3}}>
            <Grid container direction={'column'} size={12} spacing={2}>
              <TextField
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={form.username}
                onChange={inputChange}
                error={Boolean(getFiledError('username'))}
                helperText={getFiledError('username')}
              />
            </Grid>
            <Grid container direction={'column'} size={12} spacing={2} sx={{mt: 3,mb: 2}}>
              <TextField
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={inputChange}
                error={Boolean(getFiledError('password'))}
                helperText={getFiledError('password')}
              />
            </Grid>
            <Grid container direction={'column'} size={12} spacing={2} sx={{mt: 3,mb: 2}}>
              <TextField
                fullWidth
                id="displayName"
                label="displayName"
                name="displayName"
                type="displayName"
                value={form.displayName}
                onChange={inputChange}
                error={Boolean(getFiledError('displayName'))}
                helperText={getFiledError('displayName')}
              />
            </Grid>
            <Grid container direction={'column'} size={12} spacing={2} sx={{mt: 3,mb: 2}}>
              <TextField
                fullWidth
                id="phoneNumber"
                label="phoneNumber"
                name="phoneNumber"
                type="phoneNumber"
                value={form.phoneNumber}
                onChange={inputChange}
                error={Boolean(getFiledError('phoneNumber'))}
                helperText={getFiledError('phoneNumber')}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3,mb: 2}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RegisterPage;