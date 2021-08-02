import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

const alphaAvantageKey = process.env.ALPHAVANTAGE_KEY;
const serverUrl = (process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL : 'http://localhost:5000');


// Custom API calls 
const customAPI = axios.create({ baseURL: serverUrl });
customAPI.interceptors.request.use((req) => { 
    if (localStorage.getItem('user')) { 
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
    }

    return req;
})

export const fetchSymbols = () => { 
    return customAPI.get('/user/preferences');
}

export const updateSymbols = (symbols) => { 
    return customAPI.post('/user/changePreferences', symbols);
}

export const fetchOneGraphYahoo = (name) => { 
    const url = `/prices/search?symbol=${name}`
    return customAPI.get(url).then(
        ({ data: { data } }) => { 
            const newData = data.slice(0, 30).reverse();
            return { data: newData };
        }
    );
}

export const fetchTweets = (name) => { 
    const url = `/twitter/search?symbol=${name}`
    return customAPI.get(url).then(
        ({ data: {tweets} }) => { 
            return { tweets };
        }
    );
}

// authentication
export const signIn = (formData) => customAPI.post('/user/signin', formData); 
export const signUp = (formData) => customAPI.post('/user/signup', formData); 




// Alphavantage API calls
const API = axios.create();

export const fetchOneGraph = (name) => {
    const alphaAvantageUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${name}&apikey=${alphaAvantageKey}`
    // const alphaAvantageUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`
    return API.get(alphaAvantageUrl).then(
        ({ data }) => { 
            const newData = Object.entries(data["Time Series (Daily)"]).slice(0, 30).reverse();
            return { data: newData };
        }
    ) ;
};

export const fetchOneSMA = (name) => { 
    const alphaAvantageUrl = `https://www.alphavantage.co/query?function=SMA&symbol=${name}&interval=daily&time_period=50&series_type=open&apikey=${alphaAvantageKey}`;
    // const alphaAvantageUrl = `https://www.alphavantage.co/query?function=SMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo`;
    return API.get(alphaAvantageUrl).then(
        ({ data }) => { 
            const newData = Object.entries(data["Technical Analysis: SMA"]).slice(0, 30).reverse();
            return { data: newData };
        }
    ) ;
}
