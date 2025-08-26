// import React from 'react';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../firebaseConfig';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();

//   const loginWithGoogle = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       console.log("User signed in:", user.displayName);
//       navigate('/'); // Redirect to home
//     } catch (error) {
//       console.error("Login failed:", error.message);
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Login to ClueVault</h2>
//       <button onClick={loginWithGoogle}>Sign in with Google</button>
//     </div>
//   );
// };

// export default Login;

import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in:", user.displayName);
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-glow-bg"></div>
      <div className="login-box">
        <h2>Login to ClueVault</h2>
        <button onClick={loginWithGoogle}>Sign in with Google</button>
      </div>
    </div>
  );
};

export default Login;
