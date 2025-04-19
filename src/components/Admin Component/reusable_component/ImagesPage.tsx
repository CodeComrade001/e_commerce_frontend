import { JSX } from "react";
import "../../../../styles/images.css"
import LineChartDiagram from "@/components/ui/card";

export default function ImagesComponent(): JSX.Element {

  return (
    <div id="images_component">
      <div id="Viewed_clothes_graph">
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