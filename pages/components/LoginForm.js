// components/LoginForm.jsx
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function LoginForm({ isModal = false, onClose }) {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [isSignup]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAuth = () => {
    if (!email || !password || (isSignup && !name)) {
      return setError("All fields are required.");
    }
    if (!validateEmail(email)) {
      return setError("Invalid email format.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (isSignup) {
      if (email === "admin@gmail.com")
        return setError("Admin account cannot be created manually.");

      const exists = users.find((u) => u.email === email);
      if (exists) return setError("User already exists.");

      const newUser = { name, email, password };
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      Cookies.set("isLoggedIn", true);
      Cookies.set("role", "user");
      router.push("/dashboard");
    } else {
      if (email === "admin@gmail.com") {
        if (password !== "admin123#")
          return setError("Invalid admin credentials.");
        Cookies.set("isLoggedIn", true);
        Cookies.set("role", "admin");
        return router.push("/dashboard");
      }

      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) return setError("Invalid credentials.");

      Cookies.set("isLoggedIn", true);
      Cookies.set("role", "user");
      router.push("/dashboard");
    }
  };

  return (
    <div className={`${isModal ? "p-6" : "p-0"} w-full max-w-md`}>
      {isModal && (
        <button onClick={onClose} className="text-sm text-gray-500 mb-4">
          ✕ Close
        </button>
      )}
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        {isSignup ? "Sign Up" : "Sign In"}
      </h1>

      {isSignup && (
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 text-black mb-4"
        />
      )}

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 text-black mb-4"
      />

      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 text-black mb-4"
      />

      {error && <div className="text-sm text-red-500 mb-4">{error}</div>}

      <button
        onClick={handleAuth}
        className="w-full bg-black text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
      >
        {isSignup ? "Create Account" : "Login"}
      </button>

      {!isSignup && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Admin Login → <strong>admin@gmail.com</strong> /{" "}
          <strong>admin123#</strong>
        </p>
      )}

      <p className="mt-6 text-sm text-center text-gray-600">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="underline font-medium"
        >
          {isSignup ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
