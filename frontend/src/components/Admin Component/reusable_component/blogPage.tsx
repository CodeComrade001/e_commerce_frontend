import { JSX } from "react";
import "../../../../styles/blog.css";
import LineChartDiagram from "@/components/ui/line-chart";

export default function BlogComponent(): JSX.Element {
  return (
    <div id="blog_component">
      <div id="clicked_post_graph">
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
          {/* <LineChartDiagram /> */}
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
      </div>
      <div id="all_blog_post">
        <div id="table_header">
          <div id="table_name">All Blog posts</div>
          <input type="text" name="" placeholder="search post all Task" />
          <span>
            title
          </span>
          <span>date</span>
          <span>Time</span>
          <span>Clicks</span>
        </div>
        <div className="table_body">
          <div className="post">
            <span>the change of  my new world </span>
            <span>2025-06-14</span>
            <span>22:13:43</span>
            <span>25</span>
            <button title="edit">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
              </svg>
            </button>
            <button title="delete" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
              </svg>
            </button>
            <button title="remove from web" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-octagon-fill" viewBox="0 0 16 16">
                <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
              </svg>
            </button>
          </div>

        </div>
      </div>
      <div id="special_promotion_post">
        <div id="table_header">
          <div id="table_name">Special Promotion</div>
          <input type="text" name="" placeholder="search post all Task" />
          <span>
            title
          </span>
          <span>date</span>
          <span>Time</span>
          <span>Clicks</span>
        </div>
        <div className="table_body">
          <div className="post">
            <span>the change of  my new world </span>
            <span>2025-06-14</span>
            <span>22:13:43</span>
            <span>25</span>
            <button title="edit">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
              </svg>
            </button>
            <button title="delete" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
              </svg>
            </button>
            <button title="remove from web" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-octagon-fill" viewBox="0 0 16 16">
                <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
              </svg>
            </button>
          </div>
          
        </div>
      </div>
      <div id="new_post">
        <div className="upload_content">
          <span>Add Post</span>
          <div>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z" fill="#1C274C"></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div id="upload_post">
        <div className="upload_content">
          <span>Upload Post</span>
          <div>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z" fill="#1C274C"></path>
              </g>
            </svg>
          </div>
        </div>

      </div>
      <div id="Local_posts">
        <div id="table_header">
          <span>
            Local post
          </span>
          <span>title</span>
          <button title="delete" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
            </svg>
          </button>
          <button title="upload" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
            </svg>
          </button>
        </div>
        <div className="table_body">
          <div className="post">
            <input type="checkbox" name="" id="" placeholder="mark" />
            <span>the change of  my new world </span>
            <span>28/05/2025 06:30:34</span>
            <span className="post_option" >
              <button title="edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
              </button>
              <button title="delete" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
              </button>
              <button title="upload" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
