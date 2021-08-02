import { combineReducers } from 'redux';

import alpha from './alpha.js';
import auth from './auth.js'
import flash from './flash.js';

export default combineReducers({ 
   alpha, auth, flash
});