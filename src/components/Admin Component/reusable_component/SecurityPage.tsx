import  { JSX } from "react";
import "../../../../styles/security.css" 

export default function SecurityComponent() : JSX.Element {

  return (
    <div id="security_component">
      <div id="detailed_login_attempt"></div>
      <div id="admin_login_logs"></div>
      <div id="verified_login"></div> 
      <div id="new_ip_address"></div> 
      <div id="vpn_connection"></div> 
      <div id="blocked_ip_address"></div> 
      <div id="edit_settings"></div>
    </div>
  )
}