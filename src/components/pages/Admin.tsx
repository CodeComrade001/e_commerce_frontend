// src/components/Admin.tsx
import { JSX, useState } from "react";
import "../../../styles/admin.css";
import DashboardComponent from "../Admin Component/reusable_component/dashboardPage";
import BlogComponent from "../Admin Component/reusable_component/blogPage";

export default function AdminHome(): JSX.Element {
  const [selectedView, setSelectedView] = useState('blog');

  const renderSideViewContent = () => {
    switch (selectedView) {
      case 'dashboard':
        return <DashboardComponent />;
      case 'blog':
        return <BlogComponent />;
      case 'message':
        return <div>Message Content</div>;
      // Add more cases for additional side views
      default:
        return <DashboardComponent />;
    }
  };

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
          <div id="side_bar_items">
            {/* Use Link to navigate without a page refresh */}
            <button
              className="admin_button_grouping"
              id="active_admin_button"
              onClick={() => setSelectedView('dashboard')}
            >
              Dashboard
            </button>
            <button
              className="admin_button_grouping"
              onClick={() => setSelectedView('blog')}
            >
              Blog
            </button>
            <button
              className="admin_button_grouping"
              onClick={() => setSelectedView('message')}
            >
              Message
            </button>
            <button
              className="admin_button_grouping"
              onClick={() => setSelectedView('videos')}
            >
              Videos
            </button>
            <button
              className="admin_button_grouping"
              onClick={() => setSelectedView('images')}
            >
              Images
            </button>
            <button
              className="admin_button_grouping"
              onClick={() => setSelectedView('Security')}
            >
              Security
            </button>
            <button
              className="admin_button_grouping"
              onClick={() => setSelectedView('history')}
            >
              history
            </button>
          </div>
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

