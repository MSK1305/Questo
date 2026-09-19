// src/user/SignUp.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schemas/authSchema";
import { signup } from "../api/auth";
import "./Signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  // Initialize React Hook Form with Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");
    setSuccess("");
    try {
      const response = await signup(data); // data is already validated by Zod!
      setSuccess(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-background rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-foreground mb-6 text-center">
          Sign Up
        </h1>

        {serverError && (
          <p className="text-red-500 mb-4 text-center">{serverError}</p>
        )}
        {success && (
          <p className="text-green-600 mb-4 text-center">{success}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-foreground"
            >
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              id="username"
              className={`mt-1 p-2 block w-full rounded-md border ${
                errors.username ? "border-red-500" : "border-border"
              } focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className={`mt-1 p-2 block w-full rounded-md border ${
                errors.email ? "border-red-500" : "border-border"
              } focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className={`mt-1 p-2 block w-full rounded-md border ${
                errors.password ? "border-red-500" : "border-border"
              } focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground py-2 px-4 rounded-lg w-full hover:bg-primary/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
