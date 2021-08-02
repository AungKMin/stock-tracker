import { AUTH, LOGOUT } from '../constants/actionTypes';

export default (state = { authData: null }, action) => { 
    switch (action.type) { 
        case AUTH: 
            localStorage.setItem('user', JSON.stringify({ ...action.payload }));

            return { ...state, authData: action.payload.result };
        case LOGOUT: 
            localStorage.clear();
            return { ...state, authData: null };
        default: 
            return state;
    }
}