import { JSX } from "react";
import "../../../../styles/dashboard.css";
import LineChartDiagram from "@/components/ui/card";

export default function DashboardComponent(): JSX.Element {

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
          <svg className="chart_canvas">
            <g transform="translate(60, 40)">
              {/* X‑axis */}
              <g
                transform="translate(0, 300)"
                fill="none"
                fontSize="10"
                fontFamily="sans-serif"
                textAnchor="middle"
              >
                <path
                  className="domain"
                  stroke="currentColor"
                  d="M0.5,6V0.5H660.5V6"
                />
                <g className="tick" opacity={1} transform="translate(0.5,0)">
                  <line stroke="currentColor" y2={6} />
                  <text fill="currentColor" y={9} dy="0.71em">Jan</text>
                </g>
                <g className="tick" opacity={1} transform="translate(110.5,0)">
                  <line stroke="currentColor" y2={6} />
                  <text fill="currentColor" y={9} dy="0.71em">Feb</text>
                </g>
                <g className="tick" opacity={1} transform="translate(220.5,0)">
                  <line stroke="currentColor" y2={6} />
                  <text fill="currentColor" y={9} dy="0.71em">Mar</text>
                </g>
                <g className="tick" opacity={1} transform="translate(330.5,0)">
                  <line stroke="currentColor" y2={6} />
                  <text fill="currentColor" y={9} dy="0.71em">Apr</text>
                </g>
                <g className="tick" opacity={1} transform="translate(440.5,0)">
                  <line stroke="currentColor" y2={6} />
                  <text fill="currentColor" y={9} dy="0.71em">May</text>
                </g>
                <g className="tick" opacity={1} transform="translate(550.5,0)">
                  <line stroke="currentColor" y2={6} />
                  <text fill="currentColor" y={9} dy="0.71em">Jun</text>
                </g>
                <g className="tick" opacity={1} transform="translate(660.5,0)">
                  <line stroke="currentColor" y2={6} />
                  <text fill="currentColor" y={9} dy="0.71em">Jul</text>
                </g>
              </g>

              {/* Y‑axis */}
              <g fill="none" fontSize="10" fontFamily="sans-serif" textAnchor="end">
                <path
                  className="domain"
                  stroke="currentColor"
                  d="M-6,300.5H0.5V0.5H-6"
                />
                <g className="tick" opacity={1} transform="translate(0,300.5)">
                  <line stroke="currentColor" x2={-6} />
                  <text fill="currentColor" x={-9} dy="0.32em">$0K</text>
                </g>
                <g className="tick" opacity={1} transform="translate(0,261.538961038961)">
                  <line stroke="currentColor" x2={-6} />
                  <text fill="currentColor" x={-9} dy="0.32em">$10K</text>
                </g>
                <g className="tick" opacity={1} transform="translate(0,222.5779220779221)">
                  <line stroke="currentColor" x2={-6} />
                  <text fill="currentColor" x={-9} dy="0.32em">$20K</text>
                </g>
                <g className="tick" opacity={1} transform="translate(0,183.61688311688312)">
                  <line stroke="currentColor" x2={-6} />
                  <text fill="currentColor" x={-9} dy="0.32em">$30K</text>
                </g>
                <g className="tick" opacity={1} transform="translate(0,144.65584415584416)">
                  <line stroke="currentColor" x2={-6} />
                  <text fill="currentColor" x={-9} dy="0.32em">$40K</text>
                </g>
                <g className="tick" opacity={1} transform="translate(0,105.6948051948052)">
                  <line stroke="currentColor" x2={-6} />
                  <text fill="currentColor" x={-9} dy="0.32em">$50K</text>
                </g>
                <g className="tick" opacity={1} transform="translate(0,66.73376623376622)">
                  <line stroke="currentColor" x2={-6} />
                  <text fill="currentColor" x={-9} dy="0.32em">$60K</text>
                </g>
                <g className="tick" opacity={1} transform="translate(0,27.77272727272728)">
                  <line stroke="currentColor" x2={-6} />
                  <text fill="currentColor" x={-9} dy="0.32em">$70K</text>
                </g>
              </g>

              <text transform="rotate(-90)" y={-40} x={-150} textAnchor="middle">
                Revenue ($K)
              </text>

              <defs>
                <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2a80b9" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#2a80b9" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <path
                fill="url(#area-gradient)"
                d="M0,183.117C36.667,153.896,73.333,124.675,110,124.675C146.667,124.675,183.333,202.597,220,202.597C256.667,202.597,293.333,66.234,330,66.234C366.667,66.234,403.333,144.156,440,144.156C476.667,144.156,513.333,27.273,550,27.273C586.667,27.273,623.333,56.494,660,85.714L660,300C623.333,300,586.667,300,550,300C513.333,300,476.667,300,440,300C403.333,300,366.667,300,330,300C293.333,300,256.667,300,220,300C183.333,300,146.667,300,110,300C73.333,300,36.667,300,0,300Z"
              />

              <path
                fill="none"
                stroke="#2a80b9"
                strokeWidth={2}
                d="M0,183.117C36.667,153.896,73.333,124.675,110,124.675C146.667,124.675,183.333,202.597,220,202.597C256.667,202.597,293.333,66.234,330,66.234C366.667,66.234,403.333,144.156,440,144.156C476.667,144.156,513.333,27.273,550,27.273C586.667,27.273,623.333,56.494,660,85.714"
              />

              <circle
                className="dot"
                cx={0}
                cy={183.11688311688312}
                r={6}
                fill="#2a80b9"
                style={{ cursor: 'pointer' }}
              />
              <circle
                className="dot"
                cx={110}
                cy={124.67532467532469}
                r={6}
                fill="rgb(42, 128, 185)"
                style={{ cursor: 'pointer' }}
              />
              <circle
                className="dot"
                cx={220}
                cy={202.5974025974026}
                r={6}
                fill="#2a80b9"
                style={{ cursor: 'pointer' }}
              />
              <circle
                className="dot"
                cx={330}
                cy={66.23376623376622}
                r={6}
                fill="rgb(42, 128, 185)"
                style={{ cursor: 'pointer' }}
              />
              <circle
                className="dot"
                cx={440}
                cy={144.15584415584416}
                r={6}
                fill="#2a80b9"
                style={{ cursor: 'pointer' }}
              />
              <circle
                className="dot"
                cx={550}
                cy={27.27272727272728}
                r={6}
                fill="#2a80b9"
                style={{ cursor: 'pointer' }}
              />
              <circle
                className="dot"
                cx={660}
                cy={85.71428571428571}
                r={6}
                fill="#2a80b9"
                style={{ cursor: 'pointer' }}
              />
            </g>
          </svg>
        </div>
      </section>

      {/* Operational Widgets */}
      <section id="all_orders" className="widgets">
        <div className="widget_header">
          <button>Pending Orders

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
          {/* <button>closed Orders</button> */}
          {/* <button>Missed Orders</button> */}
          <div className="all_order_option">
            <button>done</button>
            <button>miss</button>
            <button>Create</button>
            <button>save</button>
          </div>
        </div>
        <div className="table_label">
          <span>Product</span>
          <span>user</span>
          <span>date</span>
          <span>price</span>
        </div>
        <div className="all_orders_container">
          <div className="product_ordered">
            <div className="image_container">
              <span>
                <img src="/images/all/IMG-20250328-WA0045.jpg" alt="product_ordered" />
              </span>
              <span>
                <img src="/images/all/IMG-20250328-WA0045.jpg" alt="product_ordered" />
              </span>
              <span>
                <img src="/images/all/IMG-20250328-WA0045.jpg" alt="product_ordered" />
              </span>
              <span>
                <img src="/images/all/IMG-20250328-WA0045.jpg" alt="product_ordered" />
              </span>
            </div>
            <div className="options">
              <button className="user_email">ucapid@fof.cd</button>
              <button className="date">2025-12-25</button>
              <button className="cancel">cancel</button>
              <button className="mark">mark</button>
              <button className="done">done</button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Products Table */}
      <section id="download_report" className="top_products">
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
      </section>

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
          <div className="profile_info">
            <div className="img_container">
              <img src="/images/profile/profile.png" alt="Profile" />
            </div>
            <div className="user_more_info">
              <div className="userEmail">customer@example.com</div>
              <div className="user_sales">$500

                <span className="coupons" title="5 coupons">
                  5
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
        </div>
      </section>

      <section id="weekly_chart_order">
        <div id="header">
          <button>
            Completed orders
            <span>-25%</span>
          </button>
          <div>18,934</div>
        </div>
        <div id="order_bar_chart">
          <div className="active_container">
            <div className="complete_bar"></div>
          </div>
          <div className="active_container">
            <div className="complete_bar"></div>
          </div>
          <div className="active_container">
            <div className="complete_bar"></div>
          </div>
          <div className="active_container">
            <div className="complete_bar"></div>
          </div>
          <div className="active_container">
            <div className="complete_bar"></div>
          </div>
          <div className="active_container">
            <div className="complete_bar"></div>
          </div>
          <div className="active_container">
            <div className="complete_bar"></div>
          </div>
        </div>
        <div id="order_label">
          <div>
            <span className="color_indicator"></span>
            completed
          </div>
          <span>55%</span>
          <div>
            <span className="active_indicator"></span>
            Active
          </div>
          <span>40%</span>
        </div>
      </section>
      <section id="active_coupons">
        <div id="header">
          <button>
            Coupons Sold
            <span>-25%</span>
          </button>
          <div>18,934</div>
        </div>
        <div id="order_bar_chart">
          <div className="active_container">
            <div className="complete_bar"></div>
          </div>
          <div className="active_container">
            <div className="complete_bar"></div>
          </div>
          <div className="active_container">
            <div className="complete_bar"></div>
          </div>
          <div className="active_container">
            <div className="complete_bar"></div>
          </div>
          <div className="active_container">
            <div className="complete_bar"></div>
          </div>
          <div className="active_container">
            <div className="complete_bar"></div>
          </div>
          <div className="active_container">
            <div className="complete_bar"></div>
          </div>
        </div>
        <div id="order_label">
          <div>
            <span className="color_indicator"></span>
            completed
          </div>
          <span>55%</span>
          <div>
            <span className="active_indicator"></span>
            Active
          </div>
          <span>40%</span>
        </div>
      </section>
      <section id="weekly_sales" >
        <div className="weekly_sales_chart">
          <div className="total_sales_info">
            <div>Weekly sales</div>
            <div>$283K</div>
            <div>+35%</div>
          </div>
          <div id="order_bar_chart">
            <div className="active_container">
              <div className="complete_bar"></div>
            </div>
            <div className="active_container">
              <div className="complete_bar"></div>
            </div>
            <div className="active_container">
              <div className="complete_bar"></div>
            </div>
            <div className="active_container">
              <div className="complete_bar"></div>
            </div>
            <div className="active_container">
              <div className="complete_bar"></div>
            </div>
            <div className="active_container">
              <div className="complete_bar"></div>
            </div>
            <div className="active_container">
              <div className="complete_bar"></div>
            </div>
          </div>
        </div>
        <div className="coupon_sales_chart">
          <div className="total_sales_info">
            <div>Coupon sales</div>
            <div>462K</div>
            <div>-44%</div>
          </div>
          <div id="order_bar_chart">
            {/* <div className="active_container">
              <div className="complete_bar"></div>
            </div>
            <div className="active_container">
              <div className="complete_bar"></div>
            </div>
            <div className="active_container">
              <div className="complete_bar"></div>
            </div>
            <div className="active_container">
              <div className="complete_bar"></div>
            </div>
            <div className="active_container">
              <div className="complete_bar"></div>
            </div>
            <div className="active_container">
              <div className="complete_bar"></div>
            </div>
            <div className="active_container">
              <div className="complete_bar"></div>
            </div> */}

            <svg className="chart_canvas" >
              <g transform="translate(5, 5)">
                <defs>
                  <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3498db" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3498db" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#area-gradient)"
                  d="M0,54.935C10.556,46.169,21.111,37.403,31.667,37.403C42.222,37.403,52.778,60.779,63.333,60.779C73.889,60.779,84.444,19.87,95,19.87C105.556,19.87,116.111,43.247,126.667,43.247C137.222,43.247,147.778,8.182,158.333,8.182C168.889,8.182,179.444,16.948,190,25.714L190,90C179.444,90,168.889,90,158.333,90C147.778,90,137.222,90,126.667,90C116.111,90,105.556,90,95,90C84.444,90,73.889,90,63.333,90C52.778,90,42.222,90,31.667,90C21.111,90,10.556,90,0,90Z"
                />
                <path
                  fill="none"
                  stroke="#2980b9"
                  strokeWidth="1.5"
                  d="M0,54.935C10.556,46.169,21.111,37.403,31.667,37.403C42.222,37.403,52.778,60.779,63.333,60.779C73.889,60.779,84.444,19.87,95,19.87C105.556,19.87,116.111,43.247,126.667,43.247C137.222,43.247,147.778,8.182,158.333,8.182C168.889,8.182,179.444,16.948,190,25.714"
                />
              </g>
            </svg>

          </div>
        </div>
      </section>
      {/* Existing My Customers Section */}
    </div>
  );
}
