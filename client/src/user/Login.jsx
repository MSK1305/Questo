// import React from "react";

// const Login = () => {
//   return <div>Login</div>;
// };

// export default Login;

// src/user/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post("/api/auth/login", { email, password });
    //   if (response.data.success) {
    //     history.push("/");
    //   } else {
    //     alert("Invalid credentials");
    //   }
    // } catch (error) {
    //   console.error("Login failed:", error);
    //   alert("Login failed. Please try again.");
    // }
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <Button
            type="submit"
            className="w-full p-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
