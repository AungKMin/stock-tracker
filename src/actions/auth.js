import { AUTH, ERROR, REMOVE, LOGOUT } from '../constants/actionTypes';
import * as api from '../api';

export const signIn = (formData, history) => async (dispatch) => { 
    try { 
        dispatch({ type: REMOVE }); // get rid of any existing errors
        const { data } = await api.signIn(formData);
        const action = {
            type: AUTH, 
            payload: data
        }
        dispatch(action);
        history.push('/');
    } catch (error) { 
        const action = { 
            type: ERROR,
            message: error?.response?.data?.message
        }
        dispatch(action);
        console.log(error);
    }
}

export const signUp = (formData, history) => async (dispatch) => { 
    try { 
        dispatch({ type: REMOVE }); // get rid of any existing errors
        const { data } = await api.signUp(formData);
        const action = { 
            type: AUTH,
            payload: data
        }
        dispatch(action);
        history.push('/');
    } catch (error) { 
        const action = { 
            type: ERROR,
            message: error?.response?.data?.message
        }
        dispatch(action);
        console.log(error);
    }
} 

export const logout = (history) => async (dispatch) => { 
    dispatch({ type: LOGOUT });
    history.push('/'); 
}