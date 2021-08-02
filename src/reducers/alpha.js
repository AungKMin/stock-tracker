
import { FETCH_ALL, FETCH_ONE, SET_NULLS, SET_SYMBOLS } from '../constants/actionTypes';

const alphaReducer = (state = { priceDatas: [], smaDatas: [], tweetsArray: [], symbols: [] }, action) => { 
    switch (action.type) { 
        case FETCH_ONE: 
            return {
                ...state,
                priceDatas: state.priceDatas.map( (graph, index) => {
                    if (index === action.graphNumber - 1) { 
                        return action.priceData;
                    } else { 
                        return graph;
                    }
                }),
                smaDatas: state.smaDatas.map( (graph, index) => {
                    if (index === action.graphNumber - 1) { 
                        return action.smaData;
                    } else { 
                        return graph;
                    }
                }),
                tweetsArray: state.tweetsArray.map( (graph, index) => { 
                    if (index === action.graphNumber - 1) { 
                        return action.tweets;
                    } else {    
                        return graph;
                    }
                })
            };
        case FETCH_ALL: 
            return { 
                ...state,
                priceDatas: action.priceDatas,
                smaDatas: action.smaDatas
            }
        case SET_NULLS:
            let newpriceDatas = [];
            let newsmaDatas = [];
            let newTweets = [];
            for (let i = 0; i < action.numberOfGraphs; i++) { 
                newpriceDatas[i] = null;
                newsmaDatas[i] = null;
                newTweets[i] = null; 
            }
            return { 
                ...state,
                priceDatas: newpriceDatas,
                smaDatas: newsmaDatas,
                tweetsArray: newTweets
            }
        case SET_SYMBOLS: 
            return { 
                ...state,
                symbols: action.symbols
            }
        default: 
            return state;
    }
}

export default alphaReducer;