import React, {useState} from 'react';
import { Container, Paper, Avatar, Typography, Grid, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router';

import useStyles from './styles.js';
import Input from './Input.js';
import { signUp, signIn } from '../../actions/auth.js';
import logo from '../../images/logo2.png';

const initialStateFormData = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

export default () => { 

    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialStateFormData);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (event) => { 
        event.preventDefault();

        if (isSignup) { 
            dispatch(signUp(formData, history));
        } else { 
            dispatch(signIn(formData, history));
        }
    };

    const handleChange = (event) => { 
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const switchMode = () => { 
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <img style={{display: 'inline'}} src={logo} alt="logo" height="50px" />
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign up" : "Sign in"}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already a user? Sign in here" : "Don't have an account? Sign up here"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}