'use client'
import { useEffect } from "react";
import "./StatisticDoughnut.scss"
import  { Chart, ChartItem, DoughnutController, ArcElement } from "chart.js"

Chart.register(DoughnutController, ArcElement);

export function StatisticDoughnut({percentageData}:{percentageData: {filter: string, color: string, sum: string}[]}) {
    const data = {
        datasets: [{
          data: percentageData.map(item => item.sum),
          backgroundColor: percentageData.map(item => item.color),
          borderRadius: {
            outerStart: 70,
            outerEnd: 70,
            innerStart: 40,
            innerEnd: 40
          }
        }]
      };

    useEffect(() => {
        const chart = new Chart(document.getElementById('chartDoughnut') as ChartItem, {
            type: 'doughnut',
            data: data,
            options: {
                events: []
            }
        })        

        return () => {
            chart.destroy();
        }
    })

  return <canvas key={new Date().getTime().toString()} id="chartDoughnut"></canvas>
}