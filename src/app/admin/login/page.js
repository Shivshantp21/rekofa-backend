"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";

    if (!formData.password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Login successful!");
        // router.push("/admin/dashboard"); 
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen text-black flex items-center justify-center bg-gray-100 px-4 py-6">
      <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-xl">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.png"
            alt="logo"
            width={80}
            height={80}
            className="mb-4"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            Admin Panel
          </h1>
          <p className="text-sm sm:text-base text-gray-600 text-center mt-1">
            Welcome to the admin panel. <br />
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg pr-10`}
              placeholder="Enter password"
            />
            <div
              className="absolute right-3 top-[38px] text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-end text-sm text-blue-600 hover:underline cursor-pointer">
            Forgot Password?
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
          <div className="flex items-center gap-4 ">
            <hr className="flex-grow border-gray-300" />
            <span className=" font-medium">Or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button
            type="button"
            onClick={() => router.push("/admin/signup")}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
