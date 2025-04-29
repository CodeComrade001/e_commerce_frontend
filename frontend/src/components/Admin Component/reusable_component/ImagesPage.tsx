import { JSX, useEffect, useState } from "react";
import "../../../../styles/images.css"
import { fetchAllProducts } from "@/services/api";

export default function ImagesComponent(): JSX.Element {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  console.log("🚀 ~ ImagesComponent ~ allProducts:", allProducts)

  useEffect(() => {
    // 2. Define and call async fetch inside useEffect
    async function loadProducts() {
      try {
        const response = await fetchAllProducts();   // wait for Axios
        console.log('Fetched products:', response.data);  // DevTools console
        setAllProducts(response.data);               // update state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    loadProducts();
  }, []);

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
                width="20"
                height="20"
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
          <nav className="sort_image">
            <button>
              title
              <i className="dropdown_widget_icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-caret-down-fill"
                  viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </i>
            </button>
            <div>
              <button title="edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
              </button>
              <button title="delete" >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
              </button>
              <button title="remove from web" >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-octagon-fill" viewBox="0 0 16 16">
                  <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
        <div className="table_body">
          {allProducts.length > 0 &&
            allProducts.map((item) =>
            (
              <div key={item.id} className="image_content">
                <img src={item.image[1]} alt="" />
                <nav>
                  <button className="price">
                    {`$${item.price}`}
                  </button>
                  <button title="edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>
                  </button>
                  <button title="delete" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg>
                  </button>
                  <button title="remove from web" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-octagon-fill" viewBox="0 0 16 16">
                      <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                    </svg>
                  </button>
                </nav>
              </div>
            ))
          }
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
            <nav>
              <button title="edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
              </button>
              <button title="delete" >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
              </button>
              <button title="remove from web" >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-octagon-fill" viewBox="0 0 16 16">
                  <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                </svg>
              </button>
            </nav>
          </div>

        </div>
      </div>
    </div>
  )
}