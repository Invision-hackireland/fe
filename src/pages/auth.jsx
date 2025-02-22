import { useState } from "react";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      style={{
        /* Accommodates the sidebar width, ensures it doesn't overflow, and centers content */
        minHeight: "100vh",
        background: "linear-gradient(145deg, #fafcff, #e9eef5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 20px", // Top and side padding
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