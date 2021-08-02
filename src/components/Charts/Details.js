import { Paper, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useStyles from './styles';

export default ({ graphNumber }) => { 

    const tweetsArray = useSelector((state) => state.alpha.tweetsArray[graphNumber - 1]);
    const classes = useStyles();
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        if (tweetsArray) { 
            setTweets(tweetsArray);
            console.log(tweetsArray);
        }
    }, [tweetsArray]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper><Typography variant="h7">Recent Tweets</Typography> </Paper>
                <Paper className={classes.paper} style={{textAlign: 'justify', height: '100px', overflowY: 'auto'}}>
                    {
                        tweets.map((tweet, index) => (
                            <>
                                <Typography style={{ marginRight: '1%', fontWeight: 'bold' }}>{'User: ' + tweet.name}</Typography>
                                <Typography>{tweet.text}</Typography>
                                <br/>
                            </>
                        ))
                    }
                </Paper>
            </Grid> 
        </Grid>
    );
}