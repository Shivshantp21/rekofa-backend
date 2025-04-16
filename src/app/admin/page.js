"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Blogs from "./blogs/page";

const adminEmails = ["admin@example.com", "shivshant@example.com"];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // This code runs only in the browser
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !adminEmails.includes(user.email)) {
      router.push("/admin/login"); // Not authorized
    } else {
      setIsAuthorized(true); // Authorized, render page
    }
  }, []);

  // Prevents flicker or unauthorized access before check completes
  if (!isAuthorized) return null;

  return(
    <div>
        <Blogs/>
    </div>
  )
}
