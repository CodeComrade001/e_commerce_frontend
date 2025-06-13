import { useState } from 'react';
import '../../../styles/homeSignUp.css';
import { LoginExistingAccount, CreateNewAccount } from '../../services/api';
import { z } from "zod";

export default function HomeSignUp() {
  const [isSignup, setIsSignup] = useState(false);
  const [buttonText, setButtonText] = useState("Login In")
  const [animationMovement, setAnimationMovement] = useState("")
  const [accessType, setAccessType] = useState<"Sign in" | "Sign up">("Sign in");
  console.log("🚀 ~ HomeSignUp ~ isSignup:", isSignup)

  // form fields
  const [userLogIn, setUserLogIn] = useState({
    email: '',
    password: '',
  });

  console.log("🚀 ~ HomeSignUp ~ userLogIn:", userLogIn)
  const [formErrors, setFormErrors] = useState<{
    name?: string[];
    email?: string[];
    password?: string[];
  } | null>(null);
  const [userSignUp, setUserSignUp] = useState({
    name: '',
    email: "",
    password: "",
    password0: "",
  });
  console.log("🚀 ~ HomeSignUp ~ userSignUp:", userSignUp)

  function handleAccessBtn(direction: string, UserAccessType: string) {
    setAccessType(UserAccessType as "Sign in" | "Sign up")
    setAnimationMovement(direction)
  }

  function handleSignInInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
    inputType: "email" | "password"
  ) {
    if (inputType === "email") {
      setUserLogIn(prev => ({ ...prev, userName: event.target.value }));
    } else {
      setUserLogIn(prev => ({ ...prev, password: event.target.value }));
    }
  }

  // Handle sign-up input changes
  function handleSignUpInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
    inputType: "userName" | "email" | "password" | "password0"
  ) {
    setUserSignUp(prev => ({
      ...prev,
      [inputType]: event.target.value,
    }));
  }

  async function login() {
    // Destructure email/password from state
    const { email, password } = userLogIn;

    // Guard against empty inputs
    if (email.trim() === '' || password.trim() === '') {
      console.log('Email and password must not be empty');
      return;
    }

    try {
      // send as query params: /api/auth/user/login?email=…&password=…
      const response = await LoginExistingAccount({
        params: {
          email: email,
          password: password
        }
      });
      if (response.data.result) {
        console.log("🚀 ~ signUp ~ response.data.result:", response.data.result)
        setButtonText('Successful')
      }
      console.log('Created user:', response.data);
      console.log('Logged in user:', response);
    } catch (error) {
      setButtonText('Incorrect Credentials')
      console.log(`Error logging in or user not found:`, error);
      if (error instanceof z.ZodError) {
        setFormErrors(error.flatten().fieldErrors);
      }
    }
  }

  async function signUp() {
    // Destructure email/password from state
    const { name, email, password } = userSignUp;

    // Guard against empty inputs
    if (email.trim() === '' || password.trim() === '' || name.trim() == '') {
      console.log('Email and password must not be empty');
      return;
    }

    try {
      // send as query params: /api/auth/user/sign-up?name=…&email=…&password=…
      const response = await CreateNewAccount({
        params: {
          name: name,
          email: email,
          password: password
        }
      });
      if (response.data.result) {
        console.log("🚀 ~ signUp ~ response.data.result:", response.data.result)
        setButtonText('Successful')
      }
      console.log('Created user:', response.data);
    } catch (error) {
      setButtonText('Account Creation Failed')
      console.log(`Error creating account:`, error);
      if (error instanceof z.ZodError) {
        setFormErrors(error.flatten().fieldErrors);
      }
    }
  }

  return (

    <div className="SignInComponent">
      <div className="screen">
        <div className="screen__content">
          <div className="user_access_container">
            <div className="user_access_btn_container">
              <button onClick={() => handleAccessBtn("moveLeft", "Sign in")}>Sign In</button>

              <button onClick={() => handleAccessBtn("moveRight", "Sign up")}>Sign Up</button>
            </div>
            <button
              title="Active Access"
              className={`
                 active_btn 
                 ${(animationMovement === "moveLeft") ? "moveLeftAnimation" : ""}
                 ${(animationMovement === "moveRight") ? "moveRightAnimation" : ""}
                 `} >

              {accessType}
            </button>
          </div>
          {
            accessType === "Sign up"
              ? (
                <form className="login" >
                  <div className="Welcome_message">
                    <h1>Sign up To E-Commerce website</h1>
                  </div>
                  <div className="login__field">
                    <i className={`$"login__icon" fas fa-user`}></i>
                    <input
                      type="text"
                      name={userSignUp.name}
                      className="login__input"
                      placeholder="User name"
                      onChange={(e) => handleSignUpInputChange(e, "userName")}
                    />
                  </div>
                  {formErrors?.name &&
                    formErrors?.name.map((err, idx) => (
                      <p key={`email-error-${idx}`} className="errorText">{err}</p>
                    ))}
                  <div className="login__field">
                    <i className={`$"login__icon" fas fa-user`}></i>
                    <input
                      type="text"
                      name={userSignUp.email}
                      className="login__input"
                      placeholder="Email"
                      onChange={(e) => handleSignUpInputChange(e, "email")}
                    />
                  </div>
                  {formErrors?.email &&
                    formErrors?.email.map((err, idx) => (
                      <p key={`email-error-${idx}`} className="errorText">{err}</p>
                    ))}
                  <div className="login__field">
                    <i className={`$"login__icon" fas fa-lock`}></i>
                    <input
                      type="password"
                      name={userSignUp.password}
                      className="login__input"
                      placeholder="Password"
                      onChange={(e) => handleSignUpInputChange(e, "password")}
                    />
                  </div>
                  {formErrors?.password && (
                    <div className="error_list">
                      <p>Password must:</p>
                      <ul>
                        {formErrors?.password.map((error, idx) => (
                          <li key={idx} className="error_item">
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="login__field">
                    <i className={`$"login__icon" fas fa-lock`}></i>
                    <input
                      type="password"
                      name={userSignUp.password0}
                      className="login__input"
                      placeholder="Confirm Password"
                      onChange={(e) => handleSignUpInputChange(e, "password0")}
                    />
                  </div>
                  <button
                    className={`"button" ${accessType === "Sign up" ? `sign_up_login_submit` : 'login__submit'}`}
                    onClick={(event) => {
                      event.preventDefault();  // Prevents form from submitting and adding query parameters
                      signUp();
                    }}
                    type="submit"
                  >
                    <span className="button__text">Create Account</span>
                    <i className={`$"button__icon" fas fa-chevron-right`}></i>
                  </button>
                  <div className={`${accessType === "Sign up" ? 'sign_up_social_login' : 'social_login'}`}>
                    <h3>Sign up via</h3>
                    <div className="social_icons">
                      <button
                        title="sign in with google"
                        className={`$"social_login__icon" fab fa-instagram`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                          <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <form className="login">
                  <div className="Welcome_message">
                    <h1>Welcome To Dolistify</h1>
                  </div>
                  <div className="login__field">
                    <i className={`$"login__icon" fas fa-user`}></i>
                    <input
                      type="text"
                      name={userLogIn.email}
                      className="login__input"
                      placeholder="User name / Email"
                      onChange={(e) => handleSignInInputChange(e, "email")}
                    />
                  </div>
                  <div className="login__field">
                    <i className={`$"login__icon" fas fa-lock`}></i>
                    <input
                      type="password"
                      name={userLogIn.password}
                      className="login__input"
                      placeholder="Password"
                      onChange={(e) => handleSignInInputChange(e, "password")}
                    />
                  </div>
                  <button
                    className="button login__submit"
                    onClick={(event) => {
                      event.preventDefault();  // Prevents form from submitting and adding query parameters
                      login();
                    }}
                  >
                    <span className="button__text">Log In Now</span>
                    <i className={`$"button__icon" fas fa-chevron-right`}></i>
                  </button>
                  <div className="social_login">
                    <h3>log in via</h3>
                    <div
                      className="social_icons"
                    >
                      <button
                        title="sign in with google"
                      >
                        <div className={`$"social_login__icon" fab fa-instagram`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              )
          }
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}
