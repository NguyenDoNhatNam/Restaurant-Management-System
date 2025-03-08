import * as React from "react";
import Formlogin from "../components/Login_Signup/Formlogin";

function Login() {
  return (
    <div className="flex w-full h-screen">
      <div
        className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-cover bg-center"
        style={{ background: `url(/images/background.jpg)` }}
      >
        <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-md" />
        <img
          src="/images/food.png"
          alt="Spinning Animation"
          className="w-2/3 rounded-full animate-spin relative z-10"
        />
      </div>
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <Formlogin />
      </div>
    </div>
  );
}

export default Login;
