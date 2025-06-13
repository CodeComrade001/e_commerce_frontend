import { JSX, useEffect, useState } from "react";
import "../../../../styles/dashboard.css";
import { fetchAdminAllOrders, fetchAdminMonthlyOrders, fetchAdminMonthlyOrdersLine, fetchAdminWeeklyCompletionStats, fetchAdminWeeklyCouponRatios, fetchAdminWeeklySalesChange, fetchAdminWeeklySalesChangeLine } from "@/services/api";
import { OrderCategoryGroup, userDetailsLeaderBoard } from "@/services/dataTypes";
import { fetchAdminCustomerSummary } from '../../../services/api';
import LineChart from "@/components/ui/line-chart";
import LoaderIcon from "../reusable_module/loadingIcon";

export default function DashboardComponent(): JSX.Element {
  const [orders, setOrders] = useState<{ result: boolean; data: OrderCategoryGroup[] } | null>(null)
  console.log("🚀 ~ DashboardComponent ~ orders:", orders)
  const [customers, setCustomers] = useState<userDetailsLeaderBoard[]>([])
  const [monthlyOrderChart, setMonthlyOrderChart] = useState<{ month: string; count: number }[]>([])
  console.log("🚀 ~ DashboardComponent ~ monthlyOrderChart:", monthlyOrderChart)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [weeklySalesChange, setWeeklySalesChange] = useState<{
    currentWeek: number;
    previousWeek: number;
    pctChange: number | null;
    discountUsed: number;
    noDiscount: number;
  } | null>(null)
  console.log("🚀 ~ DashboardComponent ~ weeklySalesChange:", weeklySalesChange)
  const [monthlyLine, setMonthlyLine] = useState<{ month: string; count: number }[]>([])
  console.log("🚀 ~ DashboardComponent ~ monthlyLine:", monthlyLine)
  const [completionStats, setCompletionStats] = useState<{ date: string; completed: number; active: number }[]>([])
  console.log("🚀 ~ DashboardComponent ~ completionStats:", completionStats)
  const [weeklySalesRatios, setWeeklySalesRatios] = useState<{ date: string; completed: number; canceled: number }[]>([])
  console.log("🚀 ~ DashboardComponent ~ weeklySalesRatios:", weeklySalesRatios)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)

      try {
        // 2. Kick off all five in parallel:
        const [
          ordersRes,
          customersRes,
          orderMonthlyChartRes,
          orderMonthlyLineRes,
          completionRes,
          // OrderWeeklyChangeRes,
          weeklySalesRatioRes,
        ] = await Promise.all([
          fetchAdminAllOrders(),
          fetchAdminCustomerSummary(),
          fetchAdminMonthlyOrders(),
          fetchAdminMonthlyOrdersLine(),
          fetchAdminWeeklyCompletionStats(),
          // fetchAdminWeeklySalesChange(),
          fetchAdminWeeklyCouponRatios(),
        ])

        // 3. Unwrap and set each piece of state:
        setOrders(ordersRes.data)

        // customer-summary comes back as plain array:
        setCustomers(customersRes.data)

        //monthly order chart
        setMonthlyOrderChart(orderMonthlyChartRes.data)

        // monthly orders line chart:
        setMonthlyLine(orderMonthlyLineRes.data)

        // sales weekly :
        // setWeeklySalesChange(OrderWeeklyChangeRes.data)

        // weekly completion stats:
        setCompletionStats(completionRes.data)

        // weekly coupon ratios:
        setWeeklySalesRatios(weeklySalesRatioRes.data)
      } catch (err: any) {
        console.error(err)
        setError(err.message ?? 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) return <LoaderIcon />
  if (error) return <div>Error: {error}</div>

  if (loading) return <LoaderIcon />
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>
  return (
    <div id="dashboard_content">
      {/* Trend Visualizations */}
      <section id="trend_charts" className="trend_charts">
        <div className="chart_options">
          {/* <div className="chart_type"> position absolute</div> */}
          <button className="chart_category">
            Sales Report
            <i className="dropdown_widget_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-down-fill"
                viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            </i>
          </button>
          <div className="date_container" >
            <input type="date" className="start_date" placeholder="Enter date" name="" id="" />
            <div>
              ==⫸
            </div>
            <input type="date" className="end_date" placeholder="Enter date" name="" id="" />
          </div>
          <div className="graph_review">
            A graph is a set of vertices (nodes) connected by edges (links), modeling pairwise relationships in data
          </div>
        </div>
        <div className="chart_diagram">
          <LineChart />
        </div>
      </section>

      {/* Operational Widgets */}
      <section id="all_orders" className="widgets">
        <div className="widget_header">
          <div>All Orders

            <i className="dropdown_widget_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-down-fill"
                viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            </i>
          </div>
          {/* <button>closed Orders</button> */}
          {/* <button>Missed Orders</button> */}
          <div className="all_order_option">
            <button>More</button>
          </div>
        </div>
        <div className="table_label">
          <span>Product</span>
          <span>user</span>
          <span>date</span>
          <span>price</span>
        </div>
        <div className="all_orders_container">
          {orders !== null && orders.data.length > 0 ?

            orders.data.map((items, index) => (
              <div key={index} className="product_ordered">
                <div className="image_container">
                  {Array.from({ length: 4 }).map((_, idx) => {
                    const product = items.products[idx];
                    return (
                      <span key={idx}>
                        {product
                          ? <img src={product.image_url} alt={product.title} />
                          : <div className="placeholder" />}
                      </span>
                    );
                  })}
                </div>
                <div className="options">
                  <button className="user_email">{items.user_id_gmail}</button>
                  <button className="date">
                    {new Date(items.ordered_at).toLocaleString("en-GB", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",   // optional
                      hour12: false        // use true if you want 12-hour AM/PM
                    })}
                  </button>
                  <button className="cancel">cancel</button>
                  <button className="mark">mark</button>
                  <button className="done">done</button>
                </div>
              </div>
            ))
            :
            <p>
              No Order Available
            </p>
          }
        </div>
      </section >

      {/* Top Products Table */}
      <section id="download_report" className="top_products" >
        <div id="table_header">
          <span>
            Download Report
          </span>
          <button title="save">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
            </svg>
          </button>
          <button title="refresh">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
          </button>
        </div>
        <div className="table_body">
          <div className="post">
            <input type="checkbox" name="" id="" placeholder="mark" />
            <span className="report_type" >
              Coupon Report
              <span className="last_refresh" >5 min</span>
            </span>
            <span className="download_option" >
              <button title="save">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                </svg>
              </button>
              <button title="refresh">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg>
              </button>
            </span>
          </div>
        </div>
      </section >

      <section id="all_customers">
        <div id="header">
          <h2>My Customers</h2>
          <input type="text" placeholder="Search for customer" />
        </div>
        <div id="mark_items_option">
          <div className="sort_leaderBoard">Sort LeaderBoard</div>
          <div>
            <button title="message">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
              </svg>
            </button>
            <button title="email">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-arrow-down-fill" viewBox="0 0 16 16">
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zm.192 8.159 6.57-4.027L8 9.586l1.239-.757.367.225A4.49 4.49 0 0 0 8 12.5c0 .526.09 1.03.256 1.5H2a2 2 0 0 1-1.808-1.144M16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z" />
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-1.646a.5.5 0 0 1-.722-.016l-1.149-1.25a.5.5 0 1 1 .737-.676l.28.305V11a.5.5 0 0 1 1 0v1.793l.396-.397a.5.5 0 0 1 .708.708z" />
              </svg>
            </button>
            <button title="profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
              </svg>
            </button>
            <button title="coupon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tags-fill" viewBox="0 0 16 16">
                <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="user_info">
          {customers.length > 0 &&
            customers.map((items, index) => (
              <div key={index} className="profile_info">
                <div className="img_container">
                  <img src={items.avatar_url} alt="Profile" />
                </div>
                <div className="user_more_info">
                  <div className="userEmail">{items.email}</div>
                  <div className="user_sales">{items.totalSpent}

                    <span className="coupons" title="5 coupons">
                      {items.totalDiscount}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tags-fill" viewBox="0 0 16 16">
                        <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                        <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <nav className="user_profile_control">
                  <button title="message">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                      <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                    </svg>
                  </button>
                  <button title="email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-arrow-down-fill" viewBox="0 0 16 16">
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zm.192 8.159 6.57-4.027L8 9.586l1.239-.757.367.225A4.49 4.49 0 0 0 8 12.5c0 .526.09 1.03.256 1.5H2a2 2 0 0 1-1.808-1.144M16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z" />
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-1.646a.5.5 0 0 1-.722-.016l-1.149-1.25a.5.5 0 1 1 .737-.676l.28.305V11a.5.5 0 0 1 1 0v1.793l.396-.397a.5.5 0 0 1 .708.708z" />
                    </svg>
                  </button>
                  <button title="profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                  </button>
                  <button title="coupon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tags-fill" viewBox="0 0 16 16">
                      <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                      <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z" />
                    </svg>
                  </button>
                </nav>
              </div>
            ))}
        </div>
      </section>

      {/* weekly chart showing ration of complete orders to missed ordrers
            I will be passing to the complete bar as percentage 
             */}
      <section id="weekly_chart_order">
        {/* completionStats */}
        <div id="header">
          <button>
            Completed Orders To Active Orders
            {/* <span>-25%</span> */}
          </button>
          <div>{completionStats.length > 0
            ? (() => {
              const totalOrders = completionStats.reduce((sum, item) => {
                const c = Number(item.completed);
                const a = Number(item.active);
                return (
                  sum
                  + (isNaN(c) ? 0 : c)
                  + (isNaN(a) ? 0 : a)
                );
              }, 0);
              return totalOrders;
            })()
            : "0"}
          </div>
        </div>
        <div id="order_bar_chart">
          {completionStats.length > 0 &&
            completionStats.map((item, index) => {
              // 1. Total orders for the day
              const total = item.completed + item.active;
              console.log("🚀 ~ completionStats.map ~ total:", total)

              // 2. Percentages (avoid divide-by-zero)
              const completedPct = total > 0
                ? (item.completed / total) * 100
                : 0;
              console.log("🚀 ~ completionStats.map ~ completedPct:", completedPct)
              const activePct = total > 0
                ? (item.active / total) * 100
                : 0;
              console.log("🚀 ~ completionStats.map ~ activePct:", activePct)

              return (
                <div
                  key={index}
                  className="day-bar-container"
                >
                  {/* Missed orders (active_container) */}
                  <div
                    className="active_container"
                    style={{ height: `${activePct}%` }}
                    title={`${item.active} active (${activePct.toFixed(1)}%)`}
                  />

                  {/* Completed orders (complete_bar) */}
                  <div
                    className="complete_bar"
                    style={{ height: `${completedPct}%` }}
                    title={`${item.completed} completed (${completedPct.toFixed(1)}%)`}
                  />
                </div>
              );
            })
          }
        </div>
        <div id="order_label">
          <div>
            <span className="color_indicator"></span>
            Completed Order
          </div>
          <span>
            {completionStats.length > 0
              ? (() => {
                const totalCompleted = completionStats.reduce((sum, item) => {
                  // parse item.active as a number (drops any leading zeros)
                  const completeCount = Number(item.completed);
                  return sum + (isNaN(completeCount) ? 0 : completeCount);
                }, 0);
                return totalCompleted;
              })()
              : "0"}
          </span>
          <div>
            <span className="active_indicator"></span>
            Active Order
          </div>
          <span>{completionStats.length > 0
            ? (() => {
              const totalActive = completionStats.reduce((sum, item) => {
                // parse item.active as a number (drops any leading zeros)
                const activeCount = Number(item.active);
                return sum + (isNaN(activeCount) ? 0 : activeCount);
              }, 0);
              return totalActive;
            })()   // ← invoke the IIFE here
            : "0"}
          </span>
        </div>
      </section >
      {/* weekly chart showing ration of used discount  to remaining discount
            I will be passing to the complete bar as percentage 
             */}
      <section id="active_coupons" >
        <div id="header">
          <button>
            Completed Order to Canceled Order
            {/* <span>-25%</span> */}
          </button>
          <div>
            {weeklySalesRatios.length > 0
              ? (() => {
                const totalOrders = weeklySalesRatios.reduce((sum, item) => {
                  const c = Number(item.completed);
                  const m = Number(item.canceled);
                  return (
                    sum
                    + (isNaN(c) ? 0 : c)
                    + (isNaN(m) ? 0 : m)
                  );
                }, 0);
                return totalOrders;
              })()
              : "0"}

          </div>
        </div>
        <div id="order_bar_chart">
          {weeklySalesRatios.length > 0 &&
            weeklySalesRatios.map((item, index) => {
              // 1. Total orders for the day
              const total = item.completed + item.canceled;

              // 2. Percentages (avoid divide-by-zero)
              const completedPct = total > 0
                ? (item.completed / total) * 100
                : 0;
              const missedPct = total > 0
                ? (item.canceled / total) * 100
                : 0;

              return (
                <div
                  key={index}
                  className="day-bar-container"
                >
                  {/* Missed orders (active_container) */}
                  <div
                    className="active_container"
                    style={{ height: `${missedPct}%` }}
                    title={`${item.canceled} canceled (${missedPct.toFixed(1)}%)`}
                  />

                  {/* Completed orders (complete_bar) */}
                  <div
                    className="complete_bar"
                    style={{ height: `${completedPct}%` }}
                    title={`${item.completed} completed (${completedPct.toFixed(1)}%)`}
                  />
                </div>
              );
            })
          }
        </div>
        <div id="order_label">
          <div>
            <span className="color_indicator"></span>
            Completed Order
          </div>
          <span>{weeklySalesRatios.length > 0
            ? (() => {
              const totalCompleted = weeklySalesRatios.reduce((sum, item) => {
                // parse item.active as a number (drops any leading zeros)
                const completeCount = Number(item.completed);
                return sum + (isNaN(completeCount) ? 0 : completeCount);
              }, 0);
              return totalCompleted;
            })()
            : "0"}</span>
          <div>
            <span className="active_indicator"></span>
            Canceled Order
          </div>
          <span>
            {weeklySalesRatios.length > 0
              ? (() => {
                const totalCompleted = weeklySalesRatios.reduce((sum, item) => {
                  // parse item.active as a number (drops any leading zeros)
                  const completeCount = Number(item.canceled);
                  return sum + (isNaN(completeCount) ? 0 : completeCount);
                }, 0);
                return totalCompleted;
              })()
              : "0"}</span>
        </div>
      </section >

      {/* weekly chart showing chart of current week without the use of coupon
            I will be passing to the complete bar as percentage 
             */}
      <section id="weekly_sales">
        <div className="weekly_sales_chart">
          <div className="metrics_input_panel">
            <label>
              Weekly Revenue:
              <input type="number" id="input_weekly_revenue" placeholder="e.g. 320000" />
            </label>
            <label>
              Weekly Cost:
              <input type="number" id="input_weekly_cost" placeholder="e.g. 37000" />
            </label>
            <label>
              Last Week Revenue:
              <input type="number" id="input_last_week_revenue" placeholder="e.g. 265000" />
            </label>
            <button id="calculate_metrics_btn">Calculate</button>
          </div>

          <div className="total_sales_info">
            <div id="display_profit">Profit: $—</div>
            <div id="display_margin">Margin: —%</div>
            <div id="display_growth">Growth: —%</div>
          </div>
        </div>
      </section>


      {/* Existing My Customers Section */}
    </div >
  );
}
