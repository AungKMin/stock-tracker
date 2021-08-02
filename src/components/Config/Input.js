import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


const Input = ({ name, handleChange, value, half, label, autoFocus, type, handleDelete, index, addSymbol }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField 
                name={name}
                onChange={(event) => {handleChange(event)}}
                value={value}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={true}
                type={type}
                autoComplete="off"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => {handleDelete(index)}}>
                                <DeleteIcon/>
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </Grid>
    )
}

export default Input
