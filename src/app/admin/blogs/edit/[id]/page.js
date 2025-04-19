"use client";
import { useEffect, useState } from "react";
import BlogForm from "@/app/components/BlogForm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EditBlog({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // block render

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authorized to view this page. Please log in.");
      router.push("/admin/login");
    } else {
      // Optionally, verify token on server with fetch here
      setLoading(false); // allow page to render
    }
  }, [router]);

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }  
  return <BlogForm id={params.id} />;
}
