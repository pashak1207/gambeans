'use client'
import { useEffect } from "react";
import "./StatisticLine.scss"
import Chart from "@/utils/Chart.min.js"

const date = new Date();
const months = ["JAN", "FEB", "MARCH", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
const lastSevenMonths:string[] = [];

for (let i = 0; i < 7; i++) {
    lastSevenMonths.unshift(months[date.getMonth()]);
    date.setMonth(date.getMonth() - 1);
}

export function StatisticLine({dataCounts}:{dataCounts:number[]}) {
    const data = {
        labels: lastSevenMonths,
        datasets: [{
            data: dataCounts,
            fill: false,
            borderColor: 'rgb(149, 164, 252)',
            tension: 0.1
        }]
    };

    useEffect(() => {
        const chart = new Chart(document.getElementById('chartLine'), {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales : {
                    xAxes: [
                    {
                        gridLines : {
                            display : false,
                        },
                        offset: true,
                        ticks: {
                            fontSize: 12,
                            fontColor: "rgba(28, 28, 28, 0.40)",
                            fontFamily: "Inter",
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(28, 28, 28, 0.05)',
                            drawBorder: false,
                        },
                        ticks: {
                            fontSize: 12,
                            fontColor: "rgba(28, 28, 28, 0.40)",
                            fontFamily: "Inter",
                            stepSize: 20000,
                            padding: 16,
                            maxTicksLimit: 5,
                            callback: function (value:number, index:number, values:number[]) {
                                return value > 999 ? (Math.floor(value/1000) + "K") : Math.round(value);
                            },
                        }
                    }]
                },
                
            }
          });
    })

  return <canvas id="chartLine"></canvas>
}