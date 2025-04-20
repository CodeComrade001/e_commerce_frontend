import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";


export default function LineChartDiagram() {
  const revenueChartRef = useRef<HTMLCanvasElement>(null);
  const discountChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const initChart = (
      canvas: HTMLCanvasElement | null,
      data: number[],
      label: string,
      borderColor: string
    ) => {
      if (!canvas) return;

      // Destroy existing chart instance if it exists
      const existingChart = Chart.getChart(canvas);
      if (existingChart) {
        existingChart.destroy();
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "January", "February", "March", "April", "May", "June",
            "July", "Aug", "Sep", "Oct", "Nov", "Dec"
          ],
          datasets: [
            {
              label,
              data,
              fill: false,
              borderColor,
              tension: 0.1
            }
          ]
        },

        options: {
          plugins: { legend: { display: false } },
          scales: {
            x: { display: true },
            y: { display: false }
          }
        }
      });
    };

    // Initialize both charts
    initChart(
      revenueChartRef.current,
      [65, 59, 80, 81, 56, 55, 40, 45, 70, 75, 60, 90],
      "Revenue Trend",
      "#4A5568"
    );
    initChart(
      discountChartRef.current,
      [5, 10, 3, 8, 7, 12, 4, 6, 9, 11, 2, 5],
      "Discount Impact",
      "#3182CE"
    );

    // Cleanup on unmount
    return () => {
      if (revenueChartRef.current) Chart.getChart(revenueChartRef.current)?.destroy();
      if (discountChartRef.current) Chart.getChart(discountChartRef.current)?.destroy();
    };
  }, []);
  return (
    <canvas
      ref={revenueChartRef}
      className="chart_canvas"
      aria-label="line chart of revenue trend"
    />
  )
}