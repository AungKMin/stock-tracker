import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Card, Typography } from '@material-ui/core';

import Chart from './Chart';
import Details from './Details.js';
import { setNulls } from '../../actions/alpha';
import useStyles from './styles';
import Data from './Data';
import { updateSymbols } from '../../actions/alpha.js';


export default () => { 

    const dispatch = useDispatch();
    const classes = useStyles();
    const symbols = useSelector((state) => state.alpha.symbols);

    useEffect(() => {
        dispatch(updateSymbols());
    }, [])

    useEffect(() => { 
        if (symbols) { 
            dispatch(setNulls(symbols.length));
        }
    }, [symbols])

    return (
        <div className={classes.root} className={classes.masterContainer}>
            <Grid container spacing={3}>
            {
                symbols.map((element, index) => (
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>  
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Paper> <Typography variant="h5"> {element} </Typography> </Paper>
                                </Grid>
                                <Grid item xs={8}>  
                                    <Chart key={index} graphNumber={index + 1}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Data key={index} graphNumber={index + 1}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Details key={index} graphNumber={index + 1}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                )) 
            }
            </Grid>
        </div>
    );
}