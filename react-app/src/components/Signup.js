import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "646111832256-f67ummsb99lh6aujdd9bhom7jv1ofgmu.apps.googleusercontent.com";

const Signup = () => {
  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    // Send the token to your backend for verification
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
