

import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { handleFbSignIn, handleSignOut, handleGoogleSignIn, initializeLoginFramework, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    photo: ""
  });
  initializeLoginFramework();
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res,true);
      })
  }

  const fbSignIn = () => {
    handleFbSignIn()
      .then(res => {
       handleResponse(res,true);
      })
  }
  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res,false);
      })
  }


  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res,true);
        })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res,true);
        })

    }
    e.preventDefault();
  }
  const handleResponse = (res,redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect){
      history.replace(from);
    }
    }

  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = (isPasswordValid && passwordHasNumber);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
    console.log("email:", user.email);
  }
  return (
    <div style={{ textAlign: "center" }}>
      { user.isSignedIn ? <button onClick={signOut}>Sign out</button> : <button onClick={googleSignIn}>Sign in</button>
      }
      <br />
      <button onClick={fbSignIn}>Sign in using Facebook</button>
      {
        user.isSignedIn &&
        <div>
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our own Authentication</h1>
      <input onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" id="" />
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="name" />}
        <br />
        <input onBlur={handleBlur} placeholder="email" name="email" type="text" required />
        <br />
        <input onBlur={handleBlur} placeholder="password" type="password" name="password" required />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && <p style={{ color: "green" }}>user {newUser ? "created" : "logged in"} successfully</p>}

    </div>
  );
}

export default Login;
