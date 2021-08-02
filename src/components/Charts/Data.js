import React, { useState, useEffect } from 'react';
import { TableContainer, TableHead, Table, TableCell, TableRow, TableBody, Paper, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';

import useStyles from './styles';
import { VOLUME_ALERT_BOUNDARY } from '../../constants/data.js';

export default ({ graphNumber }) => { 

    const priceData = useSelector((state) => state.alpha.priceDatas[graphNumber - 1]);
    const smaData = useSelector((state) => state.alpha.smaDatas[graphNumber - 1]);
    const [rows, setRows] = useState({});

    const classes = useStyles();

    function createData(name, value) {
        return {name, value};
      }

    useEffect(() => { 
        if (priceData && smaData) {

            // SMA calculations
            const smaValue = Math.round(smaData[ smaData.length -1][1]["SMA"] * 100) / 100

            // Last closing price calculations
            const closingPrice = Math.round(priceData[priceData.length - 1]["close"] * 100) / 100

            // volume calculations
            const dailyVolume = priceData[priceData.length - 1]["volume"];
            const prevDayVolume = priceData[priceData.length - 2]["volume"];
            const volumeIncrease = Math.round(100*100*(dailyVolume - prevDayVolume)/(prevDayVolume))/100
            const volumeAlert = Math.abs(volumeIncrease) > VOLUME_ALERT_BOUNDARY

            setRows({
                sma: {name: 'SMA (50 days)', value: smaValue},
                price: {name: 'Last closing price', value: closingPrice},
                volume: {name: 'Daily volume increase (%)', value: volumeIncrease, alert: volumeAlert},
            });
        }
    }, [priceData, smaData]);

    return (
        <div>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableBody>
                    {Object.entries(rows).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                <Typography>{row[1].name}</Typography>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Typography>{row[1].value}</Typography>
                                { 
                                    (row[1].alert) ? 
                                        <NotificationImportantIcon color="secondary"/> 
                                        : null
                                } 
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}