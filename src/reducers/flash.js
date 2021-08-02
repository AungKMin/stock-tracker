import { ERROR, REMOVE } from '../constants/actionTypes';

const flashReducer = (state = { error: false, message: '' }, action) => { 
    switch (action.type) { 
        case ERROR: 
            return { ...state, error: true, message: action?.message };
        case REMOVE: 
            return { ...state, error: false };
        default: 
            return state;
    }
} 

export default flashReducer;