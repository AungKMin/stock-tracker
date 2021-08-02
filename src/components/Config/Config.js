import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Paper, Avatar, Typography, Grid, Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router';

import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


import useStyles from './styles';
import Input from './Input.js';
import { userSetSymbols, updateSymbols } from '../../actions/alpha';

export default () => { 

    const classes = useStyles();
    const history = useHistory();
    const symbols = useSelector((state) => state.alpha.symbols);
    const [ newSymbols, setNewSymbols ] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateSymbols());
    }, [])

    const handleChange = (event) => { 
        setNewSymbols(newSymbols.map((item, index) => {
            if (index == event.target.name.slice(-1)) { 
                return event.target.value;
            } else { 
                return item;
            }
        }));
    }

    useEffect(() => {
        if (symbols) {
            console.log(symbols);
            setNewSymbols(symbols);
        }
    }, [symbols])

    const handleSubmit = (event) => { 
        event.preventDefault();
        dispatch(userSetSymbols(newSymbols, history));
    }

    const handleDelete = (index) => { 
        const newSymbols2 = newSymbols.filter((item, i) => i != index);
        setNewSymbols(newSymbols2);
    }

    const addSymbol = () => {
        const newSymbols2 = [...newSymbols];
        newSymbols2.push('');
        setNewSymbols(newSymbols2);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">Configure Settings</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            newSymbols.map((symbol, index) => (
                                <>
                                    <Input key={index} index={index} name={`symbol${index}`} value={newSymbols[index]} handleChange={handleChange} type="text" label="symbol" handleDelete={handleDelete}/>  
                                </>
                            ))
                        }
                    </Grid>
                    <Button fullWidth variant="contained" className={classes.submit} color="primary" startIcon={<AddCircleIcon/>} onClick={addSymbol}>
                        Add Symbol
                    </Button>
                    <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
                        Finish Config
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}