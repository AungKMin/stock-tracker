import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import { useSelector, useDispatch } from "react-redux";

import { setOneGraph, setNulls } from '../../actions/alpha';

const Chart = ({ graphNumber }) => {
    const symbols = useSelector((state) => state.alpha.symbols);
    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 500, height: 250 });
    const dispatch = useDispatch();
    // const { priceDatas, smaDatas } = useSelector((state) => state.alpha);
    const priceData = useSelector((state) => state.alpha.priceDatas[graphNumber - 1]);
    const smaData = useSelector((state) => state.alpha.smaDatas[graphNumber - 1]);
    const [toGraph, setToGraph] = useState({ graphingData: [], min: 0, max: 0 });

    useLayoutEffect(() => { 
        if (targetRef.current) { 
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });
        }
    }, [])

    useEffect(() => {
        dispatch(setOneGraph(symbols[graphNumber - 1], graphNumber));
    }, [])

    // useEffect(() => {
    //     if (priceDatas[graphNumber - 1] && smaDatas[graphNumber - 1]) {
    //         const priceData = priceDatas[graphNumber - 1];
    //         const smaData = smaDatas[graphNumber - 1];
    //         let maxValue = 0;
    //         let minValue = Number.MAX_SAFE_INTEGER;
    //         const graphingData = priceData.map((item, index) => {
    //             const time = item[0];
    //             const open = item[1]["1. open"];
    //             const close = item[1]["4. close"];
    //             const sma = (index < smaData.length) ? smaData[index][1]["SMA"] : 0; 
    //             if (open > maxValue) { maxValue = open;}
    //             if (open < minValue) { minValue = open; }
    //             if (close > maxValue) { maxValue = close; console.log('close', maxValue); }
    //             if (close < minValue) { minValue = close }
    //             if (sma > maxValue) { maxValue = sma; console.log('sma', maxValue);}
    //             if (sma < minValue) { minValue = sma }
    //             return { time, close, open, sma }
    //         });
    //         console.log(maxValue);
    //         setToGraph({ graphingData, max: maxValue, min: minValue }); 
    //     }
    // }, [priceDatas, smaDatas])
    
    useEffect(() => {
        if (priceData && smaData) {
            let maxValue = 0;
            let minValue = Number.MAX_SAFE_INTEGER;
            const graphingData = priceData.map((item, index) => {
                const time = item["date"].slice(0,10);
                const open = Math.round(item["open"] * 100) / 100;
                const close = Math.round(item["close"] * 100) / 100;
                const sma = (index < smaData.length) ? Math.round(smaData[index][1]["SMA"] * 100)/100 : 0; 
                if (open > maxValue) { maxValue = open;}
                if (open < minValue) { minValue = open; }
                if (close > maxValue) { maxValue = close;}
                if (close < minValue) { minValue = close }
                if (sma > maxValue) { maxValue = sma; }
                if (sma < minValue) { minValue = sma }
                return { time, close, open, sma }
            });
            setToGraph({ graphingData, max: maxValue, min: minValue }); 
        }
    }, [priceData, smaData])

    return (
        <div ref={targetRef}>
            <LineChart
                width={dimensions.width}
                height={dimensions.height}
                data={toGraph.graphingData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time"/>
                <YAxis domain={[toGraph.min, toGraph.max]}/>
                <Tooltip />
                <Legend />
                <Line dataKey="close" stroke="#D03129" dot={false}/>
                <Line dataKey="sma" stroke="#8884d8" dot={false}/>
                <Line
                    dataKey="open"
                    stroke="#82ca9d"
                    dot={false}
                    strokeWidth={0}
                />
            </LineChart>
        </div>
    );
}

export default Chart;
