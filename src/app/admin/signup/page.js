// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPass: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [showPass, setShowPass] = useState(false);
//   const [confirmPass, setConfirmPass] = useState(false);
//   const router = useRouter();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const toggleShowPass = () => setShowPass(!showPass);
//   const toggleConfirmPass = () => setConfirmPass(!confirmPass);

//   const validate = () => {
//     const newErrors = {};
//     const { name, email, password, confirmPass } = formData;

//     if (!name.trim()) newErrors.name = "Name is required.";
//     if (!email.trim()) newErrors.email = "Email is required.";
//     else if (!/\S+@\S+\.\S+/.test(email))
//       newErrors.email = "Invalid email address.";

//     if (!password) newErrors.password = "Password is required.";
//     else if (
//       !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
//         password
//       )
//     ) {
//       newErrors.password =
//         "Password must be 8+ characters, include upper, lower, number & special char.";
//     }

//     if (!confirmPass) newErrors.confirmPass = "Please confirm your password.";
//     else if (password !== confirmPass)
//       newErrors.confirmPass = "Passwords do not match.";

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       console.log("Form submitted:", formData);
//       // Reset or send data to backend
//       const res = await fetch("/api/admin/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         toast.success("Signup successful!");
//       } else {
//         toast.error(data.error || "Signup failed");
//       }
//     }
//     setFormData({
//       name: "",
//       email: "",
//       password: "",
//       confirmPass: "",
//     });
//     setConfirmPass(false);
//     setShowPass(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center text-black justify-center bg-gray-100 px-4 py-5">
//       <div className="bg-white shadow-2xl rounded-2xl p-4 sm:p-8 w-full max-w-md sm:max-w-lg lg:max-w-xl">
//         <div className="flex flex-col items-center mb-8">
//           <Image
//             src="/logo.png"
//             alt="logo"
//             width={80}
//             height={80}
//             className="mb-4"
//           />
//           <h1 className="text-2xl sm:text-3xl font-bold text-center">
//             Admin Panel
//           </h1>
//           <p className="text-sm sm:text-base text-gray-600 text-center mt-1">
//             Welcome to the admin panel. <br />
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter your name"
//               className={`w-full p-3 border ${
//                 errors.name ? "border-red-500" : "border-gray-300"
//               } rounded-lg focus:outline-none`}
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className={`w-full p-3 border ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               } rounded-lg focus:outline-none`}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//             )}
//           </div>

//           <div className="relative">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium mb-1"
//             >
//               Password
//             </label>
//             <input
//               type={showPass ? "text" : "password"}
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className={`w-full p-3 pr-10 border ${
//                 errors.password ? "border-red-500" : "border-gray-300"
//               } rounded-lg focus:outline-none`}
//             />
//             <div className="absolute right-3 top-[38px] cursor-pointer text-gray-500">
//               {showPass ? (
//                 <FaRegEye onClick={toggleShowPass} />
//               ) : (
//                 <FaRegEyeSlash onClick={toggleShowPass} />
//               )}
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//             )}
//           </div>

//           <div className="relative">
//             <label
//               htmlFor="confirmPass"
//               className="block text-sm font-medium mb-1"
//             >
//               Confirm Password
//             </label>
//             <input
//               type={confirmPass ? "text" : "password"}
//               id="confirmPass"
//               name="confirmPass"
//               value={formData.confirmPass}
//               onChange={handleChange}
//               placeholder="Confirm your password"
//               className={`w-full p-3 pr-10 border ${
//                 errors.confirmPass ? "border-red-500" : "border-gray-300"
//               } rounded-lg focus:outline-none`}
//             />
//             <div className="absolute right-3 top-[38px] cursor-pointer text-gray-500">
//               {confirmPass ? (
//                 <FaRegEye onClick={toggleConfirmPass} />
//               ) : (
//                 <FaRegEyeSlash onClick={toggleConfirmPass} />
//               )}
//             </div>
//             {errors.confirmPass && (
//               <p className="text-red-500 text-sm mt-1">{errors.confirmPass}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="flex-1 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
//           >
//             Register
//           </button>
//           <div className="flex items-center gap-4 ">
//             <hr className="flex-grow border-gray-300" />
//             <span className=" font-medium">Or</span>
//             <hr className="flex-grow border-gray-300" />
//           </div>

//           <button
//             type="button"
//             onClick={() => router.push("/admin/login")}
//             className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;


// src/app/admin/signup/page.js
export default function AdminSignupDisabled() {
  return <h1>🚫 Signup is disabled. Only authorized admins can log in.</h1>;
}
