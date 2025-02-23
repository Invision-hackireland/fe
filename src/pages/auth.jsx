import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();

export const AuthPage = ({ setImportantId }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");

  // useNavigate is called at the top level of the component
  const navigate = useNavigate();

  const SignUpFunction = () => {
    axios
      .post(
        "https://e71e-89-101-154-45.ngrok-free.app/users",
        {
          firstname: firstName,
          email: email,
          camera_ids: [],
          rules_ids: [],
          rooms_ids: [],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const data = response.data;
        console.log("Response:", data);
        let importantId = data.id;
        setImportantId(importantId);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #fafcff, #e9eef5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 20px",
        boxSizing: "border-box",
        overflowX: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h1>
        <p
          style={{
            color: "#666",
            marginBottom: "24px",
            fontSize: "14px",
          }}
        >
          {isLogin ? "Log in to continue" : "Sign up to get started"}
        </p>

        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="First Name"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
          }}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "#007aff",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.background = "#005fcb")}
          onMouseOut={(e) => (e.target.style.background = "#007aff")}
          onClick={SignUpFunction}
        >
          {isLogin ? "Log In" : "Sign Up"}
        </button>

        <p style={{ marginTop: "16px", color: "#444", fontSize: "14px" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            style={{
              color: "#007aff",
              cursor: "pointer",
              fontWeight: "500",
            }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
