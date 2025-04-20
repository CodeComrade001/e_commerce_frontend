import { JSX } from "react";
import "../../../../styles/videosPage.css"
import LineChartDiagram from "@/components/ui/card";

export default function VideosComponent(): JSX.Element {

  return (
    <div id="video_component">
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
      <div id="all_video">
        <div id="table_header">
          <div id="table_name">All Uploaded Video</div>
          <input type="text" name="" placeholder="search post all Task" />
          <span>
            title
          </span>
          <span>date</span>
          <span>Time</span>
          <span>Clicks</span>
        </div>
        <div className="table_body">
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0018.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0018.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0018.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0018.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0018.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0018.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0018.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0018.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0018.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0018.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0018.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0018.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0018.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0018.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
        </div>
      </div>
      <div id="local_video_storage">
        <div id="table_header">
          <div id="table_name">All Locally Stored Video</div>
          <input type="text" name="" placeholder="search post all Task" />
          <span>
            title
          </span>
          <span>date</span>
          <span>Time</span>
          <span>Clicks</span>
        </div>
        <div className="table_body">
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0015.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0015.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0015.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0015.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0015.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0015.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0015.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0015.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0015.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0015.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0015.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0015.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0015.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0015.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0015.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
          <div className="video_content">
            <video controls>
              <source src="/videos/VID-20250328-WA0015.mp4" type="video/mp4" />
              <source src="movie.webm" type="video/webm" />
            </video>
          </div>
        </div>
      </div>
    </div>
  )
}