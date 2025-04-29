import { JSX } from "react";
import "../../../styles/myAccountDetails.css";

export default function MyAccountComponent(): JSX.Element {
  return (
    <div className="accountDetailsComponent">
      <div className="accountDetailsComponent__header">
        <img
          className="accountDetailsComponent__avatar"
          src="/images/profile/profile.png"
          alt="User Avatar"
        />
      </div>

      <div className="accountDetailsComponent__details">
        <div className="accountDetailsComponent__personal_details">
          <h2 className="accountDetailsComponent__subheading">Addresses</h2>
          <div className="accountDetailsComponent__info">
            <p className="accountDetailsComponent__item">
              <strong>Name:</strong>Jane Doe
            </p>
            <p className="accountDetailsComponent__item">
              <strong>Email:</strong> jane.doe@example.com
            </p>
            <p className="accountDetailsComponent__item">
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <button className="edit_info">
              Edit Data
            </button>
          </div>
        </div>

        <div className="accountDetailsComponent__addresses">
          <h2 className="accountDetailsComponent__subheading">Addresses</h2>
          <div className="accountDetailsComponent__info">
            <p className="accountDetailsComponent__item">
              <strong>Shipping:</strong> 123 Elm St, Springfield, IL
            </p>
            <p className="accountDetailsComponent__item">
              <strong>Billing:</strong> 456 Oak St, Springfield, IL
            </p>
            <button className="accountDetailsComponent__button">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
