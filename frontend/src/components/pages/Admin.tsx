

import { JSX, useCallback, useEffect, useState } from "react";
import "../../../styles/admin.css";
import DashboardComponent from "../Admin Component/reusable_component/dashboardPage";
import BlogComponent from "../Admin Component/reusable_component/blogPage";
import AllProductComponent from "../Admin Component/reusable_component/AllProductPage";
import MessageComponent from "../Admin Component/reusable_component/MessagePage";
import VideosComponent from "../Admin Component/reusable_component/VideoPage";
import SecurityComponent from "../Admin Component/reusable_component/SecurityPage";
import AllOrderComponent from "../Admin Component/reusable_component/AllOrderPage";

export default function AdminHome(): JSX.Element {
  const [selectedView, setSelectedView] = useState('dashboard');

  // A mapping from view to button class can be defined.
  const activeBtnMapping: Record<string, string> = {
    dashboard: "active_admin_dashboard",
    blog: "active_admin_blog",
    message: "active_admin_message",
    videos: "active_admin_videos",
    product: "active_admin_products",
    security: "active_admin_security",
    all_orders: "active_admin_all_orders",
  };

  // Compute active button class from selectedView without needing state
  const activeBtn = activeBtnMapping[selectedView] || "active_admin_dashboard";
  console.log("🚀 ~ AdminHome ~ activeBtn:", activeBtn)

  const renderSideViewContent = useCallback(() => {
    switch (selectedView) {
      case 'dashboard':
        return <DashboardComponent />;
      case 'blog':
        return <BlogComponent />;
      case 'message':
        return <MessageComponent />;
      case 'videos':
        return <VideosComponent />;
      case 'product':
        return <AllProductComponent />;
      case 'security':
        return <SecurityComponent />;
      case 'all_orders':
        return <AllOrderComponent />;
      default:
        return <DashboardComponent />;
    }
  }, [selectedView]);

  useEffect(() => {
    renderSideViewContent()
  }, [activeBtn])

  return (
    <div id="admin_container">
      <div id="admin_header">
        <div id="logo">
          {/* <h1 id="text3d">
            DIVINEYAH Fashion
          </h1> */}
          <img src="/new logo.png" alt="website logo" />
        </div>
        <div id="Admin_widget">
          <button
            className="admin_widget_icon"
            title="change mode"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z" fill="#202227"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25ZM4.39861 4.39861C4.6915 4.10572 5.16638 4.10572 5.45927 4.39861L5.85211 4.79145C6.145 5.08434 6.145 5.55921 5.85211 5.85211C5.55921 6.145 5.08434 6.145 4.79145 5.85211L4.39861 5.45927C4.10572 5.16638 4.10572 4.6915 4.39861 4.39861ZM19.6011 4.39887C19.894 4.69176 19.894 5.16664 19.6011 5.45953L19.2083 5.85237C18.9154 6.14526 18.4405 6.14526 18.1476 5.85237C17.8547 5.55947 17.8547 5.0846 18.1476 4.79171L18.5405 4.39887C18.8334 4.10598 19.3082 4.10598 19.6011 4.39887ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3C3.41421 11.25 3.75 11.5858 3.75 12C3.75 12.4142 3.41421 12.75 3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM20.25 12C20.25 11.5858 20.5858 11.25 21 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21C20.5858 12.75 20.25 12.4142 20.25 12ZM18.1476 18.1476C18.4405 17.8547 18.9154 17.8547 19.2083 18.1476L19.6011 18.5405C19.894 18.8334 19.894 19.3082 19.6011 19.6011C19.3082 19.894 18.8334 19.894 18.5405 19.6011L18.1476 19.2083C17.8547 18.9154 17.8547 18.4405 18.1476 18.1476ZM5.85211 18.1479C6.145 18.4408 6.145 18.9157 5.85211 19.2086L5.45927 19.6014C5.16638 19.8943 4.6915 19.8943 4.39861 19.6014C4.10572 19.3085 4.10572 18.8336 4.39861 18.5407L4.79145 18.1479C5.08434 17.855 5.55921 17.855 5.85211 18.1479ZM12 20.25C12.4142 20.25 12.75 20.5858 12.75 21V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V21C11.25 20.5858 11.5858 20.25 12 20.25Z" fill="#202227"></path>
              </g>
            </svg>
          </button>
          <button
            className="admin_widget_icon"
            title="view notification"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round">
              </g>
              <g id="SVGRepo_iconCarrier">
                <path d="M9.0003 21H15.0003M18.0003 8.6C18.0003 7.11479 17.3682 5.69041 16.2429 4.6402C15.1177 3.59 13.5916 3 12.0003 3C10.409 3 8.88288 3.59 7.75766 4.6402C6.63245 5.69041 6.0003 7.11479 6.0003 8.6C6.0003 11.2862 5.32411 13.1835 4.52776 14.4866C3.75646 15.7486 3.37082 16.3797 3.38515 16.5436C3.40126 16.7277 3.4376 16.7925 3.58633 16.9023C3.71872 17 4.34793 17 5.60636 17H18.3943C19.6527 17 20.2819 17 20.4143 16.9023C20.563 16.7925 20.5994 16.7277 20.6155 16.5436C20.6298 16.3797 20.2441 15.7486 19.4729 14.4866C18.6765 13.1835 18.0003 11.2862 18.0003 8.6Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                </path> </g>
            </svg>
          </button>
          <button className="admin_widget_icon">
            <img src="images/profile/profile.png" alt="admin_profile" />
          </button>
        </div>
      </div>
      <div id="side_bar">
        <div id="side_bar_items">
          {/* Use Link to navigate without a page refresh */}
          <button
            className={`admin_button_grouping ${selectedView === "dashboard" ? activeBtn : ""}`}
            onClick={() => setSelectedView('dashboard')}
          >
            <i className="dropdown_widget_icon">
              <svg
                fill="#000000"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                id="dashboard-alt" className="icon glyph">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M14,10V22H4a2,2,0,0,1-2-2V10Z"></path>
                  <path d="M22,10V20a2,2,0,0,1-2,2H16V10Z"></path>
                  <path d="M22,4V8H2V4A2,2,0,0,1,4,2H20A2,2,0,0,1,22,4Z"></path>
                </g>
              </svg>
            </i>
            Dashboard
          </button>

          <button
            className={`admin_button_grouping ${selectedView === "history" ? activeBtn : ""}`}
            onClick={() => setSelectedView('all_orders')}
          >
            <i className="dropdown_widget_icon">
              <svg
                fill="#000000"
                height="20"
                width="20"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 209.163 209.163" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M155.214,60.485c-0.62,2.206-2.627,3.649-4.811,3.649c-0.447,0-0.902-0.061-1.355-0.188l-40.029-11.241 c-2.659-0.747-4.209-3.507-3.462-6.166c0.747-2.658,3.506-4.209,6.166-3.462l40.03,11.241 C154.41,55.066,155.961,57.826,155.214,60.485z M84.142,182.268c-7.415,0-13.448,6.033-13.448,13.448 c0,7.415,6.033,13.447,13.448,13.447c7.415,0,13.447-6.032,13.447-13.447C97.589,188.301,91.557,182.268,84.142,182.268z M165.761,182.268c-7.415,0-13.448,6.033-13.448,13.448c0,7.415,6.033,13.447,13.448,13.447c7.415,0,13.448-6.032,13.448-13.447 C179.208,188.301,173.176,182.268,165.761,182.268z M197.442,72.788l-12.996,71.041c-0.435,2.375-2.504,4.1-4.918,4.1H72.198 l2.76,13.012c0.686,3.233,3.583,5.58,6.888,5.58h90.751c2.761,0,5,2.239,5,5s-2.239,5-5,5H81.845c-7.999,0-15.01-5.68-16.67-13.505 l-4.024-18.97L34.382,35.294H16.639c-2.761,0-5-2.239-5-5c0-2.761,2.239-5,5-5H38.3c2.301,0,4.305,1.57,4.855,3.805l9.265,37.639 l29.969,0.032l13.687-48.737c0.001-0.002,0-0.003,0.001-0.005l4.038-14.376c0.747-2.658,3.507-4.21,6.166-3.462l72.448,20.344 c2.659,0.747,4.209,3.507,3.462,6.165c-0.62,2.207-2.627,3.649-4.811,3.65c-0.447,0-0.902-0.06-1.354-0.188l-1.106-0.311 l-1.294,4.608l1.106,0.31c2.658,0.747,4.208,3.507,3.462,6.166l-7.282,25.93l21.62,0.023c1.482,0.001,2.888,0.661,3.837,1.8 C197.315,69.828,197.709,71.329,197.442,72.788z M108.389,11.168l-1.294,4.608l56.9,15.979l1.294-4.608L108.389,11.168z M95.31,66.783l63.083,0.068l3.061-10.899c0.358-1.277,0.195-2.644-0.454-3.8c-0.649-1.157-1.731-2.007-3.008-2.366L109.13,36.065 c-1.276-0.359-2.643-0.196-3.8,0.454c-1.156,0.649-2.007,1.731-2.366,3.008L95.31,66.783z"></path>
                </g>
              </svg>
            </i>
            Orders
          </button>
          <button
            className={`admin_button_grouping ${selectedView === "images" ? activeBtn : ""}`}
            onClick={() => setSelectedView('product')}
          >
            <i className="dropdown_widget_icon">
              <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="icon" fill="#000000" transform="translate(42.666667, 34.346667)">
                    <path d="M426.247658,366.986259 C426.477599,368.072636 426.613335,369.17172 426.653805,370.281095 L426.666667,370.986667 L426.666667,392.32 C426.666667,415.884149 383.686003,434.986667 330.666667,434.986667 C278.177524,434.986667 235.527284,416.264289 234.679528,393.025571 L234.666667,392.32 L234.666667,370.986667 L234.679528,370.281095 C234.719905,369.174279 234.855108,368.077708 235.081684,366.992917 C240.961696,371.41162 248.119437,375.487081 256.413327,378.976167 C275.772109,387.120048 301.875889,392.32 330.666667,392.32 C360.599038,392.32 387.623237,386.691188 407.213205,377.984536 C414.535528,374.73017 420.909655,371.002541 426.247658,366.986259 Z M192,7.10542736e-15 L384,106.666667 L384.001134,185.388691 C368.274441,181.351277 350.081492,178.986667 330.666667,178.986667 C301.427978,178.986667 274.9627,184.361969 255.43909,193.039129 C228.705759,204.92061 215.096345,223.091357 213.375754,241.480019 L213.327253,242.037312 L213.449,414.75 L192,426.666667 L-2.13162821e-14,320 L-2.13162821e-14,106.666667 L192,7.10542736e-15 Z M426.247658,302.986259 C426.477599,304.072636 426.613335,305.17172 426.653805,306.281095 L426.666667,306.986667 L426.666667,328.32 C426.666667,351.884149 383.686003,370.986667 330.666667,370.986667 C278.177524,370.986667 235.527284,352.264289 234.679528,329.025571 L234.666667,328.32 L234.666667,306.986667 L234.679528,306.281095 C234.719905,305.174279 234.855108,304.077708 235.081684,302.992917 C240.961696,307.41162 248.119437,311.487081 256.413327,314.976167 C275.772109,323.120048 301.875889,328.32 330.666667,328.32 C360.599038,328.32 387.623237,322.691188 407.213205,313.984536 C414.535528,310.73017 420.909655,307.002541 426.247658,302.986259 Z M127.999,199.108 L128,343.706 L170.666667,367.410315 L170.666667,222.811016 L127.999,199.108 Z M42.6666667,151.701991 L42.6666667,296.296296 L85.333,320.001 L85.333,175.405 L42.6666667,151.701991 Z M330.666667,200.32 C383.155809,200.32 425.80605,219.042377 426.653805,242.281095 L426.666667,242.986667 L426.666667,264.32 C426.666667,287.884149 383.686003,306.986667 330.666667,306.986667 C278.177524,306.986667 235.527284,288.264289 234.679528,265.025571 L234.666667,264.32 L234.666667,242.986667 L234.808715,240.645666 C237.543198,218.170241 279.414642,200.32 330.666667,200.32 Z M275.991,94.069 L150.412,164.155 L192,187.259259 L317.866667,117.333333 L275.991,94.069 Z M192,47.4074074 L66.1333333,117.333333 L107.795,140.479 L233.373,70.393 L192,47.4074074 Z"
                      id="Combined-Shape">
                    </path>
                  </g>
                  </g>
                </g>
              </svg>
            </i>
            Product
          </button>
          <button
            className={`admin_button_grouping ${selectedView === "security" ? activeBtn : ""}`}
            onClick={() => setSelectedView('security')}
          >
            <i className="dropdown_widget_icon">
              <svg
                height="20"
                width="20"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                role="img"
                aria-labelledby="iconTitle"
              >
                <title id="iconTitle">Custom Icon</title>
                <g stroke-width="0">
                  <path
                    d="M493.118,60.602c-40.138,17.719-93.777,20.322-143.881-0.447C324.872,50.055,273.523,25.223,255.999,0 
         c-17.521,25.223-68.871,50.055-93.236,60.154C112.657,80.924,59.021,78.32,18.88,60.602
         c-7.203-3.182-15.096,2.08-15.096,9.955C3.784,493.475,255.999,512,255.999,512
         s252.217-18.525,252.217-441.443C508.216,62.682,500.323,57.42,493.118,60.602z 
         M89.155,125.33c32.033,0,63.305-6.23,92.947-18.518
         c16.129-6.686,46.719-20.51,73.896-39.258
         c27.178,18.748,57.77,32.572,73.898,39.258
         c29.647,12.289,60.918,18.52,92.949,18.518
         c11.256,0,22.45-0.801,33.428-2.367
         C439.72,416.264,284.815,456.182,255.999,461.07
         c-28.814-4.889-183.72-44.807-200.273-338.108
         C66.704,124.531,77.899,125.33,89.155,125.33z"
                    style={{ fill: "#000000", stroke: "none" }}
                  />
                  <path
                    d="M255.999,409.279c29.94-8.686,119.684-49.879,144.676-234.27
         c-30.955-2.328-61.182-9.543-90.117-21.539
         c-12.354-5.121-32.789-14.211-54.559-26.502
         c-21.768,12.291-42.201,21.381-54.556,26.502
         c-28.932,11.994-59.156,19.209-90.117,21.539
         C136.317,359.4,226.06,400.594,255.999,409.279z"
                    style={{ fill: "#000000", stroke: "none" }}
                  />
                </g>
              </svg>

            </i>
            Security
          </button>
          <button
            className={`admin_button_grouping ${selectedView === "message" ? activeBtn : ""}`}
            onClick={() => setSelectedView('message')}
          >
            <i className="dropdown_widget_icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                  <path d="M7 9H17M7 13H17M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  </path>
                </g>
              </svg>
            </i>
            Message
          </button>
          <button
            className={`admin_button_grouping ${selectedView === "videos" ? activeBtn : ""}`}
            onClick={() => setSelectedView('videos')}
          >
            <i className="dropdown_widget_icon">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0">
                </g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path fill-rule="evenodd" clipRule="evenodd" d="M16 2H0V14H16V2ZM6.5 5V11H7.5L11 8L7.5 5H6.5Z" fill="#000000"></path>
                </g>
              </svg>
            </i>
            Videos
          </button>
          <button
            className={`admin_button_grouping ${selectedView === "blog" ? activeBtn : ""}`}
            onClick={() => setSelectedView('blog')}
          >
            <i className="dropdown_widget_icon">
              <svg
                width="20"
                height="20"
                version="1.1"
                id="_x32_"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <path
                      className="st0"
                      d="M0,0.005v511.991h512v-18.07V0.005H0z M475.859,475.855H36.141V111.427h439.718V475.855z"
                      fill="#000000"
                    />
                    <rect
                      x="295.154"
                      y="309.893"
                      className="st0"
                      width="138.537"
                      height="118.967"
                      fill="#000000"
                    />
                    <rect
                      x="78.308"
                      y="311.693"
                      className="st0"
                      width="162.625"
                      height="18.071"
                      fill="#000000"
                    />
                    <rect
                      x="78.308"
                      y="408.99"
                      className="st0"
                      width="162.625"
                      height="18.07"
                      fill="#000000"
                    />
                    <rect
                      x="78.308"
                      y="360.346"
                      className="st0"
                      width="162.625"
                      height="18.07"
                      fill="#000000"
                    />
                    <path
                      className="st0"
                      d="M80.594,268.538h36.415c20.752,0,33.317-9.035,33.317-27.953c0-11.426-6.494-19.341-12.847-21.741v-0.283
           c6.353-3.529,11.153-10.023,11.153-20.461c0-15.256-9.742-25.552-30.627-25.552H80.594c-0.838,0-1.403,0.565-1.403,1.411v93.159
           C79.19,267.973,79.755,268.538,80.594,268.538z M99.944,190.185c0-0.556,0.264-0.846,0.847-0.846h14.682
           c7.897,0,12.555,4.094,12.555,11.144c0,7.067-4.658,11.302-12.555,11.302h-14.682c-0.583,0-0.847-0.282-0.847-0.846V190.185z
           M99.944,228.576c0-0.556,0.264-0.838,0.847-0.838h15.794c8.489,0,12.997,4.658,12.997,12.009c0,7.473-4.508,12-12.997,12h-15.794
           c-0.583,0-0.847-0.291-0.847-0.856V228.576z"
                      fill="#000000"
                    />
                    <path
                      className="st0"
                      d="M178.048,268.538h62.55c0.839,0,1.403-0.565,1.403-1.42v-15.662c0-0.857-0.564-1.412-1.403-1.412h-42.352
           c-0.574,0-0.848-0.282-0.848-0.856v-75.229c0-0.846-0.556-1.411-1.411-1.411h-17.939c-0.846,0-1.402,0.565-1.402,1.411v93.159
           C176.646,267.973,177.202,268.538,178.048,268.538z"
                      fill="#000000"
                    />
                    <path
                      className="st0"
                      d="M295.127,270.082c16.809,0,30.071-7.756,35.012-23.286c2.118-6.634,2.674-12,2.674-26.258
           c0-14.259-0.556-19.624-2.674-26.259c-4.94-15.52-18.202-23.285-35.012-23.285c-16.799,0-30.07,7.765-35.002,23.285
           c-2.126,6.635-2.691,12-2.691,26.259c0,14.258,0.565,19.624,2.691,26.258C265.057,262.327,278.328,270.082,295.127,270.082z
           M280.022,199.926c2.117-6.634,7.208-10.587,15.105-10.587c7.906,0,12.988,3.953,15.106,10.587
           c1.129,3.397,1.553,8.039,1.553,20.612c0,12.555-0.424,17.223-1.553,20.603c-2.118,6.644-7.2,10.606-15.106,10.606
           c-7.897,0-12.988-3.962-15.105-10.606c-1.121-3.38-1.553-8.048-1.553-20.603C278.469,207.965,278.901,203.323,280.022,199.926z"
                      fill="#000000"
                    />
                    <path
                      className="st0"
                      d="M395.424,270.082c16.932,0,30.203-8.603,35.012-24c1.685-5.214,2.383-13.12,2.383-21.59v-7.915
           c0-0.83-0.565-1.403-1.403-1.403h-33.026c-0.857,0-1.421,0.574-1.421,1.403v13.571c0,0.838,0.564,1.402,1.421,1.402h12.979
           c0.564,0,0.846,0.292,0.846,0.847c0,4.085-0.424,7.058-1.129,9.467c-1.976,6.345-8.188,9.883-15.388,9.883
           c-8.33,0-13.562-3.962-15.68-10.606c-1.12-3.38-1.544-8.048-1.544-20.603c0-12.574,0.424-17.082,1.544-20.47
           c2.118-6.636,7.209-10.729,15.406-10.729c7.897,0,12.688,3.388,16.509,9.882c0.282,0.706,0.988,0.988,1.985,0.706l15.097-6.352
           c0.839-0.424,0.998-1.27,0.565-2.126c-4.526-11.577-16.235-20.453-34.156-20.453c-17.091,0-30.361,7.765-35.302,23.285
           c-2.118,6.635-2.692,12-2.692,26.259c0,14.258,0.574,19.624,2.692,26.258C365.063,262.327,378.333,270.082,395.424,270.082z"
                      fill="#000000"
                    />
                  </g>
                </g>
              </svg>
            </i>
            Blog
          </button>
        </div>
        <div id="side_bar_collapse">
          <button>
            <i>
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M16 1V15H9V13H14V3H9V1L16 1Z" fill="#000000"></path>
                  <path d="M6 4V7L8.74229e-08 7L0 9H6V12H7L11 8L7 4H6Z" fill="#000000"></path>
                </g>
              </svg>
            </i>
            <span>
              Collapse
            </span>
          </button>
        </div>
      </div>
      {renderSideViewContent()}
    </div >
  );
};

