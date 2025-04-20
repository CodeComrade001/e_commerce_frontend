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
          <button className="chart_category">Sales Report</button>
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
          <LineChartDiagram />
        </div>
      </section>

      {/* Operational Widgets */}
      <section id="all_orders" className="widgets">
        <div className="widget_header">
          <button>Pending Orders</button>
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
          <button>save</button>
          <button>Refresh</button>
        </div>
        <div className="table_body">
          <div className="post">
            <input type="checkbox" name="" id="" placeholder="mark" />
            <span className="report_type" >
              Coupon Report
              <span className="last_refresh" >5 min</span>
            </span>
            <span className="download_option" >
              <button>Delete</button>
              <button>Save</button>
              <button>refresh</button>
            </span>
          </div>
          <div className="post">
            <input type="checkbox" name="" id="" placeholder="mark" />
            <span className="report_type" >
              Coupon Report
              <span className="last_refresh" >5 min</span>
            </span>
            <span className="download_option" >
              <button>Delete</button>
              <button>Save</button>
              <button>refresh</button>
            </span>
          </div>
          <div className="post">
            <input type="checkbox" name="" id="" placeholder="mark" />
            <span className="report_type" >
              Coupon Report
              <span className="last_refresh" >5 min</span>
            </span>
            <span className="download_option" >
              <button>Delete</button>
              <button>Save</button>
              <button>refresh</button>
            </span>
          </div>
          <div className="post">
            <input type="checkbox" name="" id="" placeholder="mark" />
            <span className="report_type" >
              Coupon Report
              <span className="last_refresh" >5 min</span>
            </span>
            <span className="download_option" >
              <button>Delete</button>
              <button>Save</button>
              <button>refresh</button>
            </span>
          </div>
          <div className="post">
            <input type="checkbox" name="" id="" placeholder="mark" />
            <span className="report_type" >
              Coupon Report
              <span className="last_refresh" >5 min</span>
            </span>
            <span className="download_option" >
              <button>Delete</button>
              <button>Save</button>
              <button>refresh</button>
            </span>
          </div>
          <div className="post">
            <input type="checkbox" name="" id="" placeholder="mark" />
            <span className="report_type" >
              Coupon Report
              <span className="last_refresh" >5 min</span>
            </span>
            <span className="download_option" >
              <button>Delete</button>
              <button>Save</button>
              <button>refresh</button>
            </span>
          </div>
          <div className="post">
            <input type="checkbox" name="" id="" placeholder="mark" />
            <span className="report_type" >
              Coupon Report
              <span className="last_refresh" >5 min</span>
            </span>
            <span className="download_option" >
              <button>Delete</button>
              <button>Save</button>
              <button>refresh</button>
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
            <button>Email</button>
            <button>Discount</button>
            <button>Message</button>
            <button>profile</button>
          </div>
        </div>
        <div className="user_info">
          <div className="profile_info">
            <div className="img_container">
              <img src="/images/profile/profile.png" alt="Profile" />
            </div>
            <div className="user_more_info">
              <div className="userEmail">customer@example.com</div>
              <div className="user_sales">$500</div>
            </div>
            <div className="coupons" >
              5
            </div>
            <nav className="user_profile_control">
              <button>Message</button>
              <button>Email</button>
              <button>Profile</button>
              <button>Coupons</button>
            </nav>
          </div>
          <div className="profile_info">
            <div className="img_container">
              <img src="/images/profile/profile.png" alt="Profile" />
            </div>
            <div className="user_more_info">
              <div className="userEmail">customer@example.com</div>
              <div className="user_sales">$500</div>
            </div>
            <div className="coupons" >
              5
            </div>
            <nav className="user_profile_control">
              <button>Message</button>
              <button>Email</button>
              <button>Profile</button>
              <button>Coupons</button>
            </nav>
          </div>
          <div className="profile_info">
            <div className="img_container">
              <img src="/images/profile/profile.png" alt="Profile" />
            </div>
            <div className="user_more_info">
              <div className="userEmail">customer@example.com</div>
              <div className="user_sales">$500</div>
            </div>
            <div className="coupons" >
              5
            </div>
            <nav className="user_profile_control">
              <button>Message</button>
              <button>Email</button>
              <button>Profile</button>
              <button>Coupons</button>
            </nav>
          </div>
          <div className="profile_info">
            <div className="img_container">
              <img src="/images/profile/profile.png" alt="Profile" />
            </div>
            <div className="user_more_info">
              <div className="userEmail">customer@example.com</div>
              <div className="user_sales">$500</div>
            </div>
            <div className="coupons" >
              5
            </div>
            <nav className="user_profile_control">
              <button>Message</button>
              <button>Email</button>
              <button>Profile</button>
              <button>Coupons</button>
            </nav>
          </div>
          <div className="profile_info">
            <div className="img_container">
              <img src="/images/profile/profile.png" alt="Profile" />
            </div>
            <div className="user_more_info">
              <div className="userEmail">customer@example.com</div>
              <div className="user_sales">$500</div>
            </div>
            <div className="coupons" >
              5
            </div>
            <nav className="user_profile_control">
              <button>Message</button>
              <button>Email</button>
              <button>Profile</button>
              <button>Coupons</button>
            </nav>
          </div>
          <div className="profile_info">
            <div className="img_container">
              <img src="/images/profile/profile.png" alt="Profile" />
            </div>
            <div className="user_more_info">
              <div className="userEmail">customer@example.com</div>
              <div className="user_sales">$500</div>
            </div>
            <div className="coupons" >
              5
            </div>
            <nav className="user_profile_control">
              <button>Message</button>
              <button>Email</button>
              <button>Profile</button>
              <button>Coupons</button>
            </nav>
          </div>
          <div className="profile_info">
            <div className="img_container">
              <img src="/images/profile/profile.png" alt="Profile" />
            </div>
            <div className="user_more_info">
              <div className="userEmail">customer@example.com</div>
              <div className="user_sales">$500</div>
            </div>
            <div className="coupons" >
              5
            </div>
            <nav className="user_profile_control">
              <button>Message</button>
              <button>Email</button>
              <button>Profile</button>
              <button>Coupons</button>
            </nav>
          </div>
          <div className="profile_info">
            <div className="img_container">
              <img src="/images/profile/profile.png" alt="Profile" />
            </div>
            <div className="user_more_info">
              <div className="userEmail">customer@example.com</div>
              <div className="user_sales">$500</div>
            </div>
            <div className="coupons" >
              5
            </div>
            <nav className="user_profile_control">
              <button>Message</button>
              <button>Email</button>
              <button>Profile</button>
              <button>Coupons</button>
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
            Coupon Overview
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
            <div>Weekly sales</div>
            <div>$283K</div>
            <div>+35%</div>
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
            <LineChartDiagram />
          </div>
        </div>
      </section>
      {/* Existing My Customers Section */}
    </div>
  );
}
