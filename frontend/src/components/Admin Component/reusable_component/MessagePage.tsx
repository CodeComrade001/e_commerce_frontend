import { JSX } from "react";
import "../../../../styles/message.css"

export default function MessageComponent(): JSX.Element {

  return (
    <div id="message_component">
      <section id="all_customers">
        <div className="search_box">
          <input type="text" value="" placeholder="search for customer" />
        </div>
        <div className="my_customers_list">
          <div className="user_profile">
            <div>
              <img src="/images/profile/profile.png" alt="" />
            </div>
            <div className="user_name">userName</div>
            <div className="last_message"> my order has not been going through </div>
            <div className="last_seen">
              <div className="last_seen_value">5 min</div>
            </div>
          </div>
        </div>
        <div id="customer_side_bar_collapse">
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
      </section>
      <section id="all_messages">
        <div id="conversation_heading">
          <h1 className="name">
            Josephine Aguilar
          </h1>
        </div>
        <div id="conversation_room">
          <div className="inbox_message">
            <div className="message_received">Hey, did you catch yesterday’s debate?</div>
          </div>
          <div className="outbox_message">
            <div className="message_sent">I did—lots of fiery exchanges on healthcare policy.</div>
          </div>
          <div className="inbox_message">
            <div className="message_received">Right? The candidate’s plan to expand coverage seems ambitious.</div>
          </div>
          <div className="outbox_message">
            <div className="message_sent">Ambitious, yes—wondering how they’ll fund it without raising taxes too much.</div>
          </div>
          <div className="inbox_message">
            <div className="message_received">They mentioned closing corporate loopholes. Could work if enforced.</div>
          </div>
          <div className="outbox_message">
            <div className="message_sent">True, but lobbying groups will push back hard.</div>
          </div>
          <div className="inbox_message">
            <div className="message_received">That’s politics for you. What about foreign policy remarks?</div>
          </div>
          <div className="outbox_message">
            <div className="message_sent">I liked the emphasis on rebuilding alliances—much needed after recent tensions.</div>
          </div>
          <div className="inbox_message">
            <div className="message_received">Definitely. And the stance on climate agreements?</div>
          </div>
          <div className="outbox_message">
            <div className="message_sent">They want to rejoin the Paris Accord with stricter emissions targets.</div>
          </div>
          <div className="inbox_message">
            <div className="message_received">That’ll please environmental groups, but industry might lobby against.</div>
          </div>
          <div className="outbox_message">
            <div className="message_sent">Balance is tough. They proposed incentives for clean energy, though.</div>
          </div>
          <div className="inbox_message">
            <div className="message_received">Incentives could work if budgets are solid.</div>
          </div>
          <div className="outbox_message">
            <div className="message_sent">Agreed. Overall, the debate showed clear contrasts—makes Election Day closer.</div>
          </div>
        </div>
        <div className="text-box">
          <textarea
            className="text-input"
            placeholder="Reply message"
            rows={1}
          ></textarea>
          <i className="send-svg">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </g>
            </svg>
          </i>
        </div>
      </section>
    </div>
  )
}