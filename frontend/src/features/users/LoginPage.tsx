import { useState } from 'react';
import * as React from 'react';
import { RegisterMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectLoginError } from './UsersSlice.ts';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components /Header/Header.tsx';
import { login } from './UsersThunk.ts';

const initialState = {
  username: '',
  password: '',
}

const LoginPage = () => {
  const [form, setForm] = useState<RegisterMutation>({...initialState});
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectLoginError);
  const navigate = useNavigate();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit =  async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    await dispatch(login(form)).unwrap();
    navigate('/');
    setForm(initialState);
  };

  return (
    <>
      <Header />
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="d-flex flex-column align-items-center">
            <h3 className="my-5">Sign in</h3>

            {loginError && (
              <div className="alert alert-danger" role="alert">
                {loginError.error}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                value={form.username}
                onChange={inputChange}
                type="text"
                className='form-control'
                placeholder="Enter Username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                value={form.password}
                onChange={inputChange}
                type="password"
                className='form-control'
                placeholder="Enter Username"
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
            <Link to="/register" className="mt-3">Don't have an account?? Sign up</Link>
          </div>
        </form>
      </div>
    </>

  );
};

export default LoginPage;