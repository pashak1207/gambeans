'use client'
import { useEffect } from "react";
import "./StatisticDoughnut.scss"
import  { Chart, LinearScale, BarElement, BarController, CategoryScale, ChartItem } from "chart.js"

Chart.register(LinearScale, BarElement, BarController, CategoryScale);

export function StatisticDoughnut({percentageData}:{percentageData: {filter: string, color: string, sum: string}[]}) {
    useEffect(() => {
        Chart.defaults.RoundedDoughnut    = Chart.helpers.clone(Chart.defaults.doughnut);
        Chart.controllers.RoundedDoughnut = Chart.controllers.doughnut.extend({
            draw: function(ease :number) {
                const ctx           = this.chart.ctx;
                const easingDecimal = ease || 1;
                const arcs          = this.getMeta().data;
                Chart.helpers.each(arcs, function(arc:any, i:number) {
                    arc.transition(easingDecimal).draw();

                    const pArc   = arcs[i === 0 ? arcs.length - 1 : i - 1];
                    const pColor = pArc._view.backgroundColor;

                    const vm         = arc._view;
                    const radius     = (vm.outerRadius + vm.innerRadius) / 2;
                    const thickness  = (vm.outerRadius - vm.innerRadius) / 2;
                    const startAngle = Math.PI - vm.startAngle - Math.PI / 2;
                    const angle      = Math.PI - vm.endAngle - Math.PI / 2;

                    ctx.save();
                    ctx.translate(vm.x, vm.y);

                    ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
                    ctx.beginPath();
                    ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
                    ctx.fill();

                    ctx.fillStyle = vm.backgroundColor;
                    ctx.beginPath();
                    ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
                    ctx.fill();

                    ctx.restore();
                });
            }
        });

        window.onload = function() {
            new Chart(document.getElementById('chartDoughnut'), {
                type   : 'RoundedDoughnut',
                data   : {
                    datasets: [
                        {
                            data: percentageData.map(i => +i.sum),
                            backgroundColor: percentageData.map(i => i.color),
                            borderWidth    : 0
                        }]
                },
                options: {
                    cutoutPercentage: 70,
                    responsive: true,
                    maintainAspectRatio: false,
                }
            });
        };
    })

  return <canvas id="chartDoughnut"></canvas>
}