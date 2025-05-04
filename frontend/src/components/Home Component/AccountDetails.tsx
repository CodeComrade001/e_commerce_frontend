import { JSX, useState, useEffect, useCallback, FormEvent } from "react";
import "../../../styles/myAccountDetails.css";
import { useAuth } from "@/context/AuthContext";
import { updateUserDetails } from "@/services/api";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  shipping: string;
}

export default function MyAccountComponent({
  nameProp, emailProp, avatar_urlProp, addressProp, phoneProp
}: {
  nameProp: string,
  emailProp: string,
  avatar_urlProp: string,
  addressProp: string,
  phoneProp: string
}): JSX.Element {
  const { userId } = useAuth(); // assume `user` has initial details
  const [details, setDetails] = useState<UserDetails>({
    name: nameProp,
    email: emailProp,
    phone: phoneProp,
    shipping: addressProp,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setDetails((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (userId == null) return;

      setLoading(true);
      try {
        await updateUserDetails({
          userId,
          name: details.name,
          email: details.email,
        });
        // Optionally update phone/shipping/billing on backend too
        setIsEditing(false);
      } catch (err) {
        console.error("🚀 ~ updateUserDetails ~ error:", err);
      } finally {
        setLoading(false);
      }
    },
    [userId, details]
  );

  return (
    <div className="accountDetailsComponent">
      <div className="accountDetailsComponent__header">
        <img
          className="accountDetailsComponent__avatar"
          src={avatar_urlProp}
          alt="User Avatar"
        />
      </div>

      <form
        className="accountDetailsComponent__details"
        onSubmit={handleSubmit}
      >
        <div className="accountDetailsComponent__personal_details">
          <h2 className="accountDetailsComponent__subheading">
            Personal Details
          </h2>

          {["name", "email", "phone"].map((field) => (
            <div key={field} className="accountDetailsComponent__info">
              <label htmlFor={field} className="accountDetailsComponent__item">
                <strong>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </strong>
              </label>
              {isEditing ? (
                <input
                  id={field}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  value={(details as any)[field]}
                  onChange={handleChange}
                  className="accountDetailsComponent__input"
                />
              ) : (
                <span>{(details as any)[field]}</span>
              )}
            </div>
          ))}

          <button
            type={isEditing ? "submit" : "button"}
            onClick={() => {
              if (isEditing) return; // let submit handle
              setIsEditing(true);
            }}
            className="edit_info"
            disabled={loading}
          >
            {isEditing ? (loading ? "Saving…" : "Save") : "Edit"}
          </button>
        </div>

        <div className="accountDetailsComponent__addresses">
          <h2 className="accountDetailsComponent__subheading">Addresses</h2>

          {["shipping", "billing"].map((field) => (
            <div key={field} className="accountDetailsComponent__info">
              <label
                htmlFor={field}
                className="accountDetailsComponent__item"
              >
                <strong>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </strong>
              </label>
              {isEditing ? (
                <input
                  id={field}
                  name={field}
                  type="text"
                  value={(details as any)[field]}
                  onChange={handleChange}
                  className="accountDetailsComponent__input"
                />
              ) : (
                <span>{(details as any)[field]}</span>
              )}
            </div>
          ))}

          {/* Reuse the same Edit/Save button */}
        </div>
      </form>
    </div>
  );
}
