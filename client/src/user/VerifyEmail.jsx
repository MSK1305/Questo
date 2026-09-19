// frontend/src/pages/VerifyEmail.jsx
import { useEffect, useState, useRef } from "react"; // 🚨 1. Import useRef
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { verifyEmail } from "../api/auth";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState(
    "Verifying your email, please wait...",
  );

  // 🚨 2. Create a ref to track if we've already attempted verification
  const hasVerified = useRef(false);

  useEffect(() => {
    // 🚨 3. If we already ran this, stop immediately. Prevents Strict Mode double-firing.
    if (hasVerified.current) return;
    hasVerified.current = true; // Mark as run

    const verificationToken = searchParams.get("token");

    if (!verificationToken) {
      setStatus("error");
      setMessage("Invalid verification link. No token found in the URL.");
      return;
    }

    const handleVerify = async () => {
      try {
        const response = await verifyEmail(verificationToken);

        // 🚨 4. DEBUG: Let's see exactly what your API wrapper returns
        console.log("🔍 RAW API RESPONSE:", response);

        // NOTE: Depending on your api/auth wrapper, the data might be in `response.data`
        // instead of directly on `response`. Adjust the next line if needed:
        const payload = response.data || response;
        const { token: jwtToken, user, message: successMessage } = payload;

        if (jwtToken && user) {
          const userData = {
            username: user.username || user.email.split("@")[0],
            email: user.email,
            id: user._id || user.id,
          };

          login(userData, jwtToken);

          setStatus("success");
          setMessage(
            successMessage ||
              "Email verified successfully! Redirecting to dashboard...",
          );

          setTimeout(() => navigate("/dashboard", { replace: true }), 1500);
        } else {
          throw new Error("Server did not return a valid session.");
        }
      } catch (err) {
        console.error("Verification error:", err);

        // 🚨 5. BONUS SAFETY: If the error is "Already verified", treat it as a success
        // and try to log them in anyway (if your backend sends the data in the error)
        if (
          err.response?.status === 400 &&
          err.response?.data?.message?.includes("already")
        ) {
          setStatus("success");
          setMessage("Email was already verified! Redirecting to dashboard...");
          setTimeout(() => navigate("/dashboard", { replace: true }), 1500);
          return;
        }

        setStatus("error");
        setMessage(
          err.response?.data?.message ||
            err.message ||
            "Verification failed. The link may be expired.",
        );
      }
    };

    handleVerify();
  }, [searchParams, login, navigate]);

  // ... (Your JSX return statement remains exactly the same as before) ...
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-background rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        {status === "verifying" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-foreground">Verifying...</h2>
            <p className="text-muted-foreground mt-2">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-xl font-bold text-foreground">Success!</h2>
            <p className="text-muted-foreground mt-2">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 text-5xl mb-4">✕</div>
            <h2 className="text-xl font-bold text-foreground">
              Verification Failed
            </h2>
            <p className="text-red-500 mt-2">{message}</p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => navigate("/login")}
                className="bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/80 transition cursor-pointer"
              >
                Go to Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-secondary text-secondary-foreground py-2 px-4 rounded-lg hover:bg-secondary/80 transition cursor-pointer"
              >
                Sign up again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
