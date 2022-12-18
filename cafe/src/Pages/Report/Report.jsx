import React from "react";
import './Report.css';
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { createRoot } from 'react-dom/client'
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Report = () => {

    const [dishData, setDishData] = useState()
    const [orderData, setOrderData] = useState()
    const [cafeName, setCafeName] = useState()
    const barChartContainer = useRef()
    const lineChartContainer = useRef()

    useEffect(() => {

        let cafeId = (window.location.href).split('=')[1]

        var data = JSON.stringify({
            "cafeId": cafeId
        });

        var config = {
            method: 'post',
            url: 'http://localhost:6969/menu/getDishDetails',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {

                let dishes = response.data.dishStats
                let orders = response.data.MonthlyOrderStats
                setCafeName(response.data.cafeName)
                processOrderData(orders)
                processDishData(dishes)

            })
            .catch(function (error) {
                console.log(error);
            });



    }, [])


    function processDishData(arr) {

        let dishStats = [];

        for (const key in arr) {
            dishStats.push({ name: key, today: arr[key][0]['today'], Days15: arr[key][1]['Days15'], Weeks4: arr[key][2]['Weeks4'], Weeks24: arr[key][3]['Weeks24'], Weeks52: arr[key][4]['Weeks52'] })

        }

        setDishData(dishStats)

    }

    function processOrderData(arr) {

        let orderStats = [];

        for (const key in arr) {
            orderStats.push({ date: key.split('-')[0], orders: arr[key] })
        }

        setOrderData(orderStats)

    }


    useEffect(() => {

        handleBarChart()

    }, [dishData])

    useEffect(() => {

        handleLineChart()

    }, [orderData])


    const handleBarChart = (option = 'today') => {

        console.log(option);

        const root = createRoot(barChartContainer.current)

        root.render(

            <>
                <ResponsiveContainer width='100%' >
                    <BarChart
                        data={dishData}
                        barSize={30}
                        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                    >
                        <XAxis
                            dataKey="name"
                            scale="point"
                            padding={{ left: 10, right: 10 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey={option} fill="#8884d8" background={{ fill: "#eee" }} />
                    </BarChart>
                </ResponsiveContainer>
            </>

        )
    }

    const handleLineChart = () => {

        const LineRoot = createRoot(lineChartContainer.current)

        LineRoot.render(
            <ResponsiveContainer width='100%' >
                <LineChart
                    width={500}
                    height={300}
                    data={orderData}>
                    <Line type="monotone"
                        dataKey="orders"
                        stroke="#8884d8"
                        strokeWidth={2} />
                    <XAxis
                        dataKey="date"
                        scale="point"
                        padding={{ left: 7, right: 10 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Bar dataKey="order" fill="#8884d8" background={{ fill: "#eee" }} />
                </LineChart>
            </ResponsiveContainer>
        )
    }

    return (

        <div className="ReportContainer">

            <center><p className="cafeName" >{cafeName}</p></center>
            <center><p>Statistical Report</p></center>

            <div className="BarChart-Container ">

                <FormControl sx={{ width: '120px', marginBottom: '20px' }} >
                    <InputLabel id="demo-simple-select-label">Days</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Days"
                        defaultValue='today'
                        onChange={(e) => {
                            console.log(e.target.value)
                            handleBarChart(e.target.value)
                        }}
                    >
                        <MenuItem value='today' >Today</MenuItem>
                        <MenuItem value='Days15' >15 Days</MenuItem>
                        <MenuItem value='Weeks4' >4 Weeks</MenuItem>
                        <MenuItem value='Weeks24' >24 Weeks</MenuItem>
                        <MenuItem value='Weeks52' >52 Weeks</MenuItem>
                    </Select>
                </FormControl>

                <div className="barChartContainer" ref={barChartContainer} >

                </div>

            </div>

            <div className="lineChart-Container" ref={lineChartContainer} >



            </div>

        </div>

    );
};
export default Report;