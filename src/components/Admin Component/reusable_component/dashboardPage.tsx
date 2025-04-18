import { JSX, useEffect, useRef } from "react";
import "../../../../styles/dashboard.css";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

// Register only required Chart.js elements
Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);


// I’ve added a full demo of the dashboard page, including:

// KPI Cards (Revenue, Orders, AOV, Conversion, Discounts)

// Trend Visualizations placeholders for Revenue and Discount charts

// Operational Widgets (Pending Orders, Low Stock, Quick Actions)

// Top Products table

// Your original My Customers section refactored into a repeatable map

// Feel free to hook up real data sources, chart libraries (e.g., Recharts), and adjust styles in your dashboard.css to bring these placeholders to life!

// Demo data for the dashboard
// const kpis = [
//   { label: "Total Revenue", value: "$50,000" },
//   { label: "Total Orders", value: "1,200" },
//   { label: "Average Order Value", value: "$42" },
//   { label: "Conversion Rate", value: "3.5%" },
//   { label: "Total Discounts", value: "$2,500" }
// ];

// const topProducts = [
//   { name: "Product A", unitsSold: 120, revenue: "$12,000" },
//   { name: "Product B", unitsSold: 95, revenue: "$9,500" },
//   { name: "Product C", unitsSold: 80, revenue: "$8,000" }
// ];

export default function DashboardComponent(): JSX.Element {
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
    <div id="dashboard_content">
      {/* Dashboard Header */}


      {/* Trend Visualizations */}
      <section id="trend_charts" className="trend_charts">
        <div className="chart_options">
          <div className="chart_container">
            <h3>Revenue Trend</h3>
            <div className="chart_placeholder">[Line Chart Placeholder]</div>
          </div>
          <div className="chart_container">
            <h3>Discount Impact</h3>
            <div className="chart_placeholder">[Area Chart Placeholder]</div>
          </div>
        </div>
        <div className="chart_diagram">
          <canvas
            ref={revenueChartRef}
            className="chart_canvas"
            aria-label="line chart of revenue trend"
          />
          <canvas
            ref={discountChartRef}
            className="chart_canvas"
            aria-label="Discount impact"
          />
        </div>
      </section>

      {/* Operational Widgets */}
      <section id="widgets" className="widgets">
        <div className="widget">
          <h3>Pending Orders</h3>
          <p></p>
        </div>
        <div className="widget">
          <h3>Low Stock Items</h3>
          <p></p>
        </div>
        <div className="widget quick_actions">
          <h3>Quick Actions</h3>
          <button>Add Product</button>
          <button>Create Discount</button>
          <button>Generate Report</button>
        </div>
      </section>

      {/* Top Products Table */}
      <section id="All_active_orders" className="top_products">
        <div className="table_header">
          <h1>All Active Orders</h1>
          <div className="sort_order">
            <button>sort orders</button>
          </div>
        </div>
        <div className="all_order">

        </div>
      </section>



      <section id="all_customers">
        <div id="header">
          <h2>My Customers</h2>
          <input type="text" placeholder="Search for customer" />
        </div>
        <div className="user_info">
          <div className="profile_info">
            <div className="img_container">
              <img src="/images/profile/profile.png" alt="Profile" />
            </div>
            <div className="user_more_info">
              <div className="userEmail">customer@example.com</div>
              <div className="user_sales">$</div>
            </div>
            <nav className="user_profile_control">
              <button>Message</button>
              <button>Email</button>
              <button>Profile</button>
              <button>Discount</button>
            </nav>
          </div>
        </div>
      </section>
      <section className="active_users_leaderBoard"></section>
      <section className="performance_metric">
        {/* 📈 1. Performance Metrics
Impressions: Total number of times your ads were displayed.

Reach: Number of unique users who saw your ads.

Frequency: Average number of times each person saw your ad.

Amount Spent: Total expenditure on your ad campaigns.​
Reddit
Funnel */}
      </section>
      <section className="engagement_metric">
        {/* 🖱️ 2. Engagement Metrics
              Clicks: Total number of clicks on your ads.

              Click-Through Rate (CTR): Percentage of impressions that resulted in clicks.

              Page Engagement: Interactions such as likes, comments, and shares on your ad posts.

              Video Views: Number of times your video ads were watched.​
              OWOX Reports
              +2
              Coupler.io Blog
              +2
              Adsmurai
              +2
              WIRED
              +1
              Log in or sign up to view
              +1 */}
      </section>
      <section className="sales_analysis"></section>
      <section className="conversion_metrics">
        {/* 🎯 3. Conversion Metrics
Conversions: Number of desired actions completed (e.g., purchases, sign-ups).

Conversion Rate: Percentage of clicks that led to conversions.

Cost Per Conversion: Average cost incurred for each conversion.

Return on Ad Spend (ROAS): Revenue generated for every dollar spent on ads. */}
      </section>
      <section className="download_ads_report" >
        {/*  6. Ad Relevance & Quality
Relevance Score: A rating that estimates how well your ad resonates with your target audience.

Engagement Rate Ranking: Comparison of your ad's engagement rate against ads competing for the same audience.

Conversion Rate Ranking: Comparison of your ad's conversion rate against ads with the same optimization goal.*/}
      </section>
      <section className="Download_report"></section>

      {/* Existing My Customers Section */}
    </div>
  );
}
