import { JSX } from "react";
import "../../../../styles/images.css"
import LineChartDiagram from "@/components/ui/card";

export default function ImagesComponent(): JSX.Element {

  return (
    <div id="images_component">
      <div id="Viewed_clothes_graph">
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
      <div id="all_Images">
        <div id="table_header">
          <div id="table_name">All Uploaded Images</div>
          <input type="text" name="" placeholder="search post all Task" />
          <span>
            title
          </span>
          <span>date</span>
          <span>Time</span>
          <span>Clicks</span>
        </div>
        <div className="table_body">
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0038.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0039.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0040.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0041.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0042.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0043.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0054.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0045.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0046.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0047.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0049.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0050.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0051.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0052.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0053.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0054.jpg" alt="" />
          </div>
        </div>
      </div>
      <div id="local_image_storage">
        <div id="table_header">
          <div id="table_name">All Locally Stored Images</div>
          <input type="text" name="" placeholder="search post all Task" />
          <span>
            title
          </span>
          <span>date</span>
          <span>Time</span>
          <span>Clicks</span>
        </div>
        <div className="table_body">
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0038.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0039.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0040.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0041.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0042.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0043.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0054.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0045.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0046.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0047.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0049.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0050.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0051.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0052.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0053.jpg" alt="" />
          </div>
          <div className="image_content">
            <img src="/images/all/IMG-20250328-WA0054.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}