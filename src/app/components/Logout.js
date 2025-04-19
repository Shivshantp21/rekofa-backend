"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    router.push("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition duration-300"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
