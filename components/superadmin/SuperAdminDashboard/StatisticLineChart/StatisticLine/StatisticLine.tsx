'use client'
import { useEffect } from "react";
import "./StatisticLine.scss"
import  { Chart, LinearScale, BarElement, BarController, CategoryScale, ChartItem } from "chart.js"

Chart.register(LinearScale, BarElement, BarController, CategoryScale);

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const colors = ["#95A4FC", "#BAEDBD", "#1C1C1C", "#B1E3FF", "#A8C5DA", "#A1E3CB"]

export function StatisticLine({dataCounts}:{dataCounts:number[]}) {
    const data = {
        labels: months,
        datasets: [{
            data: dataCounts,
            fill: false,
            borderRadius: 4,
            barThickness: 16,
            backgroundColor: (c:any) => colors.concat(colors)[c.dataIndex],
        }]
    };

    useEffect(() => {
        new Chart(document.getElementById('chartLine') as ChartItem, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales : {
                    x: {
                        offset: true,
                        grid:{
                            display: false
                        },
                        ticks: {
                            color: "rgba(28, 28, 28, 0.40)",
                            font:{
                                size: 12,
                                family: "Inter"
                            }
                        },
                    },
                    y: {
                        grid: {
                            color: 'rgba(28, 28, 28, 0.05)',
                        },
                        border:{
                            display: false
                        },
                        ticks: {
                            callback: function(val, index) {
                                return +val > 999 ? (Math.floor(+val/1000) + "K") : val;
                            },
                            stepSize: 1,
                            color: "rgba(28, 28, 28, 0.40)",
                            font:{
                                size: 12,
                                family: "Inter"
                            },
                            padding: 16,
                            maxTicksLimit: 5,
                            
                        }
                    }
                },
                
            }
          });
    })

  return <canvas id="chartLine"></canvas>
}