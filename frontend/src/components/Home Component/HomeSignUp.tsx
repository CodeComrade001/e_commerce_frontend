import { useState } from 'react';
import '../../../styles/homeSignUp.css';
import { LoginExistingAccount, CreateNewAccount } from '../../services/api';

export default function HomeSignUp() {
  const [isSignup, setIsSignup] = useState(false);
  console.log("🚀 ~ HomeSignUp ~ isSignup:", isSignup)

  // form fields
  const [userLogIn, setUserLogIn] = useState({
    email: '',
    password: ''
  });

  console.log("🚀 ~ HomeSignUp ~ userLogIn:", userLogIn)

  const [userSignUp, setUserSignUp] = useState({
    name: '',
    email: "",
    password: ""
  });
  console.log("🚀 ~ HomeSignUp ~ userSignUp:", userSignUp)

  const toggleSignup = () => setIsSignup(prev => !prev);

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
      }
      );
      console.log('Logged in user:', response);
    } catch (error) {
      console.log(`Error logging in:`, error);
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
      console.log('Created user:', response);
    } catch (error) {
      console.log(`Error creating account:`, error);
    }
  }

  return (
    <div className={`SignInComponent${isSignup ? ' s--signup' : ''}`}>
      <div className="cont">
        {/* Sign In Form */}
        <div className="form sign-in">
          <h2>Welcome</h2>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={userLogIn.email}
              onChange={e => setUserLogIn((prevDetails) => {
                const newValue = e.target.value
                return { ...prevDetails, email: newValue }
              })}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={userLogIn.password}
              onChange={e => setUserLogIn((prevDetails) => {
                const newValue = e.target.value
                return { ...prevDetails, password: newValue }
              })}
            />
          </label>
          <p className="forgot-pass">Forgot password?</p>
          <button type="button" className="submit" onClick={login}>
            Sign In
          </button>
        </div>

        <div className="sub-cont">
          <div className="img">
            <div className="img__text m--up">
              <h3>Don't have an account? Please Sign up!</h3>
            </div>
            <div className="img__text m--in">
              <h3>If you already have an account, just sign in.</h3>
            </div>
            <div className="img__btn" onClick={toggleSignup}>
              <span className="m--up">Sign Up</span>
              <span className="m--in">Sign In</span>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className="form sign-up">
            <h2>Create your Account</h2>
            <label>
              <span>Name</span>
              <input
                type="text"
                value={userSignUp.name}
                onChange={e => setUserSignUp((prevDetails) => {
                  const newValue = e.target.value
                  return { ...prevDetails, name: newValue }
                })}
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                value={userSignUp.email}
                onChange={e => setUserSignUp((prevDetails) => {
                  const newValue = e.target.value
                  return { ...prevDetails, email: newValue }
                })}
              />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                value={userSignUp.password}
                onChange={e => setUserSignUp((prevDetails) => {
                  const newValue = e.target.value
                  return { ...prevDetails, password: newValue }
                })}
              />
            </label>
            <button type="button" className="submit" onClick={signUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
