import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

// 1) Register Chart.js internals
Chart.register(...registerables);  // :contentReference[oaicite:4]{index=4}

export default function GroupedCouponChart() {
  // 2) Single ref for the canvas
  const chartRef = useRef<HTMLCanvasElement>(null);  // :contentReference[oaicite:5]{index=5}

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    // 3) Clean up any previous chart instance
    Chart.getChart(canvas)?.destroy();  // :contentReference[oaicite:6]{index=6}

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 4) Instantiate a grouped bar chart
    new Chart(ctx, {
      type: "bar",  // grouped bars by default :contentReference[oaicite:7]{index=7}
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],  // :contentReference[oaicite:8]{index=8}
        datasets: [
          {
            label: "Active Coupons",
            data: [120, 135, 150, 145, 160],
            backgroundColor: "#4CAF50",
          },
          {
            label: "Missed Coupons",
            data: [30, 25, 20, 22, 18],
            backgroundColor: "#F44336",
          },
          {
            label: "New Coupons",
            data: [40, 45, 50, 60, 55],
            backgroundColor: "#FFC107",
          },
          {
            label: "Used Coupons",
            data: [80, 90, 100, 95, 110],
            backgroundColor: "#2196F3",
          }
        ]
      },
      options: {
        responsive: true,  // :contentReference[oaicite:9]{index=9}
        plugins: {
          legend: { position: "bottom" }  // :contentReference[oaicite:10]{index=10}
        },
        scales: {
          // 5) Ensure bars are side by side, not stacked
          x: { stacked: false },               // :contentReference[oaicite:11]{index=11}
          y: { stacked: false, beginAtZero: true }  // :contentReference[oaicite:12]{index=12}
        }
      }
    });
  }, []);  // run once on mount

  // 6) Return only the canvas
  return <canvas ref={chartRef} className="chart_canvas" aria-label="Grouped Coupon Chart" />;  // :contentReference[oaicite:13]{index=13}
}
