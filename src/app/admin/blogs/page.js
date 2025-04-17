"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await fetch("/api/admin/blogs");
    const data = await res.json();
    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setBlogs(sortedData);
  };

  const deleteBlog = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (!confirm) return;
      await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      toast.success("Blog deleted successfully!");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog. Please try again.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-white text-black">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt="Logo"
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold mb-4 text-gray-800">All Blogs</h1>
        <Link
          href="/admin/blogs/create"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-300 mb-4"
        >
          + Create Blog
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border flex flex-col justify-between " 
          >
            <Link href={blog.link}>
              <div className="cursor-pointer">
                <Image
                  src={blog.img}
                  alt="Blog Image"
                  width={500}
                  height={300}
                  className="w-full h-60 object-cover"
                />
                <div className="p-5 text-left">
                  <p className="text-sm text-gray-400 mb-2">{blog.date}</p>
                  <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3">{blog.para}</p>
                </div>
              </div>
            </Link>

            {/* Action buttons */}
            <div className="px-5 pb-5 pt-3 mt-auto border-t flex justify-between items-center text-sm font-medium">
              <Link
                href={`/admin/blogs/edit/${blog._id}`}
                className="text-indigo-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteBlog(blog._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
