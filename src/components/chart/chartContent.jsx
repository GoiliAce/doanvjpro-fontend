import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import axios from 'axios';
import './chart.css';
import API_BASE_URL from '../../config';

export const ChartDemo = () => {
    const chartRef = useRef(null);
    const colors = ['#ff0000',
                    '#ff4000',
                    '#ff8000',
                    '#ffbf00',
                    '#ffff00',
                    '#bfff00',
                    '#80ff00',
                    '#40ff00',
                    '#00ff00',
                ];
    const [data, setData] = useState([]);
    useEffect(() => {
        axios({
            method: 'GET',
            url: `${API_BASE_URL}get-listen`,
        }).then(res => {
            setData(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        const options = {
            chart: {
                type: 'bar',
                height: 350,
                width: 700,
            },
            grid: {
                show: false,
                padding: {
                    left: 0,
                    right: 0
                }
            },
            series: [{
                name: 'Lượt nghe',
                data: data.map(item => {
                    return item.listen;
                }),
            }],
            legend: {
                show: false,
                    labels: {
                    colors: ['#ffffff'] // Màu chữ trong chú thích (ví dụ: trắng)
                    }
                },
            dataLabels: {
                    enabled: false
                },
            xaxis: {
                type: 'category',
                categories: data.map(item => {
                    return item.song.title
                }),
                // set show on xaxis label false
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    barWidth: '10%',
                    columnWidth: 40,
                    distributed : true,
                //   horizontal: true,
                }},
        };

        const chart = new ApexCharts(chartRef.current, options);
        chart.render();
        return () => {
            chart.destroy();
        };
    }, [data]);

    return <div ref={chartRef} className='center'></div>;
};
