import * as api from '../api';

import { FETCH_ALL, FETCH_ONE, SET_NULLS, SET_SYMBOLS, REMOVE, ERROR } from '../constants/actionTypes';

export const setOneGraph = ( name, graphNumber ) => async (dispatch) => { 
    try { 
        dispatch({ type: REMOVE }); // get rid of any existing errors
        const { data: priceData } = await api.fetchOneGraphYahoo(name);
        const { data: smaData } = await api.fetchOneSMA(name);
        const { tweets } = await api.fetchTweets(name);
        const action = {
            type: FETCH_ONE,
            graphNumber: graphNumber,
            priceData: priceData,
            smaData: smaData,
            tweets: tweets
        }
        dispatch(action);
    } catch (error) { 
        const action = { 
            type: ERROR,
            message: error?.response?.data?.message
        }
        dispatch(action);
        console.log(error);
    }
} 

export const setAllGraphs = () => async (dispatch) => { 
    try { 
        dispatch({ type: REMOVE }); // get rid of any existing errors
        let priceDatas = []
        let smaDatas = []
        for (let i = 1; i < 6; i++) { 
            priceDatas[i] = (await api.fetchOneGraphYahoo(i)).data;
            smaDatas[i] = (await api.fetchOneSMA(i)).data;
        }
        const action = {
            type: FETCH_ALL,
            priceDatas: priceDatas,
            smaDatas: smaDatas
        }
        dispatch(action); 
    } catch (error) { 
        const action = { 
            type: ERROR,
            message: error?.response?.data?.message
        }
        dispatch(action);
        console.log(error);
    }
}

export const setNulls = (numberOfGraphs) => async (dispatch) => { 
    try { 
        const action = {
            type: SET_NULLS,
            numberOfGraphs
        }
        dispatch(action);
    } catch (error) { 
        console.log(error);
    }
}

export const updateSymbols = () => async (dispatch) => { 
    try { 
        dispatch({ type: REMOVE }); // get rid of any existing errors
        const { data: { symbols } } = await api.fetchSymbols();
        const action = { 
            type: SET_SYMBOLS, 
            symbols: symbols
        }
        dispatch(action);
    } catch (error) { 
        const action = { 
            type: ERROR,
            message: error?.response?.data?.message
        }
        dispatch(action);
        console.log(error);
    }
} 

export const userSetSymbols = (symbols, history) => async (dispatch) => { 
    try { 
        dispatch({ type: REMOVE }); // get rid of any existing errors
        const { data } = await api.updateSymbols(symbols);
        const action = {
            type: SET_SYMBOLS,
            symbols: data.symbols
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